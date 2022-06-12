import React, { useContext, useEffect, useState } from 'react';
import {
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  // Input,
  Button,
  LinkButton,
  Offer,
} from './authentication-form.style';
import { FormattedMessage, useIntl } from 'react-intl';
import { AuthContext } from 'contexts/auth/auth.context';
import { Input } from 'components/forms/input';
import { resetCustomerCode } from 'services/customer';
import { useRouter } from 'next/router';
import { Alert, AlertIcon, AlertTitle, CloseButton, HStack } from '@chakra-ui/react';
import { closeModal } from '@redq/reuse-modal';

export default function ForgotPasswordModal() {
  const { authDispatch } = useContext<any>(AuthContext);
  const intl = useIntl();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleSignInForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });
  };

  const handleResetFormSubmit = async () => {
    // console.log({ email });
    setLoading(true)
    const { data, error } = await resetCustomerCode({ email });
    // console.log({ data, error });
    setLoading(false);

    if (!!error) {
      setErrorMsg("Oops! Invalid email.");
      return;
    }
    
    if (data.data.status === 200) {
      router.push(`/reset-password?email=${email}`);
      setErrorMsg("");
      closeModal();
      return;
    } 

    setErrorMsg("Something went wrong...");
  };

  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        <Heading>
          <FormattedMessage
            id='forgotPasswordText'
            defaultMessage='Forgot Password'
          />
        </Heading>

        <SubHeading>
          <FormattedMessage
            id='popup.forgotPasswordDetails'
            defaultMessage="We'll send you a link to reset your password"
          />
        </SubHeading>

        {!!errorMsg && <Alert status='error'>
          <AlertIcon />
          <HStack w="full" justify="space-between">
            <AlertTitle>{errorMsg}</AlertTitle>
            <CloseButton
              // alignSelf='end'
              position='relative'
              // right={-1}
              // top={-1}
              onClick={() => setErrorMsg("")}
            />
          </HStack>
        </Alert>}

        <form 
          style={{ marginTop: '20px' }}
          onSubmit={(e) => {
            e.preventDefault();
            handleResetFormSubmit()
          }}
        >
          <Input
            type='email'
            placeholder={intl.formatMessage({
              id: 'popup.emailField',
              defaultMessage: 'Email Address or Contact No.',
            })}
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />

          <Button
            variant='primary'
            size='big'
            style={{ width: '100%' }}
            type='submit'
          >
            {loading ? <FormattedMessage 
              id="popup.loading"
              defaultMessage="Loading..."
            /> : <FormattedMessage
              id='resetPassword'
              defaultMessage='Reset Password'
            />}
          </Button>
        </form>
        <Offer style={{ padding: '20px 0 0' }}>
          <FormattedMessage id='popup.backToLogin' defaultMessage='Back to' />{' '}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id='loginText' defaultMessage='Login' />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
