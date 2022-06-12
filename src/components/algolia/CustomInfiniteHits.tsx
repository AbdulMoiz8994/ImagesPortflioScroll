import { ProductGrid } from 'components/product-grid/product-grid-three';
import { connectInfiniteHits } from 'react-instantsearch-dom';

const InfiniteHits = ({
  hits,
  hasPrevious,
  refinePrevious,
  hasMore,
  refineNext,
  deviceType,
  pageType
}) => {
  console.log({ hits, hasMore });

  return null;
  // return (
  //   <ProductGrid 
  //     productsDataType="restapi" 
  //     // data={productsData} 
  //     data={hits} 
  //     type={pageType}
  //     deviceType={deviceType} 
  //   />
  // );
}

export const CustomInfiniteHits = connectInfiniteHits(InfiniteHits);