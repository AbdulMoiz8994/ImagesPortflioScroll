import React, { useEffect, useState } from 'react';
import ChildCategoryPage from 'components/pages/ChildCategory';
import ComparisonFloatButton from 'layouts/ComparisonFloatButton';
import { InstantSearch } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch';
import { algoliaApiKey, algoliaAppId, consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { algolia_indexes } from 'site-settings/site-algolia';
import axios from 'axios';

 // Algolia integration
const searchClient = algoliasearch(algoliaAppId, algoliaApiKey)
const Page = ({ deviceType }) => {
  const [description, setDescription] = useState("");
  
  useEffect(() => {
    getAsyncData();

    async function getAsyncData() {
      const {data} = await axios.get(`${siteURL}/wp-json/wc/v3/products/tags?slug=gadgets&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`)
      const tag = data[0];

      setDescription(tag?.description)
    }
  }, [])

  return (
    <>
      {/* TODO: Please add SEO (copy from current sfkshop offers page) */}
      <SEO />
      <InstantSearch searchClient={searchClient} indexName={algolia_indexes.products}>
        <ComparisonFloatButton />
        <ChildCategoryPage  
          deviceType={deviceType} 
          sidebarLayout='page' 
          categoryName="Gadgets"
          categoryDescription={description}
          algolia={{
            attribute: 'tags',        
            defaultRefinement: ['gadgets'],
          }}
        />
      </InstantSearch>
    </>
  )
}

function SEO() {
  return (
    <>
      <Head>
        <title>Gadgets - SFKshop</title>
      </Head>

      <NextSeo 
        description="ΠΡΟΪΟΝΤΑ ΣΕ ΠΡΟΣΦΟΡΑ Εξοικονόμησε χρήματα αγοράζοντας προϊόντα σε προσφορά! Προσφορές Όλα Δημοφιλή Με τις περισσότερες αξιολογήσεις Προστέθηκε στα αγαπημέναΑφαιρέθηκε από τα αγαπημένα 0 Προσθήκη στη σύγκριση YUASA – BATTERY 12V 7AH Προστέθηκε στα αγαπημέναΑφαιρέθηκε από τα αγαπημένα 0 Προσθήκη στη σύγκριση 29.90€ 24.00€ 20% Προστέθηκε στα αγαπημέναΑφαιρέθηκε από τα αγαπημένα 0 Προσθήκη στη σύγκριση BFT […]"
        canonical="https://sfkshop.gr/gadgets/"
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large"
        }}
        openGraph={{
          title: "Gadgets",
          description: "Gadgets Όλα τα προϊόντα Δημοφιλή Με τις περισσότερες κριτικές Προστέθηκε στα αγαπημέναΑφαιρέθηκε από τα αγαπημένα 0 Προσθήκη στη σύγκριση Bionics Robocam 6 – Ρομποτική κάμερα εσωτερικού χώρου ανάλυσης 1080p Προστέθηκε στα αγαπημέναΑφαιρέθηκε από τα αγαπημένα 0 Προσθήκη στη σύγκριση 59.90€ 36.90€ 38% Προστέθηκε στα αγαπημέναΑφαιρέθηκε από τα αγαπημένα 0 Προσθήκη στη σύγκριση Tuya δέκτης Wifi […]",
          locale: "el_GR",
          type: "article",
          site_name: "SFKshop",
          url: "https://sfkshop.gr/gadgets/",
          article: {
            modifiedTime: new Date().toISOString()
          },
          images: [{
            url: `${siteURL}/wp-content/themes/rehub-theme/images/default/blank.gif`,
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
      />
    </>
  )
}

export default Page