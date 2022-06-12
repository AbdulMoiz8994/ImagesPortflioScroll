import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text
} from '@chakra-ui/react'

const SHOW_NOTIFICATION = "show-notification";

const NotificationModal = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure({ isOpen: JSON.parse(localStorage.getItem(SHOW_NOTIFICATION)) ? false : true })
  const [isOpen, setIsOpen] = useState(false);

  console.log

  // Hooks
  useEffect(() => {
    const showNotification = JSON.parse(localStorage.getItem(SHOW_NOTIFICATION));

    console.log({ showNotification, condition: !showNotification || showNotification !== true })

    if (!showNotification || showNotification !== true) {
      setIsOpen(true);
      return;
    }
  }, [])

  // Handlers
  const handleSuccess = () => {
    localStorage.setItem(SHOW_NOTIFICATION, "true");
    setIsOpen(false)
  }

  return (
    <>
      <Modal size="xl" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pt="6">
            Σου ευχόμαστε Καλή Ανάσταση και Καλό Πάσχα! 🥚
          </ModalHeader>
          {/* <ModalCloseButton variant="ghost" /> */}
          <ModalBody>
            <Text>
              Θα θέλαμε να σε ενημερώσουμε ότι η εταιρεία μας θα παραμείνει κλειστή από τις 21/4 εώς και τις 27/4 <br />
              Σε αυτό το διάστημα θα είμαστε δίπλα σου με ένα email!
            </Text>
          </ModalBody>

          <ModalFooter mt="3" mb="2">
            <Button w="full" colorScheme='primary' mr={3} onClick={handleSuccess}>
              Εντάξει
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NotificationModal