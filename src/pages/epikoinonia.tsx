import { Box, Button, Container, Divider, FormControl, FormLabel, Heading, Input, SimpleGrid, Stack, Text, Textarea, useToast, Wrap } from '@chakra-ui/react'
import React, { useState } from 'react'
import { chakra } from '@chakra-ui/react';
 
import { Modal } from '@redq/reuse-modal';
import CloseModalOutsideClick from 'utils/closeModalOutsideClick';
import CartPopUp from 'features/carts/cart-popup';
import ComparisonFloatButton from 'layouts/ComparisonFloatButton';

import Head from 'next/head';
import { NextSeo } from 'next-seo';
import axios from 'axios';
import { siteURL } from 'site-settings/site-credentials';

const ContactUs = ({ deviceType }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const toast = useToast();

  const handleSubmit = async () => {
    setLoading(true);

    const { data, status } = await axios.post("/api/sendgrid", {
      customerEmail: email,
      name,
      message
    });
    // console.log({ data, status })
    setLoading(false);

    if (status === 200) {
      toast({
        title: "Email sent successfully!",
        status: 'success',
        position: 'top',
        isClosable: true,
      });

      setName('');
      setEmail('');
      setMessage('');

      return;
    } 

    toast({
      title: "Something went wrong...",
      status: 'error',
      position: 'top',
      isClosable: true,
    });
  }


  return (
    <>
      {/* SEO Section */}
      <Head>
        <title>Επικοινωνία - SFKshop</title>
      </Head>
      <NextSeo 
        description="Στοιχεία Επιχείρησης SFKshop.gr – Γκαραζόπορτες / Αυτοματισμοί/ Smart Home/ Αξεσουάρ Κινητών Γραφεία: Κουμανούδη 1, 11474, Αθήνα Αρ. Γ.Ε.ΜΗ: 149354603000 Ωράριο Λειτουργίας: Δευτέρα – Παρασκευή: 10:00 με 17:00 Τηλέφωνο : 21064-21065"
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large"
        }}
        canonical="https://sfkshop.gr/epikoinonia/"
        openGraph={{
          locale: 'el_GR',
          type: 'article',
          title: 'Επικοινωνία - SFKshop',
          description: 'Στοιχεία Επιχείρησης SFKshop.gr – Γκαραζόπορτες / Αυτοματισμοί/ Smart Home/ Αξεσουάρ Κινητών Γραφεία: Κουμανούδη 1, 11474, Αθήνα Αρ. Γ.Ε.ΜΗ: 149354603000 Ωράριο Λειτουργίας: Δευτέρα – Παρασκευή: 10:00 με 17:00 Τηλέφωνο : 21064-21065',
          url: 'https://sfkshop.gr/epikoinonia/',
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

      {/* Main section */}
      <Modal>
        <ComparisonFloatButton />
        <Box py="12" px={{ base: "3", md: "10" }} minH="80vh">
          <Container maxW={{ base: 'container.lg', md: 'container.xl' }} centerContent py={{ base: "5", md: "10" }}>
            <Heading fontWeight="semibold">
              {/* Contact Us */}
              Επικοινωνία
            </Heading>

            <Box w="full" my="10">
              <SimpleGrid justifyContent="center" columns={{ base: 1, md: 2 }}>
                {/* Business Data */}
                <Box borderRight={{ base: "0", md: "1px" }}  py="5" px={{ base: "0", md: "5"}}>
                  <Stack spacing="6">
                    <Heading as="h1" fontSize="2xl" fontWeight="semibold">Στοιχεία Επιχείρησης</Heading>
                    <Text>SFKshop.gr – Γκαραζόπορτες / Αυτοματισμοί/ Smart Home/ Αξεσουάρ Κινητών  </Text>
                    <Stack spacing="0">
                      <Text>Γραφεία: Κουμανούδη 1, 11474, Αθήνα</Text>
                      <Text>Αρ. Γ.Ε.ΜΗ: 149354603000</Text>
                    </Stack>
                    <Stack spacing="0">
                      <Text>Ωράριο Λειτουργίας:</Text>
                      <Text>Δευτέρα – Παρασκευή: 10:00 με 15:00</Text>
                    </Stack>
                    <Stack spacing="0">
                      <Text>Τηλέφωνο :</Text> 
                      <Text>21064-21065</Text>    
                    </Stack>
                  </Stack>
                </Box>

                {/* Form section */}
                <Box px={{ base: "0", md: "5" }} py="5" mt={{ base: '12', md: "0" }}>
                  <Stack>
                    <Heading as="h1" fontSize="2xl" fontWeight="semibold" >Επικοινωνία</Heading>
                        <chakra.form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit()
                          }}
                        >
                      <Stack spacing="5">
                          <FormControl isRequired  my="3">
                            {/* <FormLabel>Name</FormLabel> */}
                            <FormLabel>Όνοματεπώνυμο </FormLabel>
                            <Input 
                              _focus={{ outline: 'none', borderColor: "black" }} 
                              borderColor="gray.400" 
                              rounded="md" 
                              size="md" 
                              value={name}
                              onChange={(e) => setName(e.currentTarget.value)}
                            />
                          </FormControl>
                          <FormControl isRequired >
                            <FormLabel>Email</FormLabel>
                            <Input 
                              type='email'
                              _focus={{ outline: 'none', borderColor: "black" }} 
                              borderColor="gray.400" 
                              rounded="md" 
                              size="md" 
                              value={email}
                              onChange={(e) => setEmail(e.currentTarget.value)}
                            />
                          </FormControl>
                          <FormControl isRequired >
                            {/* <FormLabel>Message</FormLabel> */}
                            <FormLabel>Μήνυμα </FormLabel>
                            <Textarea 
                              _focus={{ outline: 'none', borderColor: "black" }} 
                              borderColor="gray.400" 
                              rounded="md" 
                              size="md" 
                              value={message}
                              onChange={(e) => setMessage(e.currentTarget.value)}
                            />
                          </FormControl>
                          {/* <Button isLoading={loading} w="full" type='submit' colorScheme="primary">Mission</Button> */}
                          <Button isLoading={loading} w="full" type='submit' colorScheme="primary">Αποστολή</Button>
                      </Stack>
                        </chakra.form>
                  </Stack>
                </Box>
              </SimpleGrid>
            </Box>
          </Container>
        </Box>
        <CloseModalOutsideClick>
          <CartPopUp deviceType={deviceType} />
        </CloseModalOutsideClick>
      </Modal>
    </>
  )
}

export default ContactUs
