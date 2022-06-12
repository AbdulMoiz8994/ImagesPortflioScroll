import { useDisclosure } from '@chakra-ui/react';
import FloatButton from 'components/common/FloatButton'
import { useComparison } from 'contexts/comparison/use-comparison'
import React from 'react'
import AppDrawer from './Drawer';

const ComparisonFloatButton = () => {
  const { items } = useComparison();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (items.length === 0) return null;

  return (
    <>
      <FloatButton onHandleClick={() => onOpen()} />
      <AppDrawer placement="right" isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default ComparisonFloatButton
