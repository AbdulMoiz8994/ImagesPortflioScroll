import React, { useEffect, useState } from 'react';
import ChildCategoryPage from 'components/pages/ChildCategory';
import { useRouter } from 'next/router';
import Loading from 'components/common/Loading';
import ComparisonFloatButton from 'layouts/ComparisonFloatButton';
import axios from 'axios';
import { InstantSearch } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch';
import { algoliaApiKey, algoliaAppId, consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import useSubCategories from 'hooks/useSubCategories';
import { algolia_indexes } from 'site-settings/site-algolia';
import WishlistFloatButton from 'components/common/WishlistFloatButton';

 // Algolia integration
 const searchClient = algoliasearch(algoliaAppId, algoliaApiKey)

const Category = ({ category, count, deviceType }) => {
  const subCategories = useSubCategories({ parentCategoryId: category.metaData.id })
  const router = useRouter();

  if (router.isFallback) return <Loading />
  return (
    <>
      <SEO data={category.metaData} />
      <InstantSearch searchClient={searchClient} indexName={algolia_indexes.products}>
        <ComparisonFloatButton />
        <WishlistFloatButton />
        <ChildCategoryPage  
          deviceType={deviceType} 
          sidebarLayout='childCategory' 
          category={category}
          count={count}
          subCategories={subCategories}
          categoryName={category.name}
          categoryDescription={category.description}
          algolia={{
            defaultRefinement: [category.metaData.slug],
            attribute: "categories.slug"
          }}
        />
      </InstantSearch>
    </>
  )
}

function SEO({ data }) {
  const category = data;
  const yoast = data.yoast_head_json;

  // console.log({ data })

  return (
    <>
      <Head>
        <title>{category?.name || yoast?.title}</title>
      </Head>

      {!!yoast && <NextSeo 
        description={yoast.og_description || category.description}
        canonical={yoast.canonical}
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large"
        }}
        openGraph={{
          title: yoast.title,
          description: yoast.description || category.description,
          locale: yoast.og_locale,
          type: yoast.og_type,
          site_name: yoast.og_site_name,
          url: yoast.og_url,
          images: [{
            url: category?.image?.src,
            width: 64,
            height: 64
          }]
        }}
        // NOTE: No need to override the title, description for twitter because 'next-seo' mentioned that twitter copies from open graph. Just provice card type. that's it
        twitter={{
          cardType: "summary_large_image",
          // Title: Title will be picked from OpenGraph automatically
          // Description: It will also be copied from OpenGraph automatically
          // image: It will also be copied from OpenGraph automatically
        }}
      />}
    </>
  )
}

export async function getServerSideProps(context) {
    const { params } = context;

  try {
    const { data: categories } = await axios.get(`${siteURL}/wp-json/wc/v2/products/categories/?slug=${encodeURI(params.category)}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`)
    if (!categories || categories.length === 0) throw new Error("Page not found!");

    return {
      props: {
        count: categories?.[0]?.count ?? 0,
        subCategories: [],
        category: {
          name: categories?.[0]?.name,
          description: categories?.[0]?.description,
          metaData: { ...categories?.[0] }
        }
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export default Category
