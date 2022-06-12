import React, { useEffect } from 'react';
import CustomFormInput from 'components/pages/Checkout/CustomFormInput';
import PlacesAutocomplete from "react-places-autocomplete";
import { useState } from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { FC } from 'react';
import { FieldErrors } from "react-hook-form";
import { defaultTheme } from 'site-settings/site-theme/default';
import { FormattedMessage } from 'react-intl';

interface Props {
  onSelect: any,
  registerProps: any,
  errors: FieldErrors
  country: string,
  label: string,
  fieldName: string,
  placeholder: string,
  value: string
  onChange: (value: string) => void
}
const PlacesAutoComplete:FC<Props> = ({ value, onChange, onSelect, registerProps, errors, country, label, fieldName, placeholder }) => {
  return (
    <PlacesAutocomplete
      value={value}
      onChange={(address) => {
        onChange(address);
      }}
      onSelect={(check) => {
        // console.log({ check })
        onSelect(check)
      }}
      searchOptions={{
        componentRestrictions: { country: country ?? "gr" }
      }}
    >
      {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => {
        return (
          <Box position="relative">
            <CustomFormInput  
              value={value}
              label={label}
              isRequired
              fieldName={fieldName}
              errors={errors}
              {...registerProps}
              placeholder={placeholder} 
              {...getInputProps()} 
            />
            {suggestions.length > 0 && 
              <Box 
                border="1px"
                borderColor="gray.300"
                top="20" 
                rounded="md" 
                shadow="xl" 
                zIndex={1} 
                position="absolute" 
                w="full" 
                bg="white"
                px="2"
              >
                <Stack p="5">
                  <Box>
                    <Text
                      fontSize="14"
                      cursor="pointer"
                      color={defaultTheme.colors.blue.link}
                    >
                      <FormattedMessage 
                        id="CheckoutPage.CantFindAddress"
                        defaultMessage="Can't find your address? Add it manually"
                      />
                    </Text>
                  </Box>  
                  {suggestions.map((suggestion: any, idx: number) => (
                    <>
                      <Box
                        key={idx.toString()} 
                        {...getSuggestionItemProps(suggestion)}
                      >
                        <Text
                          cursor="pointer"
                          _hover={{
                            color: "GrayText"
                          }}
                        >
                          {suggestion.description}
                        </Text>
                      </Box>
                    </>
                  ))}
                </Stack>
              </Box>}
          </Box>
        )
      }}
    </PlacesAutocomplete>
  )
}

export default PlacesAutoComplete
