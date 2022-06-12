// Copied from myventema
import React, { useContext } from 'react';
import {
  LinkButton,
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  OfferSection,
  Offer,
  // Input,
  Divider,
} from './authentication-form.style';
// import { Facebook } from 'assets/icons/Facebook';
// import { Google } from 'assets/icons/Google';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage, useIntl } from 'react-intl';
import { closeModal } from '@redq/reuse-modal';
import { Input } from 'components/forms/input';
import { createCustomer, loginCustomer } from 'services/customer';
import { Alert, AlertIcon, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
export default function SignInModal() {
  const intl = useIntl();
  const { authDispatch } = useContext<any>(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const router = useRouter();

  const toggleSignUpForm = () => {
    authDispatch({
      type: 'SIGNUP',
    });
  };

  const toggleForgotPassForm = () => {
    authDispatch({
      type: 'FORGOTPASS',
    });
  };

  const loginCallback = async (e) => {
    e.preventDefault();

    if (typeof window === "undefined") return;
  
    setIsLoading(true);
    const { customer, error } = await loginCustomer({ email, password });
   
    if (!customer && !!error) {
      setIsError(true);
    }

    if (!error && !!customer) {
      // localStorage.setItem('access_token', `${email}.${password}`);
      closeModal();
      toast({
        // title: "Logged in successfully!",
        title: "Συνδέθηκες με επιτυχία!",
        isClosable: true,
        position: 'top',
        status: "success"
      });
      localStorage.setItem("customer", JSON.stringify(customer)); 
      authDispatch({ type: 'SIGNIN_SUCCESS' });
      // Please pay attention on setIsLoading(false) before returning function from this point
      
      location.reload();
      
      // If customer login in wishlist page then hard reload the page to fetch data from DB
      // if (router.pathname === "/wishlist") {
      //   location.reload();
      // }
    }

    setIsLoading(false);
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id='popup.welcomeBack' defaultMessage='Welcome Back' />
        </Heading>
        <SubHeading>
          <FormattedMessage
            id='popup.loginWithYour'
            defaultMessage='Login with your email &amp; password'
          />
        </SubHeading>

        {isError && <Alert status="error" mb="4">
          <AlertIcon />
          Invalid credentials!
        </Alert>
        }
        <form onSubmit={loginCallback}>
          <Input
            type='email'
            placeholder={intl.formatMessage({
              id: 'popup.emailField',
              defaultMessage: 'Email Address.',
            })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
          />

          <Input
            type='password'
            placeholder={intl.formatMessage({
              id: 'popup.passwordField',
              defaultMessage: 'Password',
            })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
          />

          <Button
            variant='primary'
            size='big'
            style={{ width: '100%' }}
            type='submit'
          >
            <FormattedMessage id={isLoading ? 'popup.loading' : 'popup.continueLogin'} defaultMessage={isLoading ? 'Loading...' : 'Continue'} />
          </Button>
        </form>
        {/* <Divider>
          <span>
            <FormattedMessage id='popup.or' defaultMessage='or' />
          </span>
        </Divider> */}

        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id='popup.dontHaveAccount'
            defaultMessage="Don't have any account?"
          />{' '}
          <LinkButton onClick={toggleSignUpForm}>
            <FormattedMessage id='signUpBtnText' defaultMessage='Sign Up' />
          </LinkButton>
        </Offer>
      </Container>

      <OfferSection>
        <Offer>
          <FormattedMessage
            id='forgotPasswordText'
            defaultMessage='Forgot your password?'
          />{' '}
          <LinkButton onClick={toggleForgotPassForm}>
            <FormattedMessage id='resetPassword' defaultMessage='Reset It' />
          </LinkButton>
        </Offer>
      </OfferSection>
    </Wrapper>
  );
}