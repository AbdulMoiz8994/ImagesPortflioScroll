import {
  Box,
  Center,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import { Icon } from "@chakra-ui/react";
import { FaEuroSign, FaRegCreditCard } from "react-icons/fa";
import ImageNext from "next/image";
import CopyClipboard from "components/common/CopyClipboard";
import { Modal } from "@redq/reuse-modal";
import CloseModalOutsideClick from "utils/closeModalOutsideClick";
import CartPopUp from "features/carts/cart-popup";
import ComparisonFloatButton from "layouts/ComparisonFloatButton";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { siteURL } from "site-settings/site-credentials";

const BANK_CARDS = [
  {
    name: "Eonik",
    color: "#69cfa6",
    accountNumber: "132 / 002966-17",
    iban: "GR52 0110 1320 0000 1320 0296 617",
    beneficiary: "Παναγιώτα Νικολαΐδου",
    // imgURL: 'https://nitrocdn.com/upCupBGtQyrvhTpNnNSdTAjLUiPDEwtd/assets/static/optimized/rev-c7b3506/wp-content/uploads/2021/05/ethinki-payment-300x84-1-1024x287.png'
    imgURL:
      `${siteURL}/wp-content/uploads/2021/05/ethinki-payment-300x84-1-1250x350.png`,
  },
  {
    name: "Alpha",
    color: "#86c7e2",
    accountNumber: "216 00 2002 004807",
    iban: "GR36 0140 2160 2160 0200 2004 807",
    beneficiary: "Παναγιώτα Νικολαΐδου",
    // imgURL: 'https://nitrocdn.com/upCupBGtQyrvhTpNnNSdTAjLUiPDEwtd/assets/static/optimized/rev-c7b3506/wp-content/uploads/2021/05/alpha-payment1-300x84-1-1024x287.png'
    imgURL:
      `${siteURL}/wp-content/uploads/2021/05/alpha-payment1-300x84-1-1250x350.png`,
  },
  {
    name: "Tpaneza",
    color: "#f3d17b",
    accountNumber: "5091-093761-336",
    iban: "GR32 0172 0910 0050 9109 3761 336",
    beneficiary: "Παναγιώτα Νικολαΐδου",
    // imgURL: 'https://nitrocdn.com/upCupBGtQyrvhTpNnNSdTAjLUiPDEwtd/assets/static/optimized/rev-c7b3506/wp-content/uploads/2021/05/pireos-payment3-300x84-1-1024x287.png'
    imgURL:
      `${siteURL}/wp-content/uploads/2021/05/pireos-payment3-300x84-1-1250x350.png`,
  },
  {
    name: "EuroBank",
    color: "#c5948b",
    accountNumber: "0026009937370200740534",
    iban: "GR10 0260 0990 0003 7020 0740 534",
    beneficiary: "Παναγιώτα Νικολαΐδου",
    // imgURL: 'https://nitrocdn.com/upCupBGtQyrvhTpNnNSdTAjLUiPDEwtd/assets/static/optimized/rev-c7b3506/wp-content/uploads/2021/05/eurobank-payment-300x84-1-1024x287.png'
    imgURL:
      `${siteURL}/wp-content/uploads/2021/05/eurobank-payment-300x84-1-1250x350.png`,
  },
];

export default function PaymentMethods({ deviceType }) {
  return (
    <>
      {/* SEO Imrovments (Start) */}
      {/* INFO: Better to add title like this (Inspired by sfkshop that is being integrated with rank math) */}
      <Head>
        <title>Τρόποι Πληρωμής - SFKshop</title>
      </Head>

      <NextSeo 
        description="Τρόποι Πληρωμής Μάθε τους τρόπους πληρωμής μας Όταν ο επιλεγόμενος τρόπος πληρωμής είναι με αντικαταβολή, η αξία αυτής δεν μπορεί να ξεπερνά το ύψος των πεντακοσίων ευρώ (500€).Σημείωση: Για τις παραγγελίες που αποστέλλονται εξολοκλήρου με πρακτορείο μεταφορών, δεν ισχύει η αντικαταβολή. Η πληρωμή γίνεται είτε μέσω κατάθεσης σε τραπεζικό λογαριασμό, είτε μέσω πιστωτικής κάρτας. Αντικαταβολή Η υπηρεσία […]"
        canonical="https://sfkshop.gr/tropoi-plirwmis/"
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large",
        }}
        openGraph={{
          locale: "el_GR",
          type: "article",
          title: "Τρόποι Πληρωμής - SFKshop",
          description: "Μάθε τους τρόπους πληρωμής μας",
          url: "https://sfkshop.gr/tropoi-plirwmis/",
          site_name: "SFKshop",
          article: {
            authors: ["https://facebook.com/sfkshop.gr"],
            modifiedTime: new Date().toISOString(),
          },
          images: [
            {
              url: `${siteURL}/wp-content/themes/rehub-theme/images/default/blank.gif`,
              secureUrl:
                `${siteURL}/wp-content/themes/rehub-theme/images/default/blank.gif`,
              alt: "τρόποι πληρωμής",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      {/* SEO Imrovments (End) */}

      <Modal>
        <ComparisonFloatButton />
        <Box py={{ base: "0", lg: "20" }} b="white">
          <Container
            my="8"
            maxW={{ base: "container.md", md: "container.xl" }}
            width="97%"
            fontWeight="400"
            fontSize="16"
          >
            <Box px="3">
              <Heading fontSize={29}>Τρόποι Πληρωμής</Heading>
              <Text my={4}>Μάθε τους τρόπους πληρωμής μας</Text>
            </Box>
            <Box backgroundColor="#f2f2f2" borderRadius="20" p="4">
              <Text>
                <strong>
                Όταν ο επιλεγόμενος τρόπος πληρωμής είναι με αντικαταβολή, η αξία αυτής δεν μπορεί να ξεπερνά το ύψος των πεντακοσίων ευρώ (500€).
                </strong>
              </Text>
              <Text>
                <strong>Σημείωση:</strong> Για τις παραγγελίες που αποστέλλονται εξολοκλήρου με πρακτορείο μεταφορών, δεν ισχύει η αντικαταβολή. Η πληρωμή γίνεται είτε μέσω κατάθεσης σε τραπεζικό λογαριασμό, είτε μέσω πιστωτικής κάρτας.
              </Text>
            </Box>

            <Box
              display={{ md: "flex" }}
              spacing="6px"
              flexDirection={"row"}
              flexWrap={"wrap"}
              pt={3}
            >
              <Box
                flex="1"
                bgGradient="linear(to-b, #effdff, #b1f4ff)"
                borderRadius={20}
                m={2}
              >
                <Box py={8} px={8}>
                  <Box ml="-1">
                    <Icon as={FaEuroSign} fontSize="52" color="#818a91" />
                  </Box>
                  <Heading pt={5} fontSize="16">
                    <strong>Αντικαταβολή</strong>
                  </Heading>
                  <Text>
                  Η υπηρεσία της αντικαταβολής χρεώνεται από τη Courier και αφορά το τρόπο πληρωμής με μετρητά όταν έρθει η παραγγελία σας.
                  </Text>
                  <Box pt={6}>
                    <Icon as={FaRegCreditCard} fontSize="52" color="#818a91" />
                  </Box>
                  <Heading pt={5} pb={1} fontSize="16">
                    <strong>Κόστος αντικαταβολής</strong>
                  </Heading>
                  <Text pb={3} fontSize="16">
                  Το κόστος της αντικαταβολής είναι 2.90 €
                  </Text>
                </Box>
              </Box>
              <Box
                flex="1"
                bgGradient="linear(to-b, #effdff, #b1f4ff)"
                borderRadius={20}
                m={2}
              >
                <Center pt={20}>
                  <Icon as={FaRegCreditCard} fontSize="10rem" color="#818a91" />
                </Center>
              </Box>
            </Box>
            <Box backgroundColor="#f2f2f2" p={3} borderRadius="20" mt={3}>
              <Text>
                Σύμφωνα με τον νέο νόμο 4446/2016, όλες οι συναλλαγές άνω των 500€, θα εξοφλούνται ηλεκτρονικά με χρήση κάρτας ή κατάθεσης σε τραπεζικό λογαριασμό.
              </Text>
              <Text>
                Το ίδιο ισχύει και για την περίπτωση της αντικαταβολής σε κούριερ ή για παραλαβή σας από κατάστημα της κούριερ.
              </Text>
              <Text>
                Δεν μπορείτε να εξοφλήσετε με μετρητά τα ποσά άνω των 500€. Μόνο με χρήση πιστωτικής-χρεωστικής κάρτας ή κατάθεση σε τράπεζα.
              </Text>
              <Text>
                Για οποιαδήποτε επιπλέον πληροφορία χρειαστείτε, σχετικά με την παραλαβή σας, στείλτε μας το ερώτημα σας, στο info@sfkshop.gr.
              </Text>
            </Box>
            <Box ml={3}>
              <Heading fontSize={21} mt={5}>
              Τραπεζική Κατάθεση
              </Heading>
              <Text mt={2} mb={5}>
              Κατάθεση σε τραπεζικό λογαριασμό
              </Text>
            </Box>
            <hr></hr>
            <Box backgroundColor="#f2f2f2" p={3} borderRadius="20" mt={5}>
              <Text>
                Χρησιμοποιήστε ως αιτιολογία οπωσδήποτε τον αριθμό της παραγγελίας σας και το
                <strong> ονοματεπώνυμο </strong> που καταχωρήσατε στην παραγγελία
              </Text>
              <Text>
              Παρακαλούμε να μας στείλετε το αποδεικτικό στο email: info@sfkshop.gr
              </Text>
            </Box>

            {/* BANK CARDS */}
            <Box
              display={{ md: "flex" }}
              spacing="6px"
              flexDirection={"row"}
              flexWrap={"wrap"}
              pt={3}
            >
              {BANK_CARDS.map((card: any, idx: number) => (
                <Center
                  key={idx}
                  flex="1"
                  backgroundColor={card.color}
                  borderRadius={20}
                  m={2}
                >
                  <Box py={8} px={8}>
                    <Center position="relative" w="full" h="20" pl={2}>
                      <ImageNext src={card.imgURL} layout="fill" />
                    </Center>
                    <Heading
                      textAlign={"center"}
                      pt={2}
                      fontSize={16}
                      fontWeight={100}
                    >
                      <strong>Αριθμός Λογαριασμού</strong>
                    </Heading>
                    <Stack justify="center" align="center">
                      <Text
                        textAlign={"center"}
                        fontWeight="light"
                        fontSize={16}
                        lineHeight={5}
                      >
                        {card.accountNumber}
                      </Text>
                      <CopyClipboard value={card.accountNumber} />
                    </Stack>
                    <Heading
                      textAlign={"center"}
                      pt={5}
                      fontSize={16}
                      fontWeight={100}
                    >
                      <strong>ΙΒΑΝ</strong>
                    </Heading>
                    <Stack justify="center" align="center">
                      <Text
                        textAlign={"center"}
                        fontWeight="light"
                        fontSize={16}
                        lineHeight={5}
                      >
                        {card.iban}
                      </Text>
                      <CopyClipboard value={card.iban} />
                    </Stack>
                    <Heading
                      textAlign={"center"}
                      pt={5}
                      fontSize={16}
                      fontWeight={100}
                    >
                      <strong>Όνομα Δικαιούχου</strong>
                    </Heading>
                    <Text
                      textAlign={"center"}
                      fontWeight="light"
                      fontSize={16}
                      lineHeight={5}
                    >
                      {card.beneficiary}
                    </Text>
                  </Box>
                </Center>
              ))}
            </Box>
            <Box backgroundColor="#f2f2f2" p={3} borderRadius="20" mt={3}>
              <Text>
              Προσοχή: Σε περίπτωση τραπεζικής κατάθεσης αυτή θα πρέπει να γίνει μόνο από την αντίστοιχη τράπεζα  (π.χ. Alpha Bank σε Alpha Bank). Διαφορετικά υπάρχει επιβάρυνση εμβάσματος και στον αποστολέα και στον παραλήπτη που επιβαρύνει τον αγοραστή.
              </Text>
              <Text>
              Η επιβεβαίωση κατάθεσης χρημάτων μέσω άλλης τράπεζας (έμβασμα) μπορεί να καθυστερήσει από 1 έως 3 εργάσιμες ημέρες. Η όποια χρηματική επιβάρυνση από μεριά της τράπεζας για την πραγματοποίηση της συναλλαγής επιβαρύνει τον αγοραστή.
              </Text>
              <Text>
              *Σε περίπτωση που δεν λάβουμε την κατάθεση σε 5 εργάσιμες, η παραγγελία σας θα ακυρωθεί.
              </Text>
            </Box>
            <Box ml={3}>
              <Heading fontSize={21} mt={5}>
              Χρεωστική ή Πιστωτική Κάρτα
              </Heading>
              <Text fontSize={17} mt={2} mb={5}>
              Δεκτές χρεωστικές ή πιστωτικές κάρτες
              </Text>
            </Box>
            <hr></hr>
            <Box backgroundColor="#f2f2f2" p={3} borderRadius="20" mt={5}>
              <Text>
                <strong>Δόσεις</strong>{" "}
              </Text>
              <Text>
                
Έως 2 άτοκες δόσεις για αγορές άνω των 30€ και έως 4 άτοκες δόσεις για αγορές άνω των 150€
              </Text>
            </Box>
            <Box backgroundColor="#f2f2f2" p={3} borderRadius="20" mt={5}>
              <Text>
              Στο SFKshop δεκτές γίνονται οι
                <strong> Visa, Mastercard, Diners, AMEX</strong> πιστωτικές κάρτες, οι Visa, Mastercard χρεωστικές κάρτες και οι Visa, Mastercard προπληρωμένες κάρτες.Εάν επιλέξεις να πληρώσεις με πιστωτική κάρτα, για ορισμένες από τις κάρτες αυτές έχεις τη δυνατότητα εξόφλησης του ποσού μέσω δόσεων (2, 3 ή 4 άτοκες δόσεις). Η πληρωμή ολοκληρώνεται σε
                <strong> ασφαλές περιβάλλον της Alpha Bank </strong>ή του 
                <strong> Stripe </strong>.
              </Text>
              <Text>
              Η παράδοση των παραγγελιών όπου η πληρωμή έχει πραγματοποιηθεί με πιστωτική κάρτα, γίνονται μόνο στον κάτοχο της πιστωτικής κάρτας, με την επίδειξη της κάρτας και της αστυνομικής ταυτότητας. Παραγγελίες με πληρωμή με πιστωτική κάρτα δεν παραδίδονται σε τρίτο πρόσωπο.
              </Text>
              <Text>Στις αναγραφόμενες τιμές συμπεριλαμβάνονται οι νόμιμοι Φόροι</Text>
              <Text>
              Μέχρι την πλήρη εξόφληση του τιμήματος τα εμπορεύματα παραμένουν στην κυριότητα της πωλήτριας εταιρείας.
              </Text>
              <Text>
              Εφόσον επιλέξεις πληρωμή με την Πιστωτική / Χρεωστική σου κάρτα, πραγματοποιείται αρχικά δέσμευση του ποσού και η τελική χρέωση πραγματοποιείται κατά την έκδοση του παραστατικού πώλησης.
              </Text>
              <Text>
              Σε περίπτωση ακύρωσης της παραγγελία σας πριν την τιμολόγηση της, η ΕΤΑΙΡΕΙΑ μας υποχρεούται να ενημερώσει την Τράπεζα για την ακύρωση της εν λόγω δέσμευσης και η Τράπεζα θα προχωρήσει σύμφωνα με τους όρους που προβλέπονται από τη σύμβαση που έχει υπογραφεί μεταξύ του πελάτη (εσείς) και της Τράπεζας του (σας). Η Εταιρεία μετά από την ενημέρωση αυτή δεν φέρει καμία ευθύνη για την υλοποίηση των όρων της προαναφερθείσας σύμβασης μεταξύ του πελάτη και της Τράπεζας καθώς και για τον χρόνο και τρόπο εκτέλεσης του αντιλογισμού της εν’ λόγω συναλλαγής
              </Text>
              <Text>
              Η πληρωμή με τραπεζική κάρτα προσφέρεται μόνο για On-Line παραγγελίες από το SFKshop και όχι για την περίπτωση της πληρωμής με αντικαταβολή.
              </Text>
              <Text>
                <strong>
                  <u>Σχετική Νομοθεσία</u>
                </strong>
              </Text>
              <Text>
              Σύμφωνα με το Νόμο Ν.4446/2016 άρθρο 69 §2 που τροποποίησε το άρθρο 20 §3του Ν. 3842/2010 «Τα φορολογικά στοιχεία συνολικής αξίας πεντακοσίων (500) ευρώ και άνω, που εκδίδονται για πώληση αγαθών ή παροχή υπηρεσιών σε ιδιώτες, εξοφλούνται από τους λήπτες τους, αγοραστές των αγαθών ή των υπηρεσιών, αποκλειστικώς με τη χρήση μέσων πληρωμής με κάρτα ή άλλου ηλεκτρονικού μέσου πληρωμής, όπως ενδεικτικά άλλα όχι περιοριστικά τραπεζικό έμβασμα, πληρωμή μέσω λογαριασμού πληρωμών, χρήση ηλεκτρονικού πορτοφολιού. Δεν επιτρέπεται εξόφληση των στοιχείων αυτών με μετρητά.» Ως εκ τούτου οι παραγγελίες με αξία άνω των 500 ευρώ συμπεριλαμβανομένων των φόρων και λοιπών επιβαρύνσεων θα πρέπει να εξοφλούνται με τους παραπάνω τρόπους.
              </Text>
            </Box>
            <Box ml={3}>
              <Heading fontSize={21} mt={5}>
                PayPal, Masterpass, Google Pay and Apple Pay
              </Heading>
              <Text fontSize={17} mt={2} mb={5}>
              Οι πιο διαδεδομένοι και ασφαλής τρόποι στο κόσμο
              </Text>
            </Box>
            <hr></hr>
            <Box
              display={{ md: "flex" }}
              spacing="6px"
              flexDirection={"row"}
              flexWrap={"wrap"}
              pt={3}
            >
              <Box
                flex="1"
                backgroundColor="lightBlue"
                borderRadius={20}
                m={2}
                bgGradient="linear(to-br, #e9f9fe , #b2f4ff )"
              >
                <Box py={8} px={8}>
                  {/* <Box pl={2}><FontAwesomeIcon icon={faEuroSign} size="4x" /></Box> */}
                  <Center position="relative" w="56" h="20" pl={2}>
                    {/* <FontAwesomeIcon icon={faEuroSign} size="4x" /> */}
                    <ImageNext
                      //  src="https://nitrocdn.com/upCupBGtQyrvhTpNnNSdTAjLUiPDEwtd/assets/static/optimized/rev-c7b3506/wp-content/uploads/2021/05/paypal-1024x287.png"
                      src={`${siteURL}/wp-content/uploads/2021/05/paypal-1250x350.png`}
                      layout="fill"
                    />
                  </Center>
                  <Text fontSize={16} pt={5}>
                    Στην περίπτωση αυτή πληρώνεις την παραγγελία με τον PayPal λογαριασμό σου. Για να ενεργοποιήσεις την πληρωμή θα μεταφερθείς στη σελίδα login του PayPal. Ο λογαριασμός σου θα χρεωθεί την ημέρα της παραγγελίας σου. Εάν δεν έχεις λογαριασμό PayPal, μπορείς να δημιουργήσεις έναν από τη σελίδα login του PayPal κάνοντας κλικ εδώ. Για πληροφορίες σχετικά με την υπηρεσία PayPal θα πρέπει να απευθυνθείτε στην ιστοσελίδα της υπηρεσίας. Οι παραγγελίες με τρόπο πληρωμής PayPal υπόκεινται σε επιπλέον ελέγχους από την εταιρία μας και ενδέχεται να απορριφθούν, να σου ζητηθεί άλλος τρόπος πληρωμής ή και να υπάρξουν καθυστερήσεις στην αποστολή τους. Επίσης ενδέχεται να σου ζητηθούν επιπλέον στοιχεία ταυτοποίησης των στοιχείων σου. Η πληρωμή με PayPal προσφέρεται μόνο για On-Line παραγγελίες από το SFKshop και για αποστολή στο χώρο σου με ACS, ELTA Courier ή παράδοση από εμάς.
                  </Text>
                </Box>
              </Box>
              <Box
                flex="1"
                backgroundColor="lightBlue"
                borderRadius={20}
                m={2}
                bgGradient="linear(to-br, #fdb858  , #eb5360  )"
              >
                <Box py={8} px={8}>
                  {/* <Box pl={2}><FontAwesomeIcon icon={faEuroSign} size="4x" /></Box> */}
                  <Center position="relative" w="64" h="20" pl={2}>
                    {/* <FontAwesomeIcon icon={faEuroSign} size="4x" /> */}
                    <ImageNext
                      //  src="https://nitrocdn.com/upCupBGtQyrvhTpNnNSdTAjLUiPDEwtd/assets/static/optimized/rev-c7b3506/wp-content/uploads/2021/05/masterpass-1024x287.png"
                      src={`${siteURL}/wp-content/uploads/2021/05/masterpass-1250x350.png`}
                      layout="fill"
                    />
                  </Center>
                  <Text fontSize={16} pt={5}>
                  Το Masterpass είναι μια υπηρεσία ψηφιακών πληρωμών που επιταχύνει τη διαδικασία ολοκλήρωσης μιας αγοράς, αποθηκεύοντας όλες τις πληροφορίες πληρωμών και αποστολών σε ένα ασφαλές περιβάλλον, για εσάς, που θέλετε σιγουριά στις online αγορές σας.
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box
              display={{ md: "flex" }}
              flexDirection={"row"}
              flexWrap={"wrap"}
            >
              <Box
                flex="1"
                backgroundColor="lightBlue"
                borderRadius={20}
                m={2}
                bgGradient="linear(to-br, #fbfbfb   , #313131 )"
              >
                <Box py={8} px={8}>
                  {/* <Box pl={2}><FontAwesomeIcon icon={faEuroSign} size="4x" /></Box> */}
                  <Center position="relative" w="44" h="16" pl={2}>
                    {/* <FontAwesomeIcon icon={faEuroSign} size="4x" /> */}
                    <ImageNext
                      //  src="https://nitrocdn.com/upCupBGtQyrvhTpNnNSdTAjLUiPDEwtd/assets/static/optimized/rev-c7b3506/wp-content/uploads/2021/05/apple-pay-logo-852x350.png"
                      src={`${siteURL}/wp-content/uploads/2021/05/apple-pay-logo-1080x443.png`}
                      layout="fill"
                    />
                  </Center>
                  <Text fontSize={16} pt={5}>
                  Το Apple Pay παρέχει έναν εύκολο, ασφαλή και απόρρητο τρόπο πληρωμών σε iPhone, iPad, Apple Watch και Mac χωρίς πλαστική κάρτα ή μετρητά.
                  </Text>
                </Box>
              </Box>
              <Box
                flex="1"
                backgroundColor="lightBlue"
                borderRadius={20}
                m={2}
                bgGradient="linear(to-br, #c0ffd0    , #4184f2  )"
              >
                <Box py={8} px={8}>
                  {/* <Box pl={2}><FontAwesomeIcon icon={faEuroSign} size="4x" /></Box> */}
                  <Center position="relative" w="44" h="16" pl={2}>
                    {/* <FontAwesomeIcon icon={faEuroSign} size="4x" /> */}
                    <ImageNext
                      //  src="https://nitrocdn.com/upCupBGtQyrvhTpNnNSdTAjLUiPDEwtd/assets/static/optimized/rev-c7b3506/wp-content/uploads/2021/05/google-pay-gpay-logo-844x350.png"
                      src={`${siteURL}/wp-content/uploads/2021/05/google-pay-gpay-logo-1080x448.png`}
                      layout="fill"
                    />
                  </Center>
                  <Text pt={5}>
                  Το Google Pay επιτρέπει στους χρήστες να απολαμβάνουν τα οφέλη των ανεπαφικών πληρωμών χωρίς να χρησιμοποιούν φυσική βίζα ή MasterCard. 
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box ml={3}>
              <Heading fontSize={21} mt={5}>
              Χρήση δωροεπιταγής ή κουπονιού
              </Heading>
              <Text mt={2} mb={5}>
              Εξοικονομήστε χρήματα με τη χρήση ενός κουπονιού
              </Text>
              {/* <Image src={Apple} /> */}
            </Box>
            <hr></hr>
            <Box mt="5" backgroundColor="#f2f2f2" p={3} borderRadius="20">
              <Text>
              Η χρήση δωροεπιταγής, διατακτικής ή κουπονιού μπορεί να μειώσει την αξία της παραγγελίας σου ή το συνολικό τίμημα. Για την χρήση τους ανατρέξτε στην ενότητα Χρήση Κουπονιού – Δωροεπιταγής.
              </Text>
            </Box>
          </Container>
        </Box>

        <CloseModalOutsideClick>
          <CartPopUp deviceType={deviceType} />
        </CloseModalOutsideClick>
      </Modal>
    </>
  );
}
