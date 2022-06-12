import axios from 'axios';
import { useState, useEffect } from 'react'
import { consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';

const useProductReviews = (product) => {
  const [count, setCount] = useState(0);
  const [ratingAverage, setRatingAverage] = useState(0);

  useEffect(() => {
    setCount(product.rating_count);
    getReviews();
    async function getReviews() {
      const { data: reviews } = await axios.get(
        `${siteURL}/wp-json/wc/v3/products/reviews?product=${product.id}&consumer_secret=${consumerSecret}&consumer_key=${consumerKey}`
      );

      if (reviews.length === 0) return;
        
      const allRatings = reviews.map(rating => rating.rating);

      let sumOfAllRatings = 0;
      for (const count of allRatings) {
        sumOfAllRatings = sumOfAllRatings + count;
      }  
      const averageOfRating = sumOfAllRatings / reviews.length

      setRatingAverage(averageOfRating);
    }
  }, [product]);

  return { count, ratingAverage }
}

export default useProductReviews