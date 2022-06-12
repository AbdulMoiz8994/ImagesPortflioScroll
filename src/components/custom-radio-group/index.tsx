import { Heading, VStack } from '@chakra-ui/react'
import * as React from 'react'
import { RadioGroup } from './RadioGroup'

interface Props {
  options: any[]
  onChange?: (value: string) => void
}
export const CustomRadioGroup:React.FC<Props> = ({ options, onChange }) => {
  // const options = ['1', '2', '3', '4', '5', '6', '7']
  // const options = ['Original', '1123HD', 'KJDA748', '124DG43']

  return (
    <VStack align="flex-start"  maxW="5xl" width="full">
      <RadioGroup name="rating" options={options} onChange={onChange} />
    </VStack>
  )
}
