import { FormControl, FormLabel, Input, InputProps, Stack, Text, Box, InputGroup, InputRightElement, Icon, InputLeftAddon, Textarea, TextareaProps } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import { useState } from "react";
import { FieldErrors } from "react-hook-form";
import _ from 'lodash'
import { IconType } from "react-icons/lib";

interface Props extends TextareaProps {
  placeholder?: string
  isError?: true | false
  fieldName?: string
  errors?: FieldErrors
  label?: string
  isRequired?: boolean
  IconRight?: IconType
  LeftAddon?: ReactNode | string
  errorMessage?: string
  registerProps?: any
  // LeftAddon?: string
}

// const CustomAreaText = React.forwardRef<HTMLInputElement, Props>(({ errorMessage, isError, LeftAddon, IconRight, isRequired, label, errors, fieldName, placeholder, ...restProps }, ref) => {  
const CustomAreaText = React.forwardRef<HTMLTextAreaElement, Props>(({ errorMessage, isError, LeftAddon, IconRight, isRequired, label, errors, fieldName, placeholder, registerProps, ...restProps }, ref) => {  
  const error = getError(isError, errorMessage, errors, fieldName);

  return (
    <FormControl>
      {!!label && <FormLabel as={Text} fontSize="sm">{label} {isRequired && <Box as="span" color="red">*</Box>}</FormLabel>}
      <InputGroup>
        {!!LeftAddon && <InputLeftAddon pr="4" children={LeftAddon} h="12"  /> }
        <Textarea 
          ref={ref}
          fontSize="15"
          _focus={{ outline: 'none', borderColor: error.isError ? "red" : "black" }} 
          borderColor={error.isError ? "red" : "gray.400"} 
          rounded="sm" 
          size="lg" 
          placeholder={placeholder} 
          {...registerProps}
          {...restProps}
        />
        {IconRight && <InputRightElement 
          pointerEvents="none"
          children={<Icon as={IconRight} color="gray.400" />}
        />}
      </InputGroup>
      {error.isError && <Text fontSize="15" color="red" fontStyle="italic" pl="1">{error.errorMessage}</Text>}
    </FormControl>
  )
})

function getError(isError, errorMessage, errors, fieldName) {
  if (isError || errorMessage) return { isError: true, errorMessage }

  if (!errors) return { isError: false, errorMessage: "" };

  const errorFields = Object.keys(errors);
  const error = errorFields.find(field => field === fieldName);
  if (!error) return { isError: false, errorMessage: "" };

  return { 
    isError: true,
    errorMessage: errors[error].message  
  }
}

export default CustomAreaText