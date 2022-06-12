// Copied from myventema
import React, { useContext } from 'react';
import Link from 'next/link';
import { Input } from 'components/forms/input';
import {
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  // Input,
  Divider,
  LinkButton,
} from './authentication-form.style';
import { Facebook } from 'assets/icons/Facebook';
import { Google } from 'assets/icons/Google';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage, useIntl } from 'react-intl';
import { useState } from 'react';
import { createCustomer } from 'services/customer';
import { closeModal } from '@redq/reuse-modal';
import { Alert, AlertIcon, useToast } from '@chakra-ui/react';
import { TERMS_AND_CONDITIONS } from 'site-settings/site-navigation';

export default function SignOutModal() {
  const toast = useToast()
  const intl = useIntl();
  const { authDispatch } = useContext<any>(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSignInForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });
  };

  const handleSubmit = async (e) => {
    setIsError(false);
    e.preventDefault();

    setIsLoading(true);

    // console.log("I am register button submittion", { first_name: firstName, last_name: lastName, email, password  });
    const { customer, error, status } = await createCustomer({ first_name: firstName, last_name: lastName, email, password });
    // console.log({ customer, error });

    setIsLoading(false);

    if (!customer && !!error) {
      setIsError(true);
      setErrorStatus(status)
      return;
    }

    closeModal();
    localStorage.setItem("customer", JSON.stringify(customer));
    authDispatch({ type: 'SIGNIN_SUCCESS' });
    toast({
      title: "Customer registered successfully!",
      isClosable: true,
      position: 'top',
      status: "success"
    })
  }

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id='signUpBtnText' defaultMessage='Sign Up' />
        </Heading>
        {isError && <Alert status="error" mb="4">
          <AlertIcon />
          {errorStatus === 400 ? intl.formatMessage({ id: 'emailAlreadyExists', defaultMessage: 'Email already exists!' }) : intl.formatMessage({ id: 'invalidCredentials', defaultMessage: 'Invalid credentials!' })}
        </Alert>}

        <form onSubmit={handleSubmit}>
          <Input
            type='firstName'
            placeholder={intl.formatMessage({
              id: 'firstNameText',
              defaultMessage: 'Fist Name',
            })}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
          />
          <Input
            type='lastName'
            placeholder={intl.formatMessage({
              id: 'lastNameText',
              defaultMessage: 'Last Name',
            })}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
          />
          <Input
            type='email'
            placeholder={intl.formatMessage({
              id: 'emailAddressText',
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
            placeholder={
              intl.formatMessage({
                id: 'popup.passwordField',
                defaultMessage: 'Email Address.',
              })
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
          />
          <HelperText style={{ padding: '20px 0 30px' }}>
            <FormattedMessage
              id='popup.terms'
              defaultMessage="By signing up, you agree to Pickbazar's"
            />
            &nbsp;
            <Link href={TERMS_AND_CONDITIONS.href}>
              <a onClick={closeModal}>
                <FormattedMessage
                  id='termsConditionText'
                  defaultMessage='Terms &amp; Condition'
                />
              </a>
            </Link>
          </HelperText>
          <Button variant='primary' size='big' width='100%' type='submit'>
            <FormattedMessage id={isLoading ? 'popup.loading' : 'popup.continueRegister'} defaultMessage={isLoading ? 'Loading...' : 'Continue'} />
          </Button>
        </form>

        {/* <Divider>
          <span>
            <FormattedMessage id='popup.or' defaultMessage='or' />
          </span>
        </Divider> */}
      
        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id='popup.alreadyAccount'
            defaultMessage='Already have an account?'
          />{' '}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id='loginBtnText' defaultMessage='Login' />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}



// OLD 
// import React, { useContext } from 'react';
// import Link from 'next/link';
// import { Input } from 'components/forms/input';
// import {
//   Button,
//   IconWrapper,
//   Wrapper,
//   Container,
//   LogoWrapper,
//   Heading,
//   SubHeading,
//   HelperText,
//   Offer,
//   // Input,
//   Divider,
//   LinkButton,
// } from './authentication-form.style';
// import { Facebook } from 'assets/icons/Facebook';
// import { Google } from 'assets/icons/Google';
// import { AuthContext } from 'contexts/auth/auth.context';
// import { FormattedMessage, useIntl } from 'react-intl';

// export default function SignOutModal() {
//   const intl = useIntl();
//   const { authDispatch } = useContext<any>(AuthContext);

//   const toggleSignInForm = () => {
//     authDispatch({
//       type: 'SIGNIN',
//     });
//   };

//   return (
//     <Wrapper>
//       <Container>
//         <Heading>
//           <FormattedMessage id='signUpBtnText' defaultMessage='Sign Up' />
//         </Heading>
//         <SubHeading>
//           <FormattedMessage
//             id='signUpText'
//             defaultMessage='Every fill is required in sign up'
//           />
//         </SubHeading>
//         <Input
//           type='text'
//           placeholder={intl.formatMessage({
//             id: 'emailAddressPlaceholder',
//             defaultMessage: 'Email Address or Contact No.',
//           })}
//           height='48px'
//           backgroundColor='#F7F7F7'
//           mb='10px'
//         />
//         <Input
//           type='email'
//           placeholder={intl.formatMessage({
//             id: 'passwordPlaceholder',
//             defaultMessage: 'Password (min 6 characters)',
//           })}
//           height='48px'
//           backgroundColor='#F7F7F7'
//           mb='10px'
//         />
//         <HelperText style={{ padding: '20px 0 30px' }}>
//           <FormattedMessage
//             id='signUpText'
//             defaultMessage="By signing up, you agree to Pickbazar's"
//           />
//           &nbsp;
//           <Link href='/'>
//             <a>
//               <FormattedMessage
//                 id='termsConditionText'
//                 defaultMessage='Terms &amp; Condition'
//               />
//             </a>
//           </Link>
//         </HelperText>
//         <Button variant='primary' size='big' width='100%' type='submit'>
//           <FormattedMessage id='continueBtn' defaultMessage='Continue' />
//         </Button>
//         <Divider>
//           <span>
//             <FormattedMessage id='orText' defaultMessage='or' />
//           </span>
//         </Divider>
//         <Button
//           variant='primary'
//           size='big'
//           style={{
//             width: '100%',
//             backgroundColor: '#4267b2',
//             marginBottom: 10,
//           }}
//         >
//           <IconWrapper>
//             <Facebook />
//           </IconWrapper>
//           <FormattedMessage
//             id='continueFacebookBtn'
//             defaultMessage='Continue with Facebook'
//           />
//         </Button>
//         <Button
//           variant='primary'
//           size='big'
//           style={{ width: '100%', backgroundColor: '#4285f4' }}
//         >
//           <IconWrapper>
//             <Google />
//           </IconWrapper>
//           <FormattedMessage
//             id='continueGoogleBtn'
//             defaultMessage='Continue with Google'
//           />
//         </Button>
//         <Offer style={{ padding: '20px 0' }}>
//           <FormattedMessage
//             id='alreadyHaveAccount'
//             defaultMessage='Already have an account?'
//           />{' '}
//           <LinkButton onClick={toggleSignInForm}>
//             <FormattedMessage id='loginBtnText' defaultMessage='Login' />
//           </LinkButton>
//         </Offer>
//       </Container>
//     </Wrapper>
//   );
// }
