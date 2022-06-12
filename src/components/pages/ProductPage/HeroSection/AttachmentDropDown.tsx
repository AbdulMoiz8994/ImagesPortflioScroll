import React, { useEffect, useState } from 'react'
import { Stack, Text, Select } from '@chakra-ui/react'
import { fetchProductBySlug } from 'services/products'

const AttachmentDropDown = ({ tag, onChangeAttachment }) => {
  const [product, setProduct] = useState(null);
  // const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    getAsyncData();
    async function getAsyncData() {
      if (tag.name === "krem" || tag.slug === "krem") {
        const { product, error } = await fetchProductBySlug("module-4-kremagiera-galvanize-metalliki-1m-κιt");
        if (!!product && !error) {
          setProduct(product)
        }

        return
      }
      if (tag.name === "plastickrem" || tag.slug === "plastickrem") {
        const { product, error } = await fetchProductBySlug("kremagiera-plastiki-me-metalliko-pyrina");
        if (!!product && !error) {
          setProduct(product)
        }

        return
      }
    }
  }, [])

  const handleSelect = (e) => {
    const value = e.currentTarget.value
    if (!product) return;
    if (value === 'null') {
      onChangeAttachment({ product, quantity: 0 });
      return
    };
    if (value === "3") {
      onChangeAttachment({ product, quantity: 3 });
      return;
    }
    if (value === "4") {
      onChangeAttachment({ product, quantity: 4 });
      return;
    }
    if (value === "5") {
      onChangeAttachment({ product, quantity: 5 });
      return;
    }
    if (value === "6") {
      onChangeAttachment({ product, quantity: 6 });
      return;
    }
    if (value === "7") {
      onChangeAttachment({ product, quantity: 7 });
      return;
    }
  }

  return (
    <Stack>
      <Text fontWeight="medium">Kρεμαγιέρα</Text>
      <RenderDropDown tag={tag} onSelect={handleSelect} />
      {/* <Select w="max" onChange={handleSelect}>
        <option value='null'>Χωρίς κρεμαγιέρα</option>
        <option value='3'>3 μέτρα</option>
        <option value='4'>4 μέτρα</option>
        <option value='5'>5 μέτρα</option>
        <option value='6'>6 μέτρα</option>
        <option value='7'>7 μέτρα</option>
      </Select> */}
    </Stack>
  )
}

function RenderDropDown({tag, onSelect}) {
  if (tag.name === "krem" || tag.slug === "krem") return (
    <Select w="max" onChange={onSelect}>
      <option value='null'>Χωρίς κρεμαγιέρα</option>
      <option value='3'>3 μέτρα</option>
      <option value='4'>4 μέτρα</option>
      <option value='5'>5 μέτρα</option>
      <option value='6'>6 μέτρα</option>
      <option value='7'>7 μέτρα</option>
    </Select>
  )
  if (tag.name === "plastickrem" || tag.slug === "plastickrem") return (
    <Select w="max" onChange={onSelect}>
      <option value='null'>Χωρίς κρεμαγιέρα</option>
      <option value='3'>3 μέτρα πλαστική κρεμαγιέρα</option>
      <option value='4'>4 μέτρα πλαστική κρεμαγιέρα</option>
      <option value='5'>5 μέτρα πλαστική κρεμαγιέρα</option>
      <option value='6'>6 μέτρα πλαστική κρεμαγιέρα</option>
      <option value='7'>7 μέτρα πλαστική κρεμαγιέρα</option>
    </Select>
  )

  return null
}

export default AttachmentDropDown