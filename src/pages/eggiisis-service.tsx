import { Box, Container, Divider, Heading, SimpleGrid, Stack, Text, Image, Center, Icon, Circle, Square, Flex } from '@chakra-ui/react'
import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { GiReturnArrow, GiStorkDelivery,} from 'react-icons/gi'
import { GrDeliver } from 'react-icons/gr'
import NextImage from 'next/image'
import ComparisonFloatButton from 'layouts/ComparisonFloatButton'
import { Modal } from '@redq/reuse-modal';
import CloseModalOutsideClick from 'utils/closeModalOutsideClick'
import CartPopUp from 'features/carts/cart-popup';

import Head from 'next/head';
import { NextSeo } from 'next-seo'
import { siteURL } from 'site-settings/site-credentials'

const ServicesPage = ({ deviceType }) => {
  return (
    <>
      {/* SEO section */}
      <Head>
        <title>Εγγυήσεις-Service - SFKshop</title>
      </Head>
      <NextSeo 
        description="Επιστροφές Προϊόντων Πολιτική Επιστροφών DOA Άμεση αντικατάσταση Στη περίπτωση της άμεσης αντικατάστασης σημαίνει ότι το προϊόν που λάβατε είναι ελαττωματικό από τη στιγμή που βγήκε από τη συσκευασία του και μπορείτε να μας το επιστρέψετε μέσα σε 7 ημερολογιακές ημέρες και εμείς άμεσα θα σας στείλουμε καινούργιο Εγγύηση Επισκευή ή αντικατάσταση Στη περίπτωση που έχουν περάσει […]"
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large"
        }}
        canonical="https://sfkshop.gr/eggiisis-service/"
        openGraph={{
          locale: 'el_GR',
          type: 'article',
          title: 'Εγγυήσεις-Service - SFKshop',
          description: 'Άμεση αντικατάσταση',
          url: 'https://sfkshop.gr/eggiisis-service/',
          site_name: 'SFKshop',
          article: {
            authors: [
              'https://facebook.com/sfkshop.gr'
            ],
            modifiedTime: new Date().toISOString()
          },
          images: [
            {
              url: `${siteURL}/wp-content/themes/rehub-theme/images/default/blank.gif`,
              secureUrl: `${siteURL}/wp-content/themes/rehub-theme/images/default/blank.gif`,
              alt: 'Εγγυήσεις-Service',
            }
          ],
        }}
        twitter={{
          cardType: 'summary_large_image'
        }}
      />

      {/* Main section */}
      <Modal>
        <ComparisonFloatButton />
        <Box py="12" bg="white">
          <Container my="8" maxW="container.xl" width="97%" fontWeight="400" fontSize="18">
            <Heading fontSize="30" as="h1">Επιστροφές Προϊόντων</Heading>

            <Stack py="10" spacing="10">
              <ReturnPolicySection />
              <ReturnPolicySection2 />
              <ReturnProcedureSection />
            </Stack>
          </Container>

          <CloseModalOutsideClick>
            <CartPopUp deviceType={deviceType} />
          </CloseModalOutsideClick>
        </Box>
      </Modal>
    </>
  )
}

function StepCard({ step, RenderIcon, label, description }) {
  return (
    <Box rounded="3xl" w="full" bg="#F8F8F8" >
      <Stack w="full" p="5" justifyContent="center" pb="10" align="center" spacing="8">
        <Heading fontSize="26">Βήμα 1 {step}</Heading>

        <Stack align="center" spacing="4">
          <Circle w="max" p="5" bg="white">
            <Icon as={RenderIcon} fontSize="5xl" />
          </Circle>
          <Heading fontSize="20">{label}</Heading>
          <Text align="center">{description}</Text>
        </Stack>
      </Stack>
    </Box>
  )
}

function ReturnProcedureSection() {
  return (
    <Stack>
      <Heading fontSize="28">Πολιτική Επιστροφών</Heading>
      <Divider borderColor="gray.500" />

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3  }} spacing="5">
        <StepCard 
          step="1"
          RenderIcon={FaPhoneAlt}
          label="Επικοινωνήστε μαζί μας"
          description="Στείλτε email στο info@sfkshop.gr ή πάρτε τηλέφωνο στο 2106421065 για να μας ενημερώσετε για το πρόβλημα που αντιμετωπίζετε στο προϊόν."
        />
        <StepCard 
          step="2"
          RenderIcon={GiReturnArrow}
          label="Επιστροφή με ACS Courier"
          description="Μεταβείτε στο κοντινότερο κατάστημα της Courier ή καλέστε να έρθουν να παραλάβουν το δέμα και τους αναφέρετε με χρέωση παραλήπτη."
        />
        <StepCard 
          step="3"
          RenderIcon={GrDeliver}
          label="Ενημέρωση Εγγύησης"
          description="Ο ειδικός μας θα σας ενημερώσει αν είναι το προϊόν εντός εγγύησης και κατόπιν συνεννόησης γίνεται επισκευή ή αντικατάσταση."
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="5" py="4">
        <Box rounded="3xl" w="full" bg="#F8F8F8" py="4">
          <Stack w="full" p="5" justifyContent="center" pb="10"  spacing="8">
            <Heading fontSize="24">Στοιχεία Αποστολής</Heading>

            <Stack>
              <Text>SFKshop Νικολαϊδου Παναγιώτα</Text>
              <Text>Κουμανούδη 1, Αθήνα</Text>
              <Text>TK 11474</Text>
            </Stack>

            <Stack>
              <Text>* Το κατάστημα μας δε φέρνει καμία ευθύνη για το πως θα παραδώσετε το προϊόν στη Courier</Text>
              <Text>** Το κατάστημα μας δε δέχεται με χρέωση δική μας στη περίπτωση που επιστρέψετε ένα προιόν χωρίς αιτία ή να μην είναι προβληματικό</Text>
            </Stack>
          </Stack>
        </Box>
        <Box rounded="3xl" w="full" bg="#F8F8F8" py="4">
          <Stack w="full" p="5" justifyContent="center" pb="10"  spacing="8">
            <Heading fontSize="24">Χρόνος διεκπεραίωσης Service</Heading>

            <Stack>
              <Text>Ο χρόνος διάρκειας επιστροφών ή Service διαρκεί από  
                <Text as="span" fontWeight="bold" mx="2">
                  7 έως και 10 εργάσιμες
                </Text>
                 ημέρες
              </Text>
              <Text>*Οι χρόνοι αυτοί δε αφορούν αν εμπλακεί ο προμηθευτής ή κατασκευαστής του προϊόντος που στείλατε πίσω</Text>
            </Stack>
          </Stack>
        </Box>
      </SimpleGrid>
    </Stack>
  )
}

function ReturnPolicySection() {
  return (
    <Stack>
      <Heading fontSize="28">Πολιτική Επιστροφών</Heading>
      <Divider borderColor="gray.500" />
      
      <SimpleGrid spacing="5" columns={{ base: 1, md: 2 }}>
        <Box rounded="3xl" w="full" bg="#ADF4FF">
          <SimpleGrid columns={{ base: 1, md: 2 }}>
          <Stack py="8" pl="8" spacing="4" justifyContent="center" align="flex-start">
              <Heading fontSize="20">DOA</Heading>
              <Text>Άμεση αντικατάσταση</Text>
              <Text fontSize="14">
                Στη περίπτωση της άμεσης αντικατάστασης σημαίνει ότι το προϊόν που λάβατε είναι ελαττωματικό από τη στιγμή που βγήκε από τη συσκευασία του και μπορείτε να μας το επιστρέψετε μέσα σε 
                <Text as="span" fontWeight="bold" fontSize="14"> 7 ημερολογιακές ημέρες </Text> 
                και εμείς άμεσα θα σας στείλουμε καινούργιο
              </Text>
            </Stack>
            <Box p="5">
               <NextImage 
                src={`${siteURL}/wp-content/uploads/2021/05/%CE%B2%CE%BF%CE%B7%CE%B8%CE%BF%CC%81%CF%82-%CE%B1%CE%B3%CE%BF%CF%81%CE%B1%CC%81%CF%82-%CE%B3%CE%B9%CE%B1-ajax-1536x1536.png`}
                layout="responsive"
                width={40}
                height={50}
              />
            </Box>
          </SimpleGrid>
        </Box>
        <Box rounded="3xl" w="full" bg="#F9E9EF">
          <SimpleGrid columns={{ base: 1, md: 2 }}>
            <Stack py="8" pl="8" spacing="4" justifyContent="center" align="flex-start">
              <Heading fontSize="20">Εγγύηση</Heading>
              <Text>Επισκευή ή αντικατάσταση</Text>
              <Text fontSize="14">
                Στη περίπτωση που έχουν περάσει οι 
                <Text as="span" fontWeight="bold" fontSize="14"> 7 ημέρες </Text> 
                και το προϊόν σας είναι εντός εγγύησης, μπορείτε να έρθετε σε επικοινωνία μαζί μας για να εκμεταλλευτείτε την εγγύηση σας. Αφού γίνει έλεγχος θα ενημερωθείτε άμεσα για τη πορεία της επισκευής του ή αντικατάστασης του αν δεν επισκευάζεται. Το κόστος αποστολής είναι δωρεάν και εσείς χρεώνεστε την επιστροφή του επισκευασμένου προϊόντος.
                {/* <Text as="span" fontWeight="bold" fontSize="18"> receipt or invoice.</Text> */}
              </Text>
            </Stack>
            <Box p="5">
              <NextImage 
                src={`${siteURL}/wp-content/uploads/2021/05/backgroundcut_highres-1080x1589.png`}
                layout="responsive"
                width={40}
                height={50}
                // w="full"
                // h="full"
              />
            </Box>
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </Stack>
  )
}

function ReturnPolicySection2() {
  return (
    <Stack>
      <Heading fontSize="28">Προϋποθέσεις</Heading>
      <Divider borderColor="gray.500" />
      
      <SimpleGrid spacing="5" columns={{ base: 1, md: 2 }}>
        <Box rounded="3xl" w="full" bg="#b0feeb">
          <SimpleGrid columns={{ base: 1, md: 2 }}>
            <Stack p="8" justifyContent="center" align="flex-start">
              <Heading fontSize="20" pb="5">Συσκευασία & Απόδειξη</Heading>
              <Text fontSize="14">
              Και στις δύο παραπάνω περιπτώσεις είναι υποχρεωτικό να επιστραφεί πίσω ολόκληρη η συσκευασία μαζί με τα παρελκόμενα της και η απόδειξη που λάβατε.
              </Text>
            </Stack>
            <Box p="5">
              <NextImage 
                src={`${siteURL}/wp-content/uploads/2021/05/packaging-epistrofes-page-1536x1536.png`}
                layout="responsive"
                width={40}
                height={50}
                // w="full"
                // h="full"
              />
            </Box>
          </SimpleGrid>
        </Box>
        <Box rounded="3xl" w="full" bg="#f8f8f8">
          <SimpleGrid columns={{ base: 1, md: 2 }}>
            <Stack p="8" justifyContent="center" align="flex-start">
              <Heading fontSize="20" pb="5">Πότε γίνεται δεκτή η εγγύηση;</Heading>
              <Text fontSize="14">
              Οι εγγυήσεις γίνονται δεκτές εφόσον το προϊόν έχει βγάλει κάποιο πρόβλημα από το κατασκευαστή και όχι μετά από δική σας κακή χρήση. Για τα προϊόντα των κατηγοριών “Μοτέρ Γκαραζόπορτας” και “Μπάρες Parking”, η εγγύηση ισχυεί για την καλή λειτουργία του μοτέρ. Αν γίνει λάθος στην τοποθέτηση, 
                <Text as="span" fontWeight="bold" fontSize="14"> δεν ισχύει η εγγύηση. </Text> 
              </Text>
            </Stack>
            <Flex p="5">
              <Box w="full" my="auto" h="10rem" position="relative" >
                <NextImage 
                  src={`${siteURL}/wp-content/uploads/2021/03/hero_image_apodoxi.png`}
                  layout="fill"
                />
              </Box>
            </Flex>
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </Stack>
  )
}

export default ServicesPage
