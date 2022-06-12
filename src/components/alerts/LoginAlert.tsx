import { AlertIcon, Container, Alert, Text } from '@chakra-ui/react'
import { AuthContext } from 'contexts/auth/auth.context';
import AuthenticationForm from 'features/authentication-form';
import React, { useContext } from 'react'
import { openModal } from '@redq/reuse-modal';

const LoginAlert = () => {
  const { authState, authDispatch } = useContext<any>(AuthContext);

  const handleJoin = () => {
    authDispatch({
      type: 'SIGNIN',
    });

    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
    });
  }


  return (
    <Container maxW="container.lg" centerContent mt="5">
      <Alert status="warning" w="max">
        <AlertIcon />
        <Text fontWeight="semibold">
          {/* You are not logged in yet! */}
          Δεν είσαι συνδεδεμένος!
          <Text cursor="pointer" onClick={handleJoin} userSelect="none"  as="span" ml="2" align="center" textDecor="underline" fontStyle="italic">
            {/* Click here to login */}
            Πατά εδώ για να συνδεθείς
          </Text>
        </Text>
      </Alert>
    </Container>
  )
}

export default LoginAlert