import React from 'react';
import { Stack, Heading, Text, HStack, Wrap} from '@chakra-ui/react';
import currencyFormatter from 'currency-formatter'


const PriceDescription = ({ product }) => {
  // const shortDescription = "<ul>\n<li>Συχνότητα εκπομπής: 433,92MHz</li>\n<li>Τροφοδοσία: 12V μπαταρία τύπου V23A.</li>\n<li>Συχνότητα εκπομπής: 433,92MHz</li>\n<li>Κυλιόμενος κωδικός για αυξημένη αντικλεπτική προστασία</li>\n</ul>\n"
  return (
    <Stack spacing="4">
      {!!product.price && <Wrap spacing="3" align="flex-end">
        <Heading fontSize="26" color="primary.100">{currencyFormatter.format(product.price, {})} €</Heading>
        {product.on_sale && <Text fontSize="16" textDecor="line-through">{currencyFormatter.format(product.regular_price, {})} €</Text>}
      </Wrap>}
      <div
        dangerouslySetInnerHTML={{
          __html: product.short_description
        }}
      />   
    </Stack>
  )
}

export default PriceDescription
