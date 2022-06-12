import React, { useEffect, useState } from 'react'
import { Box, Heading } from '@chakra-ui/react';
// import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
// import renderHTML from 'react-render-html';
import { FormattedMessage } from 'react-intl';

const ProductDescription = ({ product }) => {
  const [technicalVoucher, setTechnicalVoucher] = useState("");
  const [productDescription, setProductDescription] = useState("");

  useEffect(() => {
    setProductDescription(product.description);
  }, [product])

  // function transform(node, index) {
  //   let idx = 0;
  //   if (node.type === 'tag' && node.name === 'h3') {
  //      const text = node.children[0].data;
  //      idx++
  //      // console.log('asad', node, index)
  //      return <Heading key={idx + Math.random()} my="4" fontSize="3xl" fontWeight="bold" as="h3">{text}</Heading>;
  //   }

  //   if (node.type === "tag" && node.name === "a" && !technicalVoucher) {
  //      console.log({node})
  //      return setTechnicalVoucher(node.attribs.href);
  //   }
  // }

  if (!productDescription) return null;
  return (
    <Box px={{base: "5", md: "16"}} rounded="md" shadow="md" border="1px" borderColor="gray.100" w="full" mx="2" mb={10} py={{ base: 10, lg: 16 }}>  
      <Heading fontSize="22" pb="6" pt="2" textAlign="center">
        <FormattedMessage
          id="ProductPage.Description"
          defaultMessage="Description"
        />  
      </Heading>

      {/* INFO: Method 1 */}
      <p dangerouslySetInnerHTML={{ __html: productDescription }} />

      {/* INFO: Method 2 */}
      {/* <Text className={style.body} as="p" fontSize="16px">
        {ReactHtmlParser(product.description, { transform })}  
      </Text> */}

      {/* INFO: Method 3 */}
      {/* <div className='app'>
        {renderHTML(productDescription)}
      </div> */}

    </Box>
  )
}

export default ProductDescription
