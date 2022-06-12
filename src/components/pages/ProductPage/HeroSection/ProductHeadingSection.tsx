import { Stack, Heading, HStack, Text, Wrap, Skeleton } from '@chakra-ui/react';
import StarsRating from 'components/common/StarsRating';
import useExtractBrandsFromProd from 'hooks/useExtractBrandsFromProd';
import Link from 'next/link'
import { FormattedMessage } from 'react-intl';
import useProductReviews from 'hooks/useProductReviews';

const ProductHeadingSection = ({ product, loading }) => {
  const brand = useExtractBrandsFromProd(product);
  const { count, ratingAverage } = useProductReviews(product);

  return (
    <Stack> 
      <RenderProductName name={product.name} loading={loading} />
      <HStack spacing="6">
        {brand?.name && <Text>
          <FormattedMessage 
            id="ProductPage.brand"
            defaultMessage="Brand"
          />: 
          <Text ml="2" as="span" color="linkedin.500">
            <Link href={`/brand/${brand.slug}`}>
              <a>{brand.name}</a>
            </Link>
          </Text>
        </Text>}
        <Wrap>
          <Wrap align="center">
            <StarsRating readOnly={true} initialRating={ratingAverage || 0} />
            <Text>({count} <FormattedMessage id="ProductPage.review" defaultMessage="review" />)</Text>
          </Wrap>
        </Wrap>
      </HStack>
    </Stack>
  )
}

function RenderProductName({ name, loading }) {
  if (loading) return (
    <Skeleton>
      <Heading as="h1" fontSize="20">{name}</Heading>
    </Skeleton>
  )

  return (
    <Heading as="h1" fontSize="20">{name}</Heading>
  )
}

export default ProductHeadingSection
