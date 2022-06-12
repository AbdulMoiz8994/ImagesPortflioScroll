import { useCategoryPage } from 'contexts/categoryPage/use-category';
import { useEffect } from 'react';
import { connectStats } from 'react-instantsearch-dom';

const Stats = ({ processingTimeMS, nbHits, nbSortedHits, areHitsSorted }) => {
  const { onChangeTotalProducts } = useCategoryPage();

  useEffect(() => {
    onChangeTotalProducts(nbHits)
  }, [nbHits])

  // We just want no Of hits for context api not jsx
  return null;
  
  // JSX for showing total items with time
  return (
    <p>
      {areHitsSorted && nbHits !== nbSortedHits
        ? `${nbSortedHits.toLocaleString()} relevant results sorted out of ${nbHits.toLocaleString()} found in ${processingTimeMS.toLocaleString()}ms`
        : `${nbHits.toLocaleString()} results found in ${processingTimeMS.toLocaleString()}ms`}
    </p>
  );
}

export const CustomStats = connectStats(Stats);