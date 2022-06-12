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
  const { data: categories } = await axios.get(`${siteURL}/wp-json/wc/v3/products/categories/?page=1&per_page=100&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);
  const { data: categories1 } = await axios.get(`${siteURL}/wp-json/wc/v3/products/categories/?page=2&per_page=100&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);

  const [categoriesPage1, categoriesPage2] = await Promise.all([categories, categories1]);
  const fields = [...categoriesPage1, ...categoriesPage2].map(category => (
    {
      loc: `${SITE_URL}${decodeURIComponent(category.slug)}`, // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    }
  ));

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default () => {}