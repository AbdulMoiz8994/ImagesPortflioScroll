import {
  Square,
  SquareProps,
  useColorModeValue as mode,
  useId,
  useRadio,
  UseRadioProps,
  HStack,
  Text,
  Icon
} from '@chakra-ui/react'
import * as React from 'react'
import { FaTimes } from 'react-icons/fa'

export interface RadioOptionProps extends UseRadioProps, Omit<SquareProps, 'onChange'> {
  handleUndo?: () => void
}

export const RadioOption = (props: RadioOptionProps) => {
  const { getInputProps, getCheckboxProps, getLabelProps } = useRadio(props)
  const id = useId()

  return (
    <label {...getLabelProps()}>
      <input {...getInputProps()} aria-labelledby={id} />
      <Square
        id={id}
        rounded="lg"
        fontWeight="bold"
        fontSize="small"
        p="2"
        borderWidth="1px"
        transition="all 0.2s"
        cursor="pointer"
        _hover={{
          bg: mode('gray.100', 'whiteAlpha.200'),
        }}
        _active={{
          bg: "primary",
        }}
        _checked={{
          bg: "primary.100",
          color: "white",
        }}
        _focus={{ shadow: 'outline', boxShadow: 'none' }}
        {...getCheckboxProps(props)}
      />
    </label>
  )
}


// LEGACY CODE 
/**
 return (
    <Square
      id={id}
      rounded="lg"
      fontWeight="bold"
      fontSize="small"
      p="2"
      borderWidth="1px"
      transition="all 0.2s"
      cursor="pointer"
      _hover={!props.isChecked && {
        bg: mode('gray.100', 'whiteAlpha.200'),
      }}
      _active={{
        bg: "primary",
      }}
      bg={props.isChecked && "primary.100"}
      _focus={{ shadow: 'outline', boxShadow: 'none' }}
    >
      <HStack spacing={3}>
        <label {...getLabelProps()}>
          <input {...getInputProps()} aria-labelledby={id} />
          <Text _checked={{ color: 'white' }} {...getCheckboxProps(props)}></Text>
        </label>
        {props.isChecked && <Icon onClick={props.handleUndo} color="white" fontSize="18" as={FaTimes} />}
      </HStack>
    </Square>   
  )
 */