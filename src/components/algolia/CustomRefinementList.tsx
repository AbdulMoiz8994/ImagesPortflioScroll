import { FC, useEffect, useState } from 'react';
import { Highlight, connectRefinementList, RefinementItem } from 'react-instantsearch-dom';
import { UnorderedList, Stack, Text, Checkbox } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import useAddParams from 'hooks/useAddParams';
import _ from 'lodash'
import { useSpringModal } from 'contexts/spring-modal/use-spring-modal';

interface Props {
  items: any,
  isFromSearch: any
  refine: any
  searchForItems: any
  hidden?: boolean
  createURL: any
  title?: string,
}
const RefinementList: FC<Props> = ({
  items,
  isFromSearch,
  refine,
  searchForItems,
  createURL,
  hidden,
  title,
}) => {
  const router = useRouter();

  if (hidden || items.length === 0) return null;

  // TEMP: It was giving an error and fixed after commenting this section
  // useEffect(() => {
  //   if (!router.query[title]) {
  //     refine([])
  //     return;
  //   };

  //   if (Array.isArray(router.query[title])) {
  //     refine(router.query[title]);
  //   } else {
  //     refine([router.query[title]]);
  //   }
  // }, [])

  return (
    <Stack spacing="1">
      <Text fontWeight="bold" fontSize="17">{title}</Text>
      <Stack spacing="1" as="ul">
        {_.sortBy(items, 'label').map((item: any) => {
          return (
            <RenderItem key={item.label} item={item} title={title} refine={refine} />
          )
        })}
      </Stack>
    </Stack>
  );
}

const RenderItem = ({ item, title, refine }) => {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState(false);
  const { isOpen, onModalOpen, onModalClose } = useSpringModal();

  useEffect(() => {
    // if (isSelected) return;
    setIsSelected(item.isRefined)
  }, [item])

  return (
    <Checkbox 
      // isChecked={item.isRefined}
      isChecked={isSelected}
      onChange={(e) => {
        // console.log({ refined: item.isRefined })
        onModalClose();

        //1- Update UI first
        if (!item.isRefined) {
          setIsSelected(true)
        } else {
          setIsSelected(false);
        }

        //2- Update the url
        const { page, ...rest } = router.query 
        router.push({
          pathname: router.pathname,
          query: {
            ...rest,
            [title]: item.value
          }
        },  "", { shallow: true });

        // Scroll window to top
        window.scroll({ top: 0, behavior: 'smooth' })

        // Update data
        refine(item.value)
      }}
    >
      {`${item.label} (${item.count})`}
    </Checkbox>
  )
}

export const CustomRefinementList = connectRefinementList(RefinementList);