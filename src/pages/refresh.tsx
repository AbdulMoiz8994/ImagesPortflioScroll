import React, { useContext, useEffect, useState } from 'react';
import { Heading, Container, Button, Text } from '@chakra-ui/react'
import { getAllWCProducts } from 'services/products';
import axios from 'axios';
import _ from 'lodash';

import algoliasearch from 'algoliasearch';
import { algoliaApiKey, algoliaAppId, consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';
import { algolia_indexes } from 'site-settings/site-algolia';
import { AuthContext } from 'contexts/auth/auth.context';
import { isCustomerFromManagementTeam } from 'utils/customer-utils';
import useAlgolia from 'hooks/useAlgolia';
import { Modal } from '@redq/reuse-modal';

// const searchClient = algoliasearch(
//    algoliaAppId,
//    algoliaApiKey
//  )
//  const index = searchClient.initIndex(algolia_indexes.products);
//  const index = searchClient.initIndex("products");

const Refresh = () => {
  const { isRefreshing, isError, hasInitialized, isDone, onChangeHasInitialized, algoliaReplaceAllObjects } = useAlgolia();

  useEffect(() => {
    if (!hasInitialized) return;

    algoliaReplaceAllObjects({ shouldUpdateAlgolia: true });
  }, [hasInitialized]);

  if (!hasInitialized) return (
    <Modal>
      <Container py="24" centerContent minH="85vh">
        <Button colorScheme="primary" onClick={() => onChangeHasInitialized(true)}>
          {/* Trigger Refresh */}
          Ανανέωση Algolia
        </Button>
      </Container>
    </Modal>
  )
  return (
    <Modal>
      <Container py="24" centerContent minH="85vh">
        {/* Translations:: 'Ολοκληρώθηκε' --> 'Done' */}
        {isDone && <Heading fontSize="16" py="10">Ολοκληρώθηκε ✅</Heading>}
        {/* Translations:: 'Σφάλμα' --> 'Error' */}
        {isError && <Heading fontSize="16" py="10">Σφάλμα ❌</Heading>}
        {/* Translations:: 'Κάνει ανανέωση' --> 'Refreshing' */}
        {isRefreshing && <Heading fontSize="16" py="10">Κάνει ανανέωση...</Heading>}
      </Container>
    </Modal>
  )
}

export default Refresh
