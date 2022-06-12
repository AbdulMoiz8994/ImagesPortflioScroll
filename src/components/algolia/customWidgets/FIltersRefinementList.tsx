import { FC } from 'react';
import { Highlight, connectRefinementList, RefinementItem } from 'react-instantsearch-dom';

import { Stack, Checkbox, UnorderedList, Text } from '@chakra-ui/react';
import Link from 'next/link'


const RefinementList = ({
  filterBy,
  items,
  isFromSearch,
  refine,
  searchForItems,
  createURL,
}) => {
  // console.log({ filterBy, customFiltersRefinement: items })

  return (
    <Stack spacing="0">
      {items.map((item: any) => {
        return (
          <Text
            as="a"
            fontSize="14"
            onClick={(e) => {
              e.preventDefault()
              refine(item.value);
            }}
            fontWeight={item.isRefined ? 'bold' : 'inherit'}
          >
            {`${item.label} (${item.count})`}
          </Text>
        )
      })}
    </Stack>
  )

  // return (
  //   <UnorderedList as="ul">
  //     {items.map((item: any) => (
  //       <li key={item.label}>
  //         <a
  //           href={createURL(item.value)}
  //           style={{ fontWeight: item.isRefined ? 'bold' : 'inherit' }}
  //           onClick={event => {
  //             event.preventDefault();
  //             refine(item.value);
  //           }}
  //         >
  //           {isFromSearch ? (
  //             <Highlight attribute="label" hit={item} />
  //           ) : (
  //             item.label
  //           )}{' '}
  //           ({item.count})
  //         </a>
  //       </li>
  //     ))}
  //   </UnorderedList>
  // );
}

export const FiltersRefinementList = connectRefinementList(RefinementList);