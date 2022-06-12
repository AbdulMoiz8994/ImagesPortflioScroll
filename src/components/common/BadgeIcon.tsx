import { Badge, Box } from '@chakra-ui/layout'
import { Icon } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

interface Props {
  Icon: any
  count?: number
  link?: string
  onClick?: any
  name?: string
}

export default function BadgeIcon({ Icon, count, link, onClick, name }: Props) {
  return (
    <Box 
      userSelect="none"
      p="1.5"
      position="relative"
      _active={{ transform: link ? 'translateY(2px)' : 'translateY(0)' }}
    >
      {count !== 0 && count !== undefined && <Badge 
        top="1px" 
        right="0" 
        // fontSize="xx-small" 
        fontSize="x-small" 
        rounded="full" 
        position="absolute"
        bg="primary.100"
        color="white"
        zIndex={1}
      >{count}</Badge>}
      {!!link ? <Link href={link} passHref>
        <a>
          <RenderIcon 
            href={link}
            ReactIcon={Icon} 
            color={count > 0 ? "inherit" : "gray"}
            count={count}
            name={name}
            onClick={onClick}
          />
        </a>
      </Link> : 
      <RenderIcon 
        ReactIcon={Icon}
        color={count > 0 ? "inherit" : "gray"}
        onClick={onClick}
        count={count}
        name={name}
      />}
    </Box>
  )
}

interface RenderIconProps {
  ReactIcon: any
  color: string
  onClick?: Function
  count: number
  name: string
  href?: string
}

function RenderIcon({ ReactIcon, color, onClick, count, name }: RenderIconProps) {
  return (
    <Icon 
      as={ReactIcon} 
      fontSize="20" 
      color={color}
      onClick={() => onClick && onClick({ count, name })}
    />
  )
}