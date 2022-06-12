import React from 'react';
import { connectCurrentRefinements } from 'react-instantsearch-dom';
import { 
  Wrap, 
  HStack, 
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  Text
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface Props {
  items: any
  refine: any
  createURL: any
}

const CurrentRefinements = ({ items, refine, createURL }: Props) => {
  const router = useRouter()

  return (
    <Wrap pt="1" pb="3" px="0.5">
      {items.map((item: any, idx: number) => {
        if (item.attribute === "categories.slug" || item.attribute === "on_sale" || item.attribute === "tags") return null;

        const attribute = item.attribute.split(".")[1];
          
        return (
          <Wrap key={idx.toString()}>
            {item.items ? (
              <React.Fragment>
                {item.items.map((nested: any) => {
                  const currentLabel = nested.label;

                  return (
                    <Tag
                      key={nested.label}
                      size="lg"
                      rounded="md"
                      variant="solid"
                      colorScheme="blue"
                    >
                      {/* <TagLabel>{item.label} {nested.label}</TagLabel> */}
                      <TagLabel>{nested.label}</TagLabel>
                      <TagCloseButton 
                        onClick={() => {
                          // console.log({ attribute })
                          const labels = item.items.map(item1 => item1.label).filter(label => label !== currentLabel);
                          // console.log({ labels })
                          
                          const { page, ...rest } = router.query 
                          router.push({
                            pathname: router.pathname,
                            query: {
                              ...rest,
                              [attribute]: labels
                            }
                          },  "", { shallow: true });
                          

                          refine(nested.value);
                        }}
                      />
                    </Tag>
                  )
                })}
              </React.Fragment>
            ) : (
              <Text bg="pink">{item.label}</Text>
            )}
          </Wrap>
        )
      })}
    </Wrap>
  );
}

export const CustomCurrentRefinements = connectCurrentRefinements(CurrentRefinements)

// LEGACY CODE
{/* <ul>
  {items.map(item => (
    <li key={item.label}>
      {item.items ? (
        <React.Fragment>
          {item.label}
          <ul>
            {item.items.map(nested => (
              <li key={nested.label}>
                <a
                  href={createURL(nested.value)}
                  onClick={event => {
                    event.preventDefault();
                    refine(nested.value);
                  }}
                >
                  {nested.label}
                </a>
              </li>
            ))}
          </ul>
        </React.Fragment>
      ) : (
        <a
          href={createURL(item.value)}
          onClick={event => {
            event.preventDefault();
            refine(item.value);
          }}
        >
          {item.label}
        </a>
      )}
    </li>
  ))}
</ul> */}