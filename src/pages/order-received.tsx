import React, { useState, useEffect } from 'react';
// import { SEO } from 'components/seo';
import OrderReceived from 'features/order-received/order-received';
import { useCart } from 'contexts/cart/use-cart';
import { Alert, AlertIcon, Box, Container, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import bodyParser from "body-parser";
import { promisify } from "util";
import { siteURL } from 'site-settings/site-credentials';

const OrderReceivedPage = ({ reqBody }) => {
  const [order, setOrder] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const order = JSON.parse(localStorage.getItem("order"));
    setOrder(order ?? {})
    setLoading(false);

    if (Object.keys(order).length === 0) return;

    // Integrating eshopswithiq
    <script dangerouslySetInnerHTML={{__html: `
      eshopswithiq_analytics('order', {  
        'id' : ${order.id},
        'revenue' : ${order.total},   
        'currency' : 'EUR',
        'products': ${order.line_items.map(p => ({ 'id': p.id, 'sku': p.sku, 'name': p.name, 'price': p.price, 'quantity': p.quantity }))}
        });
    `}}/>
  }, []);


  if (!loading && Object.keys(order).length === 0 ) return (
    <>
      <SEOComponent />
      <Box pt="24" h="80vh">
        <Container maxW="container.lg" centerContent mt="5">
          <Alert status="warning" w="max">
            <AlertIcon />
            <Text fontWeight="semibold">
              You have no order on pending!
            </Text>
          </Alert>
        </Container>
      </Box>
    </>
  );

  return (
    <>
      <SEOComponent />
      <OrderReceived order={order} alphaBankData={reqBody} />
    </>
  );
};

function SEOComponent() {
  return (
    <>
      <Head>
        <title>Ευχαριστούμε για την παραγγελία σου - SFKshop</title>
      </Head>
      <NextSeo 
        description="Λάβαμε την παραγγελία σου. Άμεση παράδοση - Τεχνική Υποστήριξη"
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large"
        }}
        openGraph={{
          title: "Ευχαριστούμε για την παραγγελία σου - SFKshop",
          description: 'Λάβαμε την παραγγελία σου. Άμεση παράδοση - Τεχνική Υποστήριξη',
          url: 'https://sfkshop.gr/order-received/',
          locale: 'el_GR',
          type: 'article',
          site_name: 'SFKshop',
          article: {
            authors: [
              'https://facebook.com/sfkshop.gr'
            ],
            modifiedTime: new Date().toISOString()
          },
          images: [
            {
              url: `${siteURL}/wp-content/uploads/2020/05/fan-page-likes.jpg`,
              secureUrl: `${siteURL}/wp-content/uploads/2020/05/fan-page-likes.jpg`,
              width: 1200,
              height: 628,
              alt: 'fan page likes',
              type: 'image/jpeg'
            }
          ]
        }}
        twitter={{
          cardType: 'summary_large_image'
        }}
      />
    </>
  )
}

const getBody = promisify(bodyParser.urlencoded({extended: true}));
export async function getServerSideProps({ req, res }) {
  await getBody(req, res); 
  console.log('Alpha Testing Success: ', {reqMethod: req.method, reqBody: req.body});

  return {
    props: {
      reqBody: req.body
      // context: JSON.stringify(context.res)
    }, // will be passed to the page component as props
  }
}


export default OrderReceivedPage;
