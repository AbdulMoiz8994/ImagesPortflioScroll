import { AiOutlineAlignLeft, AiOutlineAlignCenter, AiOutlineAlignRight } from 'react-icons/ai'
import { Flex } from '@chakra-ui/react'
import * as React from 'react'
import { ToggleButtonGroup } from './ToggleButtonGroup'
import { ToggleButton } from './ToggleButton'

interface Item {
  label: string,
  icon: any,
  aria_label: string,
  value: string
}
interface Props {
  value: string
  items: Item[]
  onChange?: (value: string) => void
}
export const ViewSwitch:React.FC<Props> = ({ value, items, onChange }) => {
  return (
    <Flex justify="center">
      <ToggleButtonGroup
        size="md"
        value={value}
        onChange={(value) => onChange(value)}
        defaultValue={items[0].value}
        isAttached
        variant="outline"
        aria-label="Align text"
      >
        {items.map(({ value, aria_label, icon: Icon }: Item) => (
          <ToggleButton key={value} value={value} aria-label={aria_label} icon={<Icon />} />
        ))}
      </ToggleButtonGroup>
    </Flex>
  )
}
