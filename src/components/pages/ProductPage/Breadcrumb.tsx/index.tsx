import React, { FC } from 'react'
import {
  BoxProps,
  Breadcrumb,
  BreadcrumbItem,
  Text
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { getTranslationBreadcrumbTitle } from 'utils/breadcrumbs-utils'

interface Props extends BoxProps {
  data?: any[]
}
const ProductBreadcrumb:FC<Props> = ({ data, ...restProps }) => {
  return (
    <Breadcrumb spacing='8px' px="2" {...restProps}>
      {data.map((item, index) => {
        if (data.length === index + 1) return (
          <BreadcrumbItem key={item.name} isCurrentPage>
            <Text fontSize={{ baes: 'sm', md: 'inherit' }}>{item.name}</Text>
          </BreadcrumbItem>
        )
        return (
          <BreadcrumbItem rounded="sm" key={item.name}>
            <Text fontSize={{ base: 'sm', md: 'inherit' }} color="linkedin.600">
              <Link href={`/${item.slug}`}>
                {/* <a>{item.name}</a> */}
                <a>{getTranslationBreadcrumbTitle(item.name)}</a>
              </Link>
            </Text>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default ProductBreadcrumb