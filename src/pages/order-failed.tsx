import { Box, Container, Heading, Stack } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { alphaMerchantId } from 'site-settings/site-credentials';
import { getOrderFromLocalStorage, removeOrderFromLocalStorage, updateOrder } from 'services/orders';
import router from 'next/router';
// import { parseBody } from 'next/dist/next-server/server/api-utils'
import bodyParser from "body-parser";
import { promisify } from "util";

const Failed = ({ data }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [order, setOrder] = useState(null)
  const mid = data.mid;
  const orderid = data.orderid;
  
  // Avoid from hacker
  useEffect(() => {
    const order = getOrderFromLocalStorage();
    
    if (mid === alphaMerchantId && orderid === order?.number) {
      setIsAuthenticated(true);
    }  
    setOrder(order);
  }, []);

  // Changing the status of the order
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to homepage
      setTimeout(() => {
        router.push("/");
      }, 4000);
    };

    updateOrderAsync();
    async function updateOrderAsync() {
      if (!order) return;

      // Delete order from woocommerce
      await updateOrder(order?.id, { status: 'failed' });
      
      // Delete from localStorage
      removeOrderFromLocalStorage();

      // Redirect to homepage
      setTimeout(() => {
        router.push("/");
      }, 4000);
    }
  }, [isAuthenticated])

  return (
    <Wrapper>
      <Alert status='error' w="max">
        <AlertIcon />
        <AlertTitle>Η παραγγελία απέτυχε!</AlertTitle>
        <AlertDescription>Γίνεται ανακατεύθυνση στην Αρχική...</AlertDescription>
      </Alert>
    </Wrapper>
  )
}

function Wrapper({ children }) {
  return (
    <Box py="36" h="80vh">
      <Container centerContent>
        {children}
      </Container>
    </Box>
  )
}

const getBody = promisify(bodyParser.urlencoded({ extended: true }));
export async function getServerSideProps({ req, res }) {
  await getBody(req, res); 
  console.log('Alpha Testing Failure: ', {reqMethod: req.method, reqBody: req.body});
  
  return {
    props: {
      data: req.body
      // context: JSON.stringify(context.res)
    }, // will be passed to the page component as props
  }
}

export default Failed