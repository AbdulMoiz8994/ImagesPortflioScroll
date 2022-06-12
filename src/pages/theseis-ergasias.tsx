import React from 'react';
import { Modal } from "@redq/reuse-modal";
import WishlistFloatButton from 'components/common/WishlistFloatButton';
import ComparisonFloatButton from 'layouts/ComparisonFloatButton';
import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import CloseModalOutsideClick from 'utils/closeModalOutsideClick';
import CartPopUp from 'features/carts/cart-popup';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { siteURL } from 'site-settings/site-credentials';

const Jobs = ({ deviceType }) => {
  return (
    <>
      <Head>
        <title>Θέσεις Εργασίας - SFKshop</title>
      </Head>
      <NextSeo
        description="Στο sfkshop.gr, δίνουμε ιδιαίτερη έμφαση στους ανθρώπινους πόρους και στη διαρκή βελτίωσή τους. Επιδιώκουμε την ανάδειξη του έμψυχου δυναμικού μας ως του κύριου συντελεστή της δυναμικής ανάπτυξής μας προσφέροντάς του τις επιπλέον γνώσεις και εμπειρίες, ώστε να αντιλαμβάνεται και να αξιοποιεί τις επιχειρηματικές ευκαιρίες που εμφανίζονται στο έντονα ανταγωνιστικό και διαρκώς μεταβαλλόμενο χώρο της Τεχνολογίας. Αναζητάμε […]"
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large",
        }}
        canonical="https://sfkshop.gr/theseis-ergasias/"
        openGraph={{
          locale: "el_GR",
          type: "article",
          title: "Θέσεις Εργασίας",
          description: "Εξασφάλιση του Απορρήτου της Μεταφοράς των Προσωπικών σας Δεδομένων:Για την εξασφάλιση του απορρήτου της μεταφοράς των δεδομένων, η ΕΤΑΙΡΕΙΑ χρησιμοποιεί το πρωτόκολλο κρυπτογράφησης SSL 256-bit. Επιπροσθέτως διαθέτει ψηφιακό πιστοποιητικό προστασίας του ομίλου SimpleSSL, αναγνωρισμένου ως κορυφαίου στον τομέα της ασφάλειας των συναλλαγών.    3D Secure:Το sfkshop.gr έχει προχωρήσει στην υιοθέτηση του πρωτοκόλλου 3D-Secure με στόχο […]",
          url: "https://sfkshop.gr/theseis-ergasias/",
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
              alt: "Επιστροφές Προϊόντων",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <Modal>
        <WishlistFloatButton />
        <ComparisonFloatButton />
        <Box py="20" bg="white">
          <Container
            my="8"
            maxW="1440px"
            width="97%"
            fontWeight="400"
            fontSize="18"
          >
            <Stack spacing="10">
              <Heading fontSize="30" as='h1'>Θέσεις Εργασίας</Heading>

              <Stack spacing="3">
                <Text>Στο sfkshop.gr, δίνουμε ιδιαίτερη έμφαση στους ανθρώπινους πόρους και στη διαρκή βελτίωσή τους.</Text>
              </Stack>
              
              <Stack spacing="3">
                <Text>Επιδιώκουμε την ανάδειξη του έμψυχου δυναμικού μας ως του κύριου συντελεστή της δυναμικής ανάπτυξής μας προσφέροντάς του τις επιπλέον γνώσεις και εμπειρίες, ώστε να αντιλαμβάνεται και να αξιοποιεί τις επιχειρηματικές ευκαιρίες που εμφανίζονται στο έντονα ανταγωνιστικό και διαρκώς μεταβαλλόμενο χώρο της Τεχνολογίας.</Text>
              </Stack>
              
              <Stack spacing="3">
                <Text>Αναζητάμε δυναμικά στελέχη με τυπικά προσόντα, δημιουργική σκέψη, αποφασιστικότητα και διάθεση για μάθηση και προσφορά, για να στελεχώσουμε τις νέες θέσεις εργασίας για εργασία remote. Παρέχουμε τη δυνατότητα εφαρμογής των θεωρητικών γνώσεων στην πράξη, ευκαιρίες συνεχούς εκπαίδευσης και ένα διαρκώς εξελισσόμενο περιβάλλον εργασίας προσφέροντας ισότητα ευκαιριών επαγγελματικής αποκατάστασης και εξέλιξης. </Text>
              </Stack>
              
              <Stack spacing="1">
                <Text>Έλα κι εσύ στην παρέα μας:</Text>
  
                <Text>Υποβολή Βιογραφικού στο  
                  <Text ml="2" as="span">
                    <a href="mailto: info@sfkshop.gr">
                      info@sfkshop.gr
                    </a>
                  </Text>
                </Text>
  
              </Stack>
            </Stack>
          </Container>
        </Box>
        <CloseModalOutsideClick>
          <CartPopUp deviceType={deviceType} />
        </CloseModalOutsideClick>
      </Modal>
    </>
  )
}

export default Jobs