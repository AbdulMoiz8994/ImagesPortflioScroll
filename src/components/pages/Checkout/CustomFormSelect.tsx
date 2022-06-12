import { FormControl, FormLabel, Input, InputProps, Stack, Text, Box, InputGroup, InputRightElement, Icon, InputLeftAddon, Select, SelectProps } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import { useState } from "react";
import { FieldErrors } from "react-hook-form";
import _ from 'lodash'
import { IconType } from "react-icons/lib";

interface SelectOption {
  label: string
  value: string
}

interface Props extends SelectProps {
  placeholder?: string
  isError?: true | false
  fieldName?: string
  errors?: FieldErrors
  label?: string
  isRequired?: boolean
  IconRight?: IconType
  LeftAddon?: ReactNode | string
  options?: SelectOption[]
}

const CustomFormInput = React.forwardRef<HTMLSelectElement, Props>(({ options, LeftAddon, IconRight, isRequired, label, errors, fieldName, placeholder, ...restProps }, ref) => {  
  const { isError, errorMessage } = getError(errors, fieldName);

  return (
    <FormControl>
      {!!label && <FormLabel as={Text} fontSize="sm">{label} {isRequired && <Box as="span" color="red">*</Box>}</FormLabel>}
      <InputGroup>
        {!!LeftAddon && <InputLeftAddon pr="4" children={LeftAddon} h="12"  /> }
        <Select 
          // placeholder="Select option" 
          ref={ref}
          size="lg"
          _focus={{ outline: 'none', borderColor: isError ? "red" : "black" }} 
          rounded="sm" 
          borderColor={isError ? "red" : "gray.400"} 
          placeholder={placeholder}
          {...restProps}
          // defaultValue={options[0].value} 
        >
          {options?.map((option: SelectOption, idx: number) => (
            <option key={idx.toString()} value={option.value}>{option.label}</option>
          ))}
          {/* <option value="option2">Option 2</option>
          <option value="option3">Option 3</option> */}
        </Select>
        {IconRight && <InputRightElement 
          pointerEvents="none"
          children={<Icon as={IconRight} color="gray.400" />}
        />}
      </InputGroup>
      {isError && <Text fontSize="15" color="red" fontStyle="italic" pl="1">{errorMessage}</Text>}
    </FormControl>
  )
})

function getError(errors, fieldName) {
  if (!errors) return { isError: false, errorMessage: "" };

  const errorFields = Object.keys(errors);
  const error = errorFields.find(field => field === fieldName);
  if (!error) return { isError: false, errorMessage: "" };

  return { 
    isError: true,
    errorMessage: errors[error].message  
  }
}

export default CustomFormInput