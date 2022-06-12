import algoliasearch from 'algoliasearch';
import { algoliaApiKey, algoliaAppId } from 'site-settings/site-credentials';

export const searchClient = algoliasearch(
  algoliaAppId,
  algoliaApiKey
)