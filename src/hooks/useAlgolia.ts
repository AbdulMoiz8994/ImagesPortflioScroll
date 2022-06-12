import algoliasearch from 'algoliasearch';
import { AuthContext } from 'contexts/auth/auth.context';
import router from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { getAllWCProducts } from 'services/products';
import { algolia_indexes } from 'site-settings/site-algolia';
import { algoliaApiKey, algoliaAppId } from 'site-settings/site-credentials';
import { isCustomerFromManagementTeam } from 'utils/customer-utils';

const searchClient = algoliasearch(
  algoliaAppId,
  algoliaApiKey,
  {
    timeouts: {
      connect: 60,
      read: 60,
      write: 60
    }
  }
)
const index = searchClient.initIndex(algolia_indexes.products);

const useAlgolia = () => {
  const { authState, authDispatch, customer } = useContext<any>(AuthContext);  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!isCustomerFromManagementTeam(customer)) {
      router.push("/");
    }
  }, [authState])

  // For updating objects
  async function algoliaReplaceAllObjects({ shouldUpdateAlgolia=true }) {
    console.log('Fetching products touched.')
    setIsRefreshing(true)

    const products = await getAllWCProducts({ shouldFilter: true });
    console.log({ products });
    const attributes = [];
    products.forEach(product => {
      attributes.push(...product.attributes)
    })

    const structuredProds = [];
    for (const product of products) {
      const taxonomies = {};
      const tags = [];
      for (const prodAttr of product.attributes) {
        taxonomies[prodAttr.name] = prodAttr.options 
      }
      for (const prodTag of product.tags) {
        tags.push(prodTag.name)
      }
      structuredProds.push({ ...product, taxonomies, tags });
    }

    if (!!shouldUpdateAlgolia) {
      index.replaceAllObjects(structuredProds, { autoGenerateObjectIDIfNotExist: true })
      // index.saveObjects(structuredProds, { autoGenerateObjectIDIfNotExist: true })
      .then(({ objectIDs }) => {
        console.log(objectIDs);
        // setIsError(false)
        setIsDone(true)
      })
      .catch((error) => {
        console.log({ error });
        setIsError(true);
      })
      .finally(() => {
        setIsRefreshing(false);
      })
    } else {
      setIsError(false);
      setHasInitialized(false);
      setIsRefreshing(false);
    }
  }

  // INFO: For creating replicas 
  async function replicaIndex() {
    console.log('ReplicatedINdex touched.')

    setIsRefreshing(true);
    const res = await index.setSettings({
      replicas: [
        'wc_rest_products_on_sale',
        'wc_rest_products_price_asc',
        'wc_rest_products_price_desc',
      ]
    });
    console.log({ res })

    setIsRefreshing(false);
  }

  return {
    isDone,
    isError,
    isRefreshing,
    hasInitialized,
    onChangeHasInitialized: (value: boolean) => setHasInitialized(value),
    algoliaReplaceAllObjects,
    replicaIndex
  }
}

export default useAlgolia