import React from 'react';
import { CustomRefinementList } from 'components/algolia/CustomRefinementList';
import attributes from '../../../public/api/attributes.json';
import { useRouter } from 'next/router';

const AttributeFilters = () => {
  const router = useRouter();

  return (
    <>
      {attributes.map((attribute: any, idx: number) => {
          const params = router.query[attribute.name];
          let defaultRefinementFormat = [];

          // ALGO: If query parameter is not array then wrap it into array 
          if (Array.isArray(params)) {
            defaultRefinementFormat = params
          } else {
            defaultRefinementFormat = [params]
          }

          if (router.query[attribute.name]) return (
            <CustomRefinementList 
              key={attribute.name} 
              defaultRefinement={defaultRefinementFormat} 
              title={attribute.name} 
              hidden={false} 
              attribute={`taxonomies.${attribute.name}`}
            />
          )

          return (
            <CustomRefinementList 
              key={attribute.name} 
              title={attribute.name} 
              hidden={false} 
              attribute={`taxonomies.${attribute.name}`}
            />
          )
        })}
    </>
  )
}

export default AttributeFilters
