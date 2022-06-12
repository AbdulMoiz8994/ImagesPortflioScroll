import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import axios from 'axios';
import { consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';

const SITE_URL = process.env.SITE_URL

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  /////////// DOCS //////////
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  // const fields = [
  //   {
  //     loc: SITE_URL, // Absolute url
  //     lastmod: new Date().toISOString(),
  //     // changefreq
  //     // priority
  //   },
  //   {
  //     loc: `${SITE_URL}dynamic-path-2`, // Absolute url
  //     lastmod: new Date().toISOString(),
  //     // changefreq
  //     // priority
  //   },
  // ]

  //////// IMPLEMENTATION ////////
  let count = 1;
    let fields = [];
    while(true) {
      const { data } = await axios.get(`${siteURL}/wp-json/wc/v3/products/?page=${count}&per_page=100&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`)

      const paths = data.map(product => {
      const { permalink } = product;
  
      const splitted = decodeURIComponent(permalink).split("/");
  
      if (!splitted[4]) return;
  
      return {
        loc: `${SITE_URL}${splitted[3]}/${splitted[4]}/`, // Absolute url
        lastmod: new Date().toISOString(),
        // changefreq
        // priority
      }
    }).filter(product => product);

    fields = [...fields, ...paths];

    console.log(`Products page no. ${count} created!`);

    if (data.length < 100) break;
    count++;
  };

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
const ProductsSitemap = () => {}
export default ProductsSitemap