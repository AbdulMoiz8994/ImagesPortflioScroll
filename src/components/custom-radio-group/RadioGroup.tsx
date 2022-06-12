import { HStack, StackProps, useRadioGroup } from '@chakra-ui/react'
import * as React from 'react'
import { RadioOption } from './RadioOption'

interface RadioGroupProps extends Omit<StackProps, 'onChange'> {
  name: string
  options: string[]
  onChange: (value: string) => void
}

export const RadioGroup = (props: RadioGroupProps) => {
  const { name, options, onChange, ...rest } = props
  const { getRootProps, getRadioProps, setValue } = useRadioGroup({
    name,
    onChange,
    defaultValue: options[0]
  })

  const handleUndo = () => {
    onChange("");
    setValue("")
  }

  return (
    <HStack spacing={{ base: 2, md: 2 }} {...getRootProps(rest)}>
      {options.map((value) => (
        <RadioOption handleUndo={handleUndo} key={value} {...getRadioProps({ value })}>
          {value}
        </RadioOption>
      ))}
    </HStack>
  )
}
