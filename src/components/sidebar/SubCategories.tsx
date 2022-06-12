import React, { Fragment } from 'react';
import { Text, Stack } from '@chakra-ui/react'
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

const SubCategories = ({ subCategories }) => {
  return (
    <>
      {(subCategories && subCategories.length > 0) && <Stack spacing="1">
        {/* <Text fontWeight="bold" fontSize="17">Departments</Text> */}
        <Text fontWeight="bold" fontSize="17">
          <FormattedMessage 
            id="categoryPage.Departments"
            defaultMessage="Departments"
          />  
        </Text>
        <Stack spacing="1" as="ul">
          {subCategories.map((category: any, idx: number) => {
            if (!category.count) return null; // No need to display category that has zero/null product
            
            // const uriWithourSlashes = category?.uri?.substring(1, category?.uri.length - 1);
            return (
              <Fragment key={idx.toString()}>
                <Link href={`/${category.slug}`}>
                  <a>
                    <Text key={idx.toString()}>{category.name} <Text color="gray.500" ml="1" as="span" fontSize="14">{`(${category.count})`}</Text></Text>
                  </a>
                </Link>
              </Fragment>
            )
          })}
        </Stack>
      </Stack>}
    </>
  )
}

export default SubCategories
