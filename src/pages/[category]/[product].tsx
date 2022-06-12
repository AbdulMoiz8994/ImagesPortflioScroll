import React, { useEffect, useState } from 'react';
import CloseModalOutsideClick from 'utils/closeModalOutsideClick';
import CartPopUp from 'features/carts/cart-popup';
import { Modal } from '@redq/reuse-modal';
import ComparisonFloatButton from 'layouts/ComparisonFloatButton';
import ProductPage from 'components/pages/ProductPage';
import axios from 'axios';
import Head from 'next/head';
import { NextSeo, ProductJsonLd } from 'next-seo';
import renderHTML from 'react-render-html';
import { consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';
import WishlistFloatButton from 'components/common/WishlistFloatButton';

const Product = ({ deviceType, product, category }) => {  
  return (
    <Modal>
      <SEO data={product} />
      <WishlistFloatButton />
      <ComparisonFloatButton />
      <ProductPage product={product} category={category} />
       <CloseModalOutsideClick>
          <CartPopUp deviceType={deviceType} />
      </CloseModalOutsideClick>
    </Modal>
  )
}

function SEO({ data }) {
  const yoast = data.yoast_head_json;
  const product = data;

  return (
    <>
      <Head>
        <title>{yoast?.title || product.name}</title>
        {yoast?.twitter_misc && <>
          <meta name='twitter:label1' content='Τιμή' />
          {yoast?.twitter_misc['Τιμή'] && <meta name='twitter:data1' content={renderHTML(yoast?.twitter_misc['Τιμή'])} />}
          <meta name='twitter:label2' content='Availability' />
          {yoast?.twitter_misc['Availability'] && <meta name='twitter:data2' content={yoast?.twitter_misc['Availability']} />}
          <meta property="og:availability" content="instock" />
        </>}
        <meta property='product:brand' content='' />
        <meta property='product:price:amount' content={product.price} />
        <meta property='product:price:currency' content='EUR' />
        <meta property='product:availability' content={product.stock_status} />
        <meta property='product:condition' content='new' />
      </Head>
      {!!yoast && <>
        <NextSeo 
          description={yoast.og_description}
          canonical={yoast.canonical}
          robotsProps={{
            maxSnippet: -1,
            maxVideoPreview: -1,
            maxImagePreview: "large"
          }}
          openGraph={{
            title: yoast.og_title,
            description: yoast.og_description,
            locale: yoast.og_locale,
            type: yoast.og_type,
            site_name: yoast.og_site_name,
            images: yoast.og_image,
            url: yoast.og_url,
          }}
          // NOTE: No need to override the title, description for twitter because 'next-seo' mentioned that twitter copies from open graph. Just provice card type. that's it
          twitter={{
            cardType: "summary_large_image",
            // Title: Title will be picked from OpenGraph automatically
            // Description: It will also be copied from OpenGraph automatically
            // image: It will also be copied from OpenGraph automatically
          }}
        />
        <ProductJsonLd 
          productName={yoast.title}
          offers={[{ price: product.price, priceCurrency: 'EUR', seller: { name: yoast.og_site_name } }]}   
        />
      </>}
    </>
  )
}

export async function getServerSideProps({ params }) {
  try {
    // ALERT: Must encode uri for slug due to greek language issues
    // const { data } = await axios.get(`${siteURL}/wp-json/wc/v3/products?slug=${encodeURI(params.product)}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);
    // const { data: categories } = await axios.get(`${siteURL}/wp-json/wc/v3/products/categories?slug=${encodeURI(params.category)}&consumer_secret=${consumerSecret}&consumer_key=${consumerKey}`)

    const [{data: products}, {data: categories}] = await Promise.all([
      axios.get(`${siteURL}/wp-json/wc/v3/products?slug=${encodeURI(params.product)}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`),
      axios.get(`${siteURL}/wp-json/wc/v3/products/categories?slug=${encodeURI(params.category)}&consumer_secret=${consumerSecret}&consumer_key=${consumerKey}`)
    ])

    if (products.length === 0) return {
      notFound: true
    }

    return {
      props: {
        product: products[0] ?? null,
        category: categories[0] ?? null
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

// export async function getStaticProps({ params }) {
//   const { data } = await WooCommerce.get(`products/?slug=${encodeURI(params.product)}`)

      
//   return {
//     props: {
//       product: data[0] ?? null,
//       // databaseId
//     },
//     revalidate: 1,
//   }
// }

// export async function getStaticPaths() {
//   let count = 1;
//   let productPaths = [];
//   while(true) {
//     console.log({ count });

//     const { data } = await WooCommerce.get(`products/?page=${count}&&per_page=100`);

//     const paths = data.map(product => {
//       const { permalink } = product;
  
//       const splitted = decodeURIComponent(permalink).split("/");
  
//       if (!splitted[4]) return;
  
//       return { 
//         params: { category: splitted[3], product: splitted[4] }
//         }
//     }).filter(product => product);

//     productPaths = [...productPaths, ...paths];

//     if (env === "dev") {
//       if (count === 1) break;
//     } else {
//       if (data.length < 100 || count === 13) break;
//     }
//     count++;
//   };

//   return {
//     paths: productPaths,
//     fallback: true,
//     // fallback: 'blocking',
//   }
// }

export default Product
