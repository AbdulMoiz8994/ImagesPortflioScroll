/********************
 * 1--> This category card is used in homepage categories 
 * 
 * 
 * 
 */


import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box } from './box';
import { Text } from './text';
import * as icons from 'assets/icons/category-icons';
import Link from 'next/link';
import Image from 'next/image';
import { Box as ChakraBox, Square } from '@chakra-ui/react'

const CardBox = styled.div<any>((props) =>
  css({
    backgroundColor: ['gray.200', 'gray.200', '#fff'],
    textAlign: 'center',
    padding: '1rem 10px',
    borderRadius: [10, 10, 6],
    cursor: 'pointer',
    border: props.active ? '2px solid' : '2px solid',
    borderColor: props.active ? '#212121' : ['gray.200', 'gray.200', '#fff'],
  })
);
interface Props {
  data: any;
  active: any;
  style?: any;
  onClick?: (slug: string) => void;
}
const Icon = ({ name, style }) => {
  const TagName = icons[name];
  return !!TagName ? <TagName style={style} /> : <p>Invalid icon {name}</p>;
};
export const CardMenu = ({ data, onClick, active, style }: Props) => {
  return (
    <>
      {data.map(({ id, name, icon, slug, uri, image }) => {
        return (
          <CardBox
            key={id}
            // onClick={() => onClick(slug)}
            active={slug === active}
            role='button'
            // style={style}
            style={{ width: '10rem' }}
          >
            <Link 
              href={{
                pathname: "/[category]",
                query: { category: decodeURI(slug) }
              }}
            >
              <a>
                <Square overflow="hidden" mb="2" rounded="full" mx="auto" size="20" position="relative">
                  {(image && image.src) ? <Image 
                    src={image.src}
                    layout="fill"
                  />: <Icon 
                    name={'FruitsVegetable'} 
                    style={{ height: 50, width: 'auto' }} 
                  />}
                </Square>
                <Text as='span' color='#212121' fontSize={14} fontWeight={600}>
                  {name}
                </Text>
              </a>  
            </Link>
          </CardBox>
        )
      })}
    </>
  );
};
