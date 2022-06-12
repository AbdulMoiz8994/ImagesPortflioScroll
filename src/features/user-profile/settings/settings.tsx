import React, { useState } from 'react';
import {
  SettingsForm,
  SettingsFormContent,
  HeadingSection,
  Title,
  Row,
  Col,
} from './settings.style';
import { Button } from 'components/button/button';
import { Input } from 'components/forms/input';
import { FormattedMessage, useIntl } from 'react-intl';
import { Label } from 'components/forms/label';
import useCustomer from 'hooks/useCustomer';
import { updateCustomer } from 'services/customer';
import Router from 'next/router';
import { useToast } from '@chakra-ui/react';

type SettingsContentProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const SettingsContent: React.FC<SettingsContentProps> = ({ deviceType }) => {
  const { 
    id,
    name, 
    surname, 
    email, 
    primaryPhone, 
    secondaryPhone, 
    address, 
    city, 
    postalCode, 
    region,
    setName,
    setSurname,
    setEmail,
    setPrimaryPhone,
    setSecondaryPhone,
    setAddress,
    setCity,
    setPostalCode,
    setRegion
  } = useCustomer();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const intl = useIntl();

  // console.log({ id, name, surname, email, primaryPhone, secondaryPhone, address, city, postalCode, region });

  const handleSave = async () => {
    setLoading(true);

    const { customer, error } = await updateCustomer({ id, name, surname, email, primaryPhone, secondaryPhone, address, city, postalCode, region })
    
    if (!customer && !!error) {
      setLoading(false);
      toast({
        title: "Something went wrong...",
        isClosable: true,
        position: 'top',
        status: "error"
      })
      return;
    }
    
    localStorage.setItem("customer", JSON.stringify(customer));
    setLoading(false);
    toast({
      title: "Customer registered successfully!",
      isClosable: true,
      position: 'top',
      status: "success"
    })

    Router.reload();
  }

  return (
    <SettingsForm>
      <SettingsFormContent>
        <HeadingSection>
          <Title>
            <FormattedMessage
              id='profilePage.title'
              defaultMessage='Your Profile'
            />
          </Title>
        </HeadingSection>

        <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
          <Col xs={12} sm={6} md={6} lg={6}>
            <Label>
              <FormattedMessage
                id='profilePage.firstName'
                defaultMessage='First Name'
              />
            </Label>
            <Input
              type='text'
              // label={'First Name'}
              label={intl.formatMessage({ id: 'profilePage.firstName', defaultMessage: 'First Name' })}
              name='first_name'
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              backgroundColor='#F7F7F7'
              height='48px'
            />
          </Col>

          <Col xs={12} sm={6} md={6} lg={6}>
            <Label>
              <FormattedMessage
                id='profilePage.lastName'
                defaultMessage='Last Name'
              />
            </Label>
            <Input
              type='text'
              label={intl.formatMessage({ id: 'profilePage.lastName', defaultMessage: 'Last Name' })}
              name='last_name'
              value={surname}
              onChange={(e) => setSurname(e.currentTarget.value)}
              backgroundColor='#F7F7F7'
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Label>
              <FormattedMessage
                id='profilePage.phoneNumber'
                defaultMessage='Phone Number'
              />
            </Label>
            <Input
              type='text'
              label={intl.formatMessage({ id: 'profilePage.phoneNumber', defaultMessage: 'Phone Name' })}
              name='phone_number'
              value={primaryPhone}
              onChange={(e) => setPrimaryPhone(e.currentTarget.value)}
              backgroundColor='#F7F7F7'
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <Label>
              <FormattedMessage
                id='profilePage.streetAddress'
                defaultMessage='Street Address'
              />
            </Label>
            <Input
              type='text'
              label={intl.formatMessage({ id: 'profilePage.streetAddress', defaultMessage: 'Street Address' })}
              name='street_address'
              value={address}
              onChange={(e) => setAddress(e.currentTarget.value)}
              backgroundColor='#F7F7F7'
              height='48px'
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <Label>
              <FormattedMessage
                id='profilePage.city'
                defaultMessage='City'
              />
            </Label>
            <Input
              type='text'
              label={intl.formatMessage({ id: 'profilePage.city', defaultMessage: 'City' })}
              name='city'
              value={city}
              onChange={(e) => setCity(e.currentTarget.value)}
              backgroundColor='#F7F7F7'
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6} style={{marginTop: '16px'}}>
            <Label>
              <FormattedMessage
                id='profile.postalCode'
                defaultMessage='Postal Code'
              />
            </Label>
            <Input
              type='text'
              label={intl.formatMessage({ id: 'profilePage.postalCode', defaultMessage: 'Postal Code' })}
              name='postal_code'
              value={postalCode}
              onChange={(e) => setPostalCode(e.currentTarget.value)}
              backgroundColor='#F7F7F7'
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6} style={{marginTop: '16px'}}>
            <Label>
              <FormattedMessage
                id='profilePage.region'
                defaultMessage='Region'
              />
            </Label>
            <Input
              type='text'
              label={intl.formatMessage({ id: 'profilePage.region', defaultMessage: 'Region' })}
              name='region'
              value={region}
              onChange={(e) => setRegion(e.currentTarget.value)}
              backgroundColor='#F7F7F7'
            />
          </Col>
        </Row>

        <Button size='big' style={{ width: '100%' }} onClick={handleSave}>
          <FormattedMessage id={loading ? 'loadingBtnInGreek' : 'profileSaveBtnInGreek'} defaultMessage={loading ? 'Φορτώνει…' : 'Αποθήκευση'} />
        </Button>
      </SettingsFormContent>
    </SettingsForm>
  );
};

export default SettingsContent;


// LEGACY CODE
/*
<SettingsForm>
      <SettingsFormContent>
        <HeadingSection>
          <Title>
            <FormattedMessage
              id='profilePageTitle'
              defaultMessage='Your Profile'
            />
          </Title>
        </HeadingSection>
        <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              <FormattedMessage
                id='profileFirstNameField'
                defaultMessage='First Name'
              />
            </Label>
            <Input
              type='text'
              label='First Name'
              name='first_name'
              value={state.name}
              onChange={handleChange}
              backgroundColor='#F7F7F7'
              height='48px'
            />
          </Col>

          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              <FormattedMessage
                id='profileLastNameField'
                defaultMessage='Last Name'
              />
            </Label>
            <Input
              type='text'
              label='Last Name'
              name='last_name'
              value={state.email}
              onChange={handleChange}
              backgroundColor='#F7F7F7'
            />
          </Col>

          <Col xs={12} sm={2} md={2} lg={2}>
            <Button size='big' style={{ width: '100%' }} onClick={handleSave}>
              <FormattedMessage id='profileSaveBtn' defaultMessage='Save' />
            </Button>
          </Col> 
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <SettingsFormContent>
                <Contact />
              </SettingsFormContent>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} style={{ position: 'relative' }}>
              <SettingsFormContent>
                <Address /> 
              </SettingsFormContent>
            </Col>
          </Row>
  
          // 1- Just hidding not removing, because we may need to inspect whenever we will confuse in any type of compiler confusion! 
          // 2- May be in future, we need this row and we can copy from here and paste anywhere so it will save our time and cost 😃 
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <SettingsFormContent>
                <Payment deviceType={deviceType} />
              </SettingsFormContent>
            </Col>
          </Row> 
        </SettingsFormContent>
      </SettingsForm>
*/