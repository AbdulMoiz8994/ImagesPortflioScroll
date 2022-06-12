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

const GDPR = ({ deviceType }) => {
  return (
    <>
      <Head>
        <title>Προστασία Προσωπικών Δεδομένων (GDPR) - SFKshop</title>
      </Head>
      <NextSeo
        description="Γενικά H ΕΠΙΧΕΙΡΗΣΗ, δημιούργησε την παρούσα ιστοσελίδα με μοναδικό σκοπό την εξυπηρέτηση των πελατών της. Οι πληροφορίες που συγκεντρώνονται από την ΕΠΙΧΕΙΡΗΣΗ αφορούν στην διεκπεραίωση της παραγγελίας μέσω της παρούσας ιστοσελίδας.  Η παρούσα Δήλωση Προστασίας Προσωπικών Δεδομένων και συμπληρωματικά οι Όροι Χρήσης της παρούσας ιστοσελίδας περιγράφουν τη μέθοδο συλλογής δεδομένων, τη χρήση αυτών των δεδομένων […]"
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large",
        }}
        canonical="https://sfkshop.gr/prostasia-prosopikon-dedomenon-gdpr/"
        openGraph={{
          locale: "el_GR",
          type: "article",
          title: "Προστασία Προσωπικών Δεδομένων (GDPR)",
          description: "Εξασφάλιση του Απορρήτου της Μεταφοράς των Προσωπικών σας Δεδομένων:Για την εξασφάλιση του απορρήτου της μεταφοράς των δεδομένων, η ΕΤΑΙΡΕΙΑ χρησιμοποιεί το πρωτόκολλο κρυπτογράφησης SSL 256-bit. Επιπροσθέτως διαθέτει ψηφιακό πιστοποιητικό προστασίας του ομίλου SimpleSSL, αναγνωρισμένου ως κορυφαίου στον τομέα της ασφάλειας των συναλλαγών.    3D Secure:Το sfkshop.gr έχει προχωρήσει στην υιοθέτηση του πρωτοκόλλου 3D-Secure με στόχο […]",
          url: "https://sfkshop.gr/prostasia-prosopikon-dedomenon-gdpr/",
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
              <Heading fontSize="30" as='h1'>Προστασία Προσωπικών Δεδομένων (GDPR)</Heading>

              <Stack spacing="3">
                <Heading fontSize="20" as="h2">Γενικά</Heading>
                <Text>H ΕΠΙΧΕΙΡΗΣΗ, δημιούργησε την παρούσα ιστοσελίδα με μοναδικό σκοπό την εξυπηρέτηση των πελατών της. Οι πληροφορίες που συγκεντρώνονται από την ΕΠΙΧΕΙΡΗΣΗ αφορούν στην διεκπεραίωση της παραγγελίας μέσω της παρούσας ιστοσελίδας. </Text>
                <Text>Η παρούσα Δήλωση Προστασίας Προσωπικών Δεδομένων και συμπληρωματικά οι Όροι Χρήσης της παρούσας ιστοσελίδας περιγράφουν τη μέθοδο συλλογής δεδομένων, τη χρήση αυτών των δεδομένων τα οποία οι χρήστες παρέχουν κατά τη διάρκεια των παραγγελιών μέσω της ιστοσελίδας. Η πολιτική αυτή θα τροποποιείται από καιρό σε καιρό χωρίς προηγούμενη προειδοποίηση προς τους χρήστες. Με την χρησιμοποίηση της παρούσας ιστοσελίδας τεκμαίρεται η αποδοχή και συναίνεση της παρούσας Δήλωσης Προστασίας Προσωπικών Δεδομένων καθώς επίσης και των Όρων Χρήσης της ιστοσελίδας που έχουν ανακοινωθεί μέσω αυτής.</Text>
                <Text>H ΕΠΙΧΕΙΡΗΣΗ είναι υπεύθυνη επεξεργασίας και οφείλει να διαχειρίζεται και να προστατεύει τα προσωπικά δεδομένα των επισκεπτών και των χρηστών του ιστότοπου σύμφωνα με το Γενικό Κανονισμό για την Προστασία Δεδομένων Προσωπικού Χαρακτήρα (679/2016), καθώς και στα οριζόμενα στο εθνικό, κοινοτικό και διεθνές δίκαιο σχετικά με την προστασία των δικαιωμάτων και των ελευθεριών των ατόμων σχετικά με την επεξεργασία των δεδομένων προσωπικού χαρακτήρα, όπως εκάστοτε ισχύει.</Text>
              </Stack>
              
              <Stack spacing="3">
                <Heading fontSize="20" as="h2">Τι είναι προσωπικά δεδομένα;</Heading>
                <Text>Προσωπικά δεδομένα είναι πληροφορίες που προσδιορίζουν άμεσα ή έμμεσα ένα φυσικό πρόσωπο. Έμμεσα σημαίνει σε συνδυασμό με άλλες πληροφορίες, όπως για παράδειγμα, το όνομα, την ταχυδρομική διεύθυνση, τη διεύθυνση ηλεκτρονικού ταχυδρομείου και τον αριθμό τηλεφώνου, ή ένα μοναδικό αριθμό αναγνώρισης συσκευής.</Text>
              </Stack>
              
              <Stack spacing="3">
                <Heading fontSize="20" as="h2">Συγκέντρωση πληροφοριών:</Heading>
                <Text>Η ΕΠΙΧΕΙΡΗΣΗ χρησιμοποιεί τα δεδομένα των επισκεπτών (ονοματεπώνυμο, διεύθυνση, ταχυδρομικός κωδικός, ηλεκτρονική  σας διεύθυνση, τηλέφωνο, στοιχεία πιστωτικής κάρτας, τρόπος πληρωμής της παραγγελίας, στοιχεία αποστολής – παράδοσης μιας παραγγελίας, κλπ.), εφόσον αυτά έχουν καταχωρηθεί μέσω της φόρμας επικοινωνίας της ιστοσελίδας για την επικοινωνία.</Text>
                <Text>Η ΕΠΙΧΕΙΡΗΣΗ χρησιμοποιεί τα δεδομένα των επισκεπτών (διεύθυνση ηλεκτρονικής αλληλογραφίας) εφόσον έχει πραγματοποιηθεί η εγγραφή τους στο newsletter.</Text>
              </Stack>
              
              <Stack spacing="3">
                <Heading fontSize="24" as="h2">Χρήση προσωπικών δεδομένων</Heading>
                <Text>Οι πληροφορίες που έχουν δοθεί εκούσια από τους χρήστες της αναφερόμενης ιστοσελίδας, χρησιμοποιούνται προκειμένου οι χρήστες του να έχουν άμεση και ουσιαστική επικοινωνία με το κατάστημα, να τους παρέχονται απαντήσεις σε συγκεκριμένα ερωτήματα που θέτουν και τέλος να εξυπηρετούνται και να εκτελούνται οι παραγγελίες τους..</Text>
                <Text>Οι πληροφορίες που συλλέγονται μέσω της ιστοσελίδας δεν διανέμονται σε κανένα άλλο οργανισμό, παρά μόνο σε άμεσους συνεργάτες στην διαδικασία εξυπηρέτησης παραγγελιών.Τα δεδομένα αυτά διατηρούνται και επεξεργάζονται από την επιχείρηση για εύλογο χρονικό διάστημα και μόνο για όσο υπάρχει εκκρεμότητα σχετικά με την πώληση, παράδοση πληρωμή προϊόντων και τυχόν νομικές αξιώσεις.</Text>
                <Text>Η ΕΠΙΧΕΙΡΗΣΗ κάνει χρήση των πληροφοριών που δίνονται κατά τη διάρκεια της ηλεκτρονικής αποστολής της φόρμας, προκειμένου να επικοινωνεί με τους χρήστες/πελάτες της σχετικά με (i) την παράδοση της παραγγελίας, (ii) για επιβεβαίωση και ταυτοποίηση του πελάτη σε κάθε αναγκαία περίπτωση, (iii) για νέα ή εναλλακτικά προϊόντα που προσφέρονται και ειδικές προσφορές, (iv) διαφημιστικό/προωθητικό υλικό εάν έχει παρασχεθεί προηγούμενη ρητή και ελεύθερη συγκατάθεσή του χρήστη.</Text>
                <Text>Ο χρήστης έχει τη δυνατότητα να επιλέξει αν θα λαμβάνει τέτοιου είδους επικοινωνίες από την ιστοσελίδα και μπορεί να αντιταχθείτε στη χρήση αυτή κατά το χρόνο της συλλογής ακολουθώντας τις οδηγίες μέσα στο μήνυμα ηλεκτρονικού ταχυδρομείου ή SMS που θα λαμβάνει.</Text>
                <Text>Οποιοδήποτε δικαιολογητικό και έγγραφο πιστοποιεί και δηλώνει την ταυτότητα του πελάτη παραμένει αυστηρά απόρρητο και ελέγχεται μόνο από  αρμόδιο υπάλληλο. Η ΕΠΙΧΕΙΡΗΣΗ απαιτεί από τους υπαλλήλους της και τους συντηρητές της ιστοσελίδας να παρέχουν στους χρήστες/πελάτες του το επίπεδο ασφαλείας που αναφέρεται στη παρούσα Δήλωση Προστασίας Προσωπικών Δεδομένων. Ο χρήστης με την προσκόμιση των προσωπικών δεδομένων συναινεί τα δεδομένα αυτά να χρησιμοποιούνται από τους υπαλλήλους της ΕΠΙΧΕΙΡΗΣΗΣ για τους λόγους που αναφέρθηκαν παραπάνω. Σε καμία άλλη περίπτωση δεν μπορεί η ΕΠΙΧΕΙΡΗΣΗ να μοιραστεί με άλλους προσωπικά στοιχεία χωρίς πρότερη συναίνεση,</Text>
                <Text>εκτός και αν αυτό απαιτηθεί μέσω της νομίμου οδού.</Text>
              </Stack>

              <Stack spacing="3">
                <Heading fontSize="20" as="h2">Μεταβιβάσεις επιχειρήσεων</Heading>
                <Text>Σε σχέση με οποιαδήποτε αναδιοργάνωση, αναδιάρθρωση, συγχώνευση ή πώληση ή άλλη μεταβίβαση περιουσιακών στοιχείων (από κοινού “Μεταβίβαση Επιχειρήσεων”), η ΕΠΙΧΕΙΡΗΣΗ θα μεταφέρει δεδομένα, συμπεριλαμβανομένων προσωπικών δεδομένων, σε εύλογη κλίμακα και όπως είναι απαραίτητο για τη Μεταβίβαση Επιχειρήσεων, και υπό την προϋπόθεση ότι ο παραλήπτης συμφωνεί να σεβαστεί τα προσωπικά δεδομένα κατά τρόπο που να συνάδει με την ισχύοντες νόμους προστασίας δεδομένων. Η ΕΠΙΧΕΙΡΗΣΗ θα ενημερώσει τα υποκείμενα που επηρεάζονται πριν τα προσωπικά δεδομένα καταστούν αντικείμενο διαφορετικής πολιτικής απορρήτου.</Text>
              </Stack>

              <Stack spacing="3">
                <Heading fontSize="20" as="h2">Επεξεργασία προσωπικών δεδομένων των παιδιών</Heading>
                <Text>Η ΕΠΙΧΕΙΡΗΣΗ δεν θα συλλέξει ή επεξεργαστεί προσωπικά δεδομένα παιδιών κάτω των 16 ετών εκτός κι αν έχει δοθεί γονική συναίνεση, σύμφωνα με την ισχύουσα νομοθεσία. Εάν αντιληφθεί ότι τα προσωπικά δεδομένα ενός παιδιού συλλέχθηκαν κατά λάθος, θα διαγραφούν άμεσα, χωρίς αδικαιολόγητη καθυστέρηση.</Text>
              </Stack>

              <Stack spacing="3">
                <Heading fontSize="20" as="h2">Επεξεργασία ευαίσθητων δεδομένων</Heading>
                <Text>Η ΕΠΙΧΕΙΡΗΣΗ, ενδέχεται, σε ορισμένες περιπτώσεις, να επεξεργαστεί ειδικές κατηγορίες προσωπικών δεδομένων (“ευαίσθητα δεδομένα”). Ευαίσθητα δεδομένα ορίζονται τα προσωπικά δεδομένα που αποκαλύπτουν τη φυλετική ή εθνική καταγωγή, πολιτικά φρονήματα, θρησκευτικές ή φιλοσοφικές πεποιθήσεις, συμμετοχή σε συνδικαλιστικές οργανώσεις, γενετικά δεδομένα, βιομετρικά δεδομένα με σκοπό την ταυτοποίηση ενός φυσικού προσώπου, την υγεία ή τη σεξουαλική ζωή ή γενετήσιο προσανατολισμό του. Για παράδειγμα ενδέχεται να επεξεργαστεί ευαίσθητα δεδομένα τα οποία τα υποκείμενα έχουν καταστήσει δημόσια ή έχουν ελεύθερα δώσει την προηγούμενη ρητή και ξεχωριστή συγκατάθεσή τους, σε ένα συγκεκριμένο πλαίσιο για ένα συγκεκριμένο σκοπό.</Text>
              </Stack>

              <Stack spacing="3">
                <Heading fontSize="20" as="h2">Ασφάλεια συναλλαγών</Heading>
                <Text>Η ΕΠΙΧΕΙΡΗΣΗ δεσμεύεται όσον αφορά στην εξασφάλιση της ασφάλειας και της ακεραιότητας των δεδομένων που συλλέγει σχετικά με τους χρήστες της ιστοσελίδας του. Η ΕΠΙΧΕΙΡΗΣΗ έχει υιοθετήσει διαδικασίες, οι οποίες προφυλάσσουν τα προσωπικά δεδομένα που οι χρήστες προσκομίζουν στην ιστοσελίδα του ή του παρέχουν με οποιοδήποτε άλλο μέσο (πχ. τηλεφωνικά). Αυτές οι διαδικασίες προστατεύουν τα δεδομένα των χρηστών από οποιαδήποτε μη επιτρεπόμενη πρόσβαση ή αποκάλυψη, απώλεια ή κακή χρήση, και αλλαγή ή καταστροφή. Βοηθούν επίσης στο να πιστοποιείται ότι τα στοιχεία αυτά είναι ακριβή και χρησιμοποιούνται σωστά. Η ΕΠΙΧΕΙΡΗΣΗ εφαρμόζει το κατάλληλο επίπεδο ασφαλείας για τη διασφάλιση των δεδομένων που συλλέγονται από τυχαία ή παράνομη καταστροφή, απώλεια, αλλοίωση, μη εξουσιοδοτημένη γνωστοποίηση ή πρόσβαση σε δεδομένα προσωπικού χαρακτήρα που διαβιβάζονται, αποθηκεύονται ή αποτελούν με διαφορετικό τρόπο αντικείμενο επεξεργασίας. Η πρόσβαση στα προσωπικά δεδομένα χορηγείται μόνο στο προσωπικό ή άμεσους συνεργάτες που απαιτείται να έχουν τέτοια πληροφόρηση για την εξυπηρέτηση των παραγγελιών. Σε περίπτωση παραβίασης δεδομένων που περιέχουν προσωπικά δεδομένα, η ΕΠΙΧΕΙΡΗΣΗ θα τηρήσει την ισχύουσα νομοθεσία σχετικά με την ειδοποίηση της παραβίασης.</Text>
              </Stack>

              <Stack spacing="3">
                <Heading fontSize="20" as="h2">Δικαιώματα χρηστών/πελατών</Heading>
                <Text>Ως υποκείμενο των δεδομένων οι χρήστες της ιστοσελίδας της ΕΠΙΧΕΙΡΗΣΗΣ έχετε συγκεκριμένα νόμιμα δικαιώματα που αφορούν τα προσωπικά δεδομένα που συλλέγονται. </Text>
                <Text>Η ακόλουθη λίστα περιέχει πληροφορίες σχετικά με τα νόμιμα δικαιώματά που προκύπτουν από ισχύοντες νόμους προστασίας δεδομένων:</Text>
                <Text>Δικαίωμα ανάκλησης της συγκατάθεσης: Όπου η επεξεργασία των δεδομένων προσωπικού χαρακτήρα γίνεται με βάση τη συγκατάθεσή σας μπορείτε να αποσύρετε τη συγκατάθεση αυτή οποιαδήποτε στιγμή. </Text>
                <Text>Δικαίωμα ανάκλησης της συγκατάθεσης: Όπου η επεξεργασία των δεδομένων προσωπικού χαρακτήρα γίνεται με βάση τη συγκατάθεσή σας μπορείτε να αποσύρετε τη συγκατάθεση αυτή οποιαδήποτε στιγμή. </Text>
                <Text>Δικαίωμα περιορισμού: Μπορείτε να μας ζητήσετε τον περιορισμό της επεξεργασίας των προσωπικών σας δεδομένων, εάν αμφισβητείτε την ακρίβεια των προσωπικών σας δεδομένων για την περίοδο που θα χρειαστεί να επαληθεύσουμε την ακρίβεια, εάν η επεξεργασία είναι παράνομη και αιτείστε τον περιορισμό της επεξεργασίας αντί της διαγραφής των προσωπικών σας δεδομένων, ένα δεν χρειαζόμαστε πια τα προσωπικά σας δεδομένα, αλλά εσείς τα χρειάζεστε για την στήριξη, άσκηση ή υπεράσπιση νομικών αξιώσεων, ή ένα έχετε αντίρρηση για την επεξεργασία για την περίοδο που επαληθεύουμε κατά πόσο τα έννομα συμφέροντά μας υπερισχύουν των δικών σας. </Text>
                <Text>Δικαίωμα πρόσβασης: Μπορείτε να μας ζητήσετε πληροφορίες σχετικά με προσωπικά δεδομένα που διατηρούμε για εσάς, συμπεριλαμβανομένων των πληροφοριών σχετικά με τις κατηγορίες των δεδομένων προσωπικού χαρακτήρα που έχουμε στην κατοχή ή τον έλεγχό μας, για ποιο σκοπό χρησιμοποιούνται, από που συλλέχθηκαν, αν όχι από σας άμεσα, και σε ποιους έχουν κοινοποιηθεί, κατά περίπτωση. Μπορείτε να λάβετε από εμάς χωρίς χρέωση ένα αντίγραφο των προσωπικών δεδομένων που κρατάμε για εσάς. Διατηρούμε το δικαίωμα να χρεώσουμε μια εύλογη αμοιβή για κάθε περαιτέρω αντίγραφο που ενδεχομένως μας ζητήσετε.Δικαίωμα φορητότητας: Κατόπιν αιτήματός σας, θα μεταφέρουμε τα δεδομένα σας σε ένα άλλο υπεύθυνο επεξεργασίας, όπου αυτό είναι τεχνικά εφικτό, υπό τον όρο ότι η επεξεργασία βασίζεται στη συγκατάθεσή σας ή είναι αναγκαία για την εκτέλεση σύμβασης. Αντί να λάβετε αντίγραφο των προσωπικών σας δεδομένων, μπορείτε να μας ζητήσετε να μεταβιβάσουμε τα δεδομένα σε ένα άλλο υπεύθυνο επεξεργασίας, που θα μας υποδείξετε, απευθείας.</Text>
                <Text>Δικαίωμα διαγραφής: Μπορείτε να μας ζητήσετε να διαγράψουμε τα προσωπικά σας δεδομένα, όπου – τα προσωπικά δεδομένα δεν είναι πλέον απαραίτητα σε σχέση με τους σκοπούς για τους οποίους συνελέγησαν ή αποτέλεσαν αντικείμενο επεξεργασίας – έχετε το δικαίωμα αντίρρησης σε περαιτέρω επεξεργασία των προσωπικών σας δεδομένων και ασκείτε το δικαίωμα αυτό – η επεξεργασία γίνεται με βάση τη συγκατάθεσή σας, αποσύρετε τη συγκατάθεσή σας και δεν υπάρχει άλλη νομική βάση για επεξεργασία – τα προσωπικά σας δεδομένα έχουν υποστεί επεξεργασία παράνομα εκτός αν η επεξεργασία είναι απαραίτητη – για τη συμμόρφωση με μια νομική υποχρέωση, η οποία απαιτεί επεξεργασία από εμάς – ιδίως για τις νόμιμες υποχρεώσεις εκπλήρωσης καθήκοντος – για την στήριξη, άσκηση ή υπεράσπιση νομικών αξιώσεων.</Text>
                <Text>Δικαίωμα εναντίωσης: Μπορείτε να εναντιωθείτε – ανά πάσα στιγμή – στην επεξεργασία των προσωπικών δεδομένων σας λόγω ιδιαίτερης κατάστασή σας, υπό την προϋπόθεση ότι η επεξεργασία δεν βασίζεται σε δική σας συγκατάθεση αλλά σε έννομο συμφέρον μας ή σε έννομο συμφέρων τρίτων. Στην περίπτωση αυτή δεν θα επεξεργαζόμαστε πλέον τα προσωπικά σας δεδομένα, εκτός αν μπορούμε να αποδείξουμε επιτακτικούς νόμιμους λόγους και υπέρτερο συμφέρον για την επεξεργασία ή για την στήριξη, άσκηση ή υπεράσπιση νομικών αξιώσεων. Εάν εναντιώνεστε στην επεξεργασία, παρακαλείστε να διευκρινίσετε κατά πόσον επιθυμείτε τη διαγραφή των προσωπικών δεδομένων σας ή τον περιορισμό της επεξεργασίας από την ΕΠΙΧΕΙΡΗΣΗ.</Text>
                <Text>Δικαίωμα υποβολής καταγγελίας: Σε περίπτωση εικαζόμενης παράβασης ισχύουσας νομοθεσίας περί απορρήτου, μπορείτε να υποβάλετε μια καταγγελία με την εποπτική αρχή προστασίας δεδομένων στη χώρα που ζείτε ή στην οποία παρουσιάστηκε η προβαλλόμενη παράβαση.</Text>
                <Text>Η ΕΠΙΧΕΙΡΗΣΗ θα προσπαθήσει να ικανοποιήσει το αίτημά σας εντός 30 ημερών. Ωστόσο, η προθεσμία μπορεί να παραταθεί για συγκεκριμένους λόγους που αφορούν το συγκεκριμένο νομικό δικαίωμα ή η πολυπλοκότητα του αιτήματός σας. </Text>
                <Text>Περιορισμός της πρόσβασης: Σε ορισμένες περιπτώσεις ενδέχεται να μην είμαστε σε θέση να παρέχουμε πρόσβαση σε όλα ή ορισμένα από τα προσωπικά σας δεδομένα βάσει νομοθετικών διατάξεων. Αν το αρνηθούμε το αίτημά σας για πρόσβαση, θα σας ενημερώσουμε για το λόγο της άρνησης αυτής. </Text>
                <Text>Μη αναγνώριση: Σε ορισμένες περιπτώσεις, ενδέχεται να μην είμαστε σε θέση να αναζητήσουμε τα προσωπικά σας δεδομένα λόγω των αναγνωριστικών στοιχείων που παρέχετε στην αίτησή σας. Δύο παραδείγματα προσωπικών δεδομένων τα οποία δεν μπορούμε να αναζητήσουμε όταν παρέχετε το όνομα και τη διεύθυνση ηλεκτρονικού ταχυδρομείου σας είναι: – δεδομένα που συλλέγονται μέσω cookies του προγράμματος περιήγησης,- δεδομένα που συλλέχθηκαν από δίκτυα κοινωνικής δικτύωσης εφόσον έχετε δημοσιεύσει σχόλιό σας κάτω από ένα ψευδώνυμο που δεν είναι γνωστό σε εμάς.</Text>
                <Text>Σε τέτοιες περιπτώσεις, όπου δεν μπορούμε να σας εντοπίσουμε ως υποκείμενο των δεδομένων, δεν είμαστε σε θέση να συμμορφωθούμε με το αίτημά σας να εκτελέσουμε τα νόμιμα δικαιώματά σας, όπως περιγράφεται στο άρθρο αυτό, εκτός εάν μας παράσχετε πρόσθετες πληροφορίες που επιτρέπουν την ταυτοποίησή σας. </Text>
                <Text>Άσκηση των νόμιμων δικαιωμάτων σας: Προκειμένου να ασκήσετε τα νόμιμα δικαιώματά σας, παρακαλούμε επικοινωνήστε εγγράφως, μέσω ηλεκτρονικού ταχυδρομείου.</Text>
              </Stack>

              <Stack spacing="3">
                <Heading fontSize="20" as="h2">Διατήρηση των προσωπικών δεδομένων</Heading>
                <Text>Η ΕΠΙΧΕΙΡΗΣΗ, γενικά θα διαγράψει τα προσωπικά δεδομένα τα οποία συλλέγει  εάν δεν είναι πλέον αναγκαίο να επιτευχθούν οι σκοποί για τους οποίους συλλέχθηκαν αρχικώς. Ωστόσο, ενδέχεται να ζητηθεί να αποθηκεύσει τα προσωπικά δεδομένα χρηστών για μεγαλύτερο χρονικό διάστημα λόγω νομοθετικών διατάξεων. </Text>
                <Text>Επιπλέον, δεν θα διαγράψει όλα τα προσωπικά δεδομένα αν έχει ζητήσει ο χρήστης να μην επικοινωνεί μαζί του στο μέλλον, δεδομένου ότι διατηρεί αρχείο σχετικά με τα άτομα τα οποία δεν επιθυμούν να γίνεται επικοινωνία μαζί τους στο μέλλον (π.χ. μέσω ομαδικών μηνυμάτων ηλεκτρονικού ταχυδρομείου).</Text>
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

export default GDPR