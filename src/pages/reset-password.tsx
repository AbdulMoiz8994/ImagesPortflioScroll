import React, { useContext, useEffect, useState } from 'react'
import { 
  AlertTitle,
  CloseButton,
  Container, HStack, useToast, 
} from '@chakra-ui/react';
import { 
  Box, 
  Heading, 
  Text,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Button,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { chakra } from '@chakra-ui/system';
import router, { useRouter } from 'next/router';
import { loginCustomer, resetCustomerPasswordWithCode } from 'services/customer';
import { AuthContext } from 'contexts/auth/auth.context';
import WishlistFloatButton from 'components/common/WishlistFloatButton';
import ComparisonFloatButton from 'layouts/ComparisonFloatButton';
import { Modal } from "@redq/reuse-modal";
import { FormattedMessage, useIntl } from 'react-intl';
import { frontendDomain } from 'site-settings/site-credentials';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState<any>("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const toast = useToast();
  const { authDispatch } = useContext<any>(AuthContext);
  const router = useRouter();
  const intl = useIntl();

  useEffect(() => {
    if (!!router.query.email) {
      setEmail(router.query.email);
    }
  }, [router]);

  const handleFormSubmit = async () => {
    if (newPassword !== confirmNewPassword) {
      setErrorMsg("Password doesn't match with confirm password!");
      return;
    }

    // 2. Setting new Password
    setLoading(true);
    const { data, error } = await resetCustomerPasswordWithCode({ email, newPassword, code: resetCode });
    setErrorMsg("");
    // console.log({ data, error });

    if (!!error) {
      setErrorMsg("Code is invalid or expired.");
      setLoading(false)
      return;
    }
    if (data.data.status !== 200) {
      setErrorMsg("Something went wrong...");
      setLoading(false);
      return
    };


    // 3. Login customer automatically after successful resetting password
    const { customer, error: loginError } = await loginCustomer({ email, password: newPassword });
    setLoading(false);

    if (!loginError && !!customer) {
      toast({
        // title: "Logged in successfully!",
        title: "Συνδέθηκες με επιτυχία!",
        isClosable: true,
        position: 'top',
        status: "success"
      });
      localStorage.setItem("customer", JSON.stringify(customer)); 
      authDispatch({ type: 'SIGNIN_SUCCESS' });
      
      // router.replace("/");
      window.open(frontendDomain,"_self")
      return;
    }
  }

  return (
    <Modal>
      <WishlistFloatButton />
      <ComparisonFloatButton />

      <Container centerContent w={{ base: "full", md: "container.xl"}} py={{ base: "12", md: "16" }} minH="85vh">
        <Stack w="full" spacing="6" textAlign="center">
          <Stack spacing="6">
            {/* <Heading fontSize="26">Reset Password</Heading> */}
            <Heading fontSize="26">
              <FormattedMessage 
                id="resetPassword"
                defaultMessage="Reset Password"
              />
            </Heading>
            <Text textAlign="justify">
              <FormattedMessage 
                id="ResetPasswordPage.description"
                defaultMessage="Add the one-time password that came to your email in the “Reset Code” field below."
              />
            </Text>
          </Stack>

          {!!errorMsg && <Alert status='error'>
            <AlertIcon />
            <HStack w="full" justify="space-between">
              <AlertTitle>{errorMsg}</AlertTitle>
              <CloseButton
                position='relative'
                onClick={() => setErrorMsg("")}
              />
            </HStack>
          </Alert>}

          <Stack spacing="3">
            <chakra.form
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit();
              }}
            >
              <Stack spacing="8">
                <Stack spacing="6">
                  <FormControl isRequired>
                    <FormLabel fontSize="14" fontWeight="semibold">Email</FormLabel>
                    <Input 
                      type="email"
                      size="lg"
                      // placeholder="Enter your email" 
                      placeholder={intl.formatMessage({ id: 'enterYourEmailText', defaultMessage: 'Enter your email' })}
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontSize="16" fontWeight="semibold">
                      <FormattedMessage 
                        id="ResetPasswordPage.resetCodeField"
                        defaultMessage="Reset Code (Find in your email)"
                      />
                    </FormLabel>
                    <Input
                      type="text" 
                      size="lg" 
                      placeholder={intl.formatMessage({ id: 'codeSentToYourEmailText', defaultMessage: 'Code that has been sent to your email' })}
                      value={resetCode}
                      onChange={(e) => setResetCode(e.currentTarget.value)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontSize="16" fontWeight="semibold">
                      <FormattedMessage 
                        id="ResetPasswordPage.newPasswordField"
                        defaultMessage="New Password"
                      />
                    </FormLabel>
                    <Input
                      type="password" 
                      size="lg" 
                      placeholder={intl.formatMessage({ id: "enterYourNewPasswordText", defaultMessage: "Enter your new password" })}
                      onCopy={(e) => {
                        e.preventDefault()
                        return false;
                      }}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.currentTarget.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize="16" fontWeight="semibold">
                      <FormattedMessage 
                        id="ResetPasswordPage.confirmNewPasswordField"
                        defaultMessage="Confirm New Password"
                      />
                    </FormLabel>
                    <Input
                      type="password" 
                      size="lg" 
                      placeholder={intl.formatMessage({ id: 'confirmNewPasswordText', defaultMessage: 'Confirm your new password' })}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.currentTarget.value)}
                    />
                  </FormControl>
                </Stack>

                <Button isLoading={loading} type="submit" colorScheme="primary" size="lg">
                  <FormattedMessage 
                    id="ResetPasswordPage.submitButton"
                    defaultMessage="Submit"
                  />
                </Button>
              </Stack>
            </chakra.form>
          </Stack>
        </Stack>
      </Container>
    </Modal>
  )
}

export default ResetPasswordPage