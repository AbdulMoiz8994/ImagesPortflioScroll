import React, { useContext, useState } from 'react';
import { Stack, Heading, HStack, Text, Icon, Wrap, Divider, Box, Flex, Center, Button, Skeleton } from '@chakra-ui/react';
import { AiOutlineEye } from 'react-icons/ai'
import StarsRating from 'components/common/StarsRating';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { BsHeart } from 'react-icons/bs';
import { IoIosGitCompare } from 'react-icons/io';
import ActionSection from './ActionSection';
import PriceDescription from './PriceDescription';
import ProductHeadingSection from './ProductHeadingSection';
import MetaDetailSection from './MetaDetailSection';
import CostOfGood from './CostOfGood';
import { AuthContext } from 'contexts/auth/auth.context';
import { isCustomerFromManagementTeam } from 'utils/customer-utils';
import UpsellProducts from './UpsellProducts';
import useUpsellProducts from 'hooks/useUpsellProducts';
import AttachmentDropDown from './AttachmentDropDown';
import { Modal } from '@redq/reuse-modal';

const ShortDescriptionSection = ({ product, onNameChange, productVariations, onChangeProductVariation, loading }) => {
  const { customer } = useContext<any>(AuthContext);
  const { upsellProduct, loading: upsellLoading } = useUpsellProducts(product);
  const [attachment, setAttachment] = useState(null);

  const getPriceWithAttachments = (product, attachment) => {
    let totalPrice = product.price
    let totalRegularPrice = product.regular_price;
    if (!!attachment && attachment.quantity !== 0) {
      totalPrice = (parseFloat(totalPrice) + (parseFloat(attachment.product.price) * attachment.quantity)).toFixed(2);
      totalRegularPrice = (parseFloat(totalRegularPrice) + (parseFloat(attachment.product.price) * attachment.quantity)).toFixed(2);
    }
    
    return { price: totalPrice, regular_price: totalRegularPrice };
  }
  return (
    <Modal>
      <Stack w="full" spacing="4">
        <ProductHeadingSection product={product} loading={loading} />
        <AppDivider />

        <PriceDescription product={{
          ...product, 
          price: getPriceWithAttachments(product, attachment).price,
          regular_price: getPriceWithAttachments(product, attachment).regular_price
        }} />
        <AppDivider />

        {product.tags.some(tag => (tag.name === "krem" || tag.slug === "krem") || (tag.name === "plastickrem" || tag.slug === "plastickrem")) && <>
          <AttachmentDropDown 
            tag={product.tags.find(tag => (tag.name === "krem" || tag.slug === "krem") || (tag.name === "plastickrem" || tag.slug === "plastickrem"))} 
            onChangeAttachment={(attachment) => setAttachment(attachment)} />
          <AppDivider />
        </>}
        
        <ActionSection 
          product={product}
          attachment={attachment}
          productVariations={productVariations}
          onChangeProductVariation={onChangeProductVariation}
        />
        <AppDivider />

        <MetaDetailSection product={product} onNameChange={onNameChange} />
        <RenderUpsellProduct product={upsellProduct} loading={upsellLoading} />

        {isCustomerFromManagementTeam(customer) && <>
          <AppDivider />
          <CostOfGood product={product} />
        </>}
      </Stack>
    </Modal>
  )
}

function RenderUpsellProduct({product, loading}) {
  if (!!loading) return (
    <Skeleton height='6rem' />
  )

  if (!!product && !loading) return (
    <UpsellProducts product={product} />
  )

  return null
}

function AppDivider() {
  return (
    <Divider w="full" borderColor="gray.400" />
  )
}

export default ShortDescriptionSection
