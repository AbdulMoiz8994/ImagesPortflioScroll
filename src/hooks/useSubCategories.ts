import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import { consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';

const useSubCategories = ({ parentCategoryId }) => {
  const [subCategories, setSubCategories] = useState([]);
  const router = useRouter();

  if (!parentCategoryId) return subCategories

  useEffect(() => {
    getAsyncData()
    async function getAsyncData() {
      const { data: subCategories } = await axios.get(`${siteURL}/wp-json/wc/v3/products/categories?parent=${parentCategoryId}&per_page=100&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`)
      setSubCategories(subCategories);
    }
  }, [router.query.category]);

  return subCategories;
}

export default useSubCategories
