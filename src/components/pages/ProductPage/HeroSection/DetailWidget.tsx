import React, { useEffect, useState } from 'react';
import { 
	Stack, 
	HStack, 
	Icon, 
	Text, 
	Tooltip,
	Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
	Box 
} from '@chakra-ui/react';
import { IoGlobeOutline, IoReceiptOutline } from 'react-icons/io5';
import { GiReturnArrow } from 'react-icons/gi';
import { MdContactSupport, MdPayment } from 'react-icons/md';
import { FormattedMessage } from 'react-intl';
import { getAvailabilityFromProdAttributes } from 'utils/products-utils';
import { FaShippingFast } from 'react-icons/fa';
import { SiAdguard } from 'react-icons/si';

const DetailWidget = ({ product }) => {
	const [stockStatus, setStockStatus] = useState("");
	
	useEffect(() => {
		const { attributes } = product;
		
		const value = getAvailabilityFromProdAttributes(attributes);
		setStockStatus(value);
	}, [product])

  return (
    <Stack w="full" mt="4">
			<Stack w="full" spacing="6" bg="#f1f1f1" p="4">
				<HStack spacing="6">
					<Icon alignSelf="flex-start" fontSize="26" as={FaShippingFast} />
					{/* <Text as="p" fontSize="16" px="0">Shipping worldwide</Text> */}
					<Text as="p" fontSize="16" px="0">Άμεση αποστολή</Text> 
				</HStack>
				<HStack spacing="6">
					<Icon fontSize="26" as={GiReturnArrow} />
					{/* <Text as="p" fontSize="16" px="0">Free 7-day return if eligible, so easy</Text> */}
					<Text as="p" fontSize="16" px="0">Εγγύηση DOA</Text>
				</HStack>
				<HStack spacing="6">
					<Icon fontSize="26" as={SiAdguard} />
					{/* <Text as="p" fontSize="16" px="0">Supplier give bills for this product.</Text> */}
					<Text as="p" fontSize="16" px="0">Ασφάλεια συναλλαγών</Text>
				</HStack>
				<HStack spacing="6">
					<Icon fontSize="26" as={MdContactSupport} />
					{/* <Text as="p" fontSize="16" px="0">Pay online or when receiving goods</Text> */}
					<Text as="p" fontSize="16" px="0">Υποστήριξη</Text>
				</HStack>
			</Stack>

			<Stack spacing="1" pt="2">
				<Tooltip label="Διαθεσιμότητα" placement="top" hasArrow>
					<Text w="max" fontWeight="semibold">{stockStatus}</Text>
				</Tooltip>
				<DetailsAccordions />
			</Stack>
    </Stack>
  )
}

function DetailsAccordions() {
	return (
		<Accordion allowMultiple={false} allowToggle>
			<AccordionItem rounded="lg" border="1px solid lightgray" my="2">
				<h2>
					<AccordionButton _focus={{ boxShadow: 'none', outline: 'none' }}>
						<Box flex='1' textAlign='left'>
							<FormattedMessage id="ProductPage.DeliveryTime" defaultMessage="Delivery Time" />
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					Εφόσον το προϊόν είναι άμεσα διαθέσιμο ο σύνηθες χρόνος παράδοσης είναι 1 έως 3 εργάσιμες ημέρες. <br /><br />

					Κόστος Αποστολής:
					3.50€ <br /><br />

					Κόστος Αντικαταβολής:
					2.90€ <br /><br />

					Όλες οι παραγγελίες που έχουν ολοκληρωθεί έως τις 14:00 αποστέλλονται την ίδια ημέρα
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem rounded="lg" border="1px solid lightgray" my="2">
				<h2>
					<AccordionButton _focus={{ boxShadow: 'none', outline: 'none' }}>
						<Box flex='1' textAlign='left'>
							<FormattedMessage id="ProductPage.InterestFreeInstallments" defaultMessage="Interest Free installments" />
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					Έως 2 άτοκες δόσεις για αγορές άνω των 30€ και έως 4 άτοκες δόσεις για αγορές άνω των 150€
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem rounded="lg" border="1px solid lightgray" my="2">
				<h2>
					<AccordionButton _focus={{ boxShadow: 'none', outline: 'none' }}>
						<Box flex='1' textAlign='left'>
							<FormattedMessage id="ProductPage.AvailabilityofProducts" defaultMessage="Availability of products" />
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					H διαθεσιμότητα των προϊόντων εμφανίζεται στην σελίδα του προϊόντος. <br /><br />

					Το προϊόν μπορεί να είναι:
					Άμεσα διαθέσιμο:  Διαθέσιμο για ηλεκτρονική αγορά. <br /><br />

					Παράδοση 1-3 εργάσιμες: Το προϊόν είναι διαθέσιμο στις κεντρικές αποθήκες μας και θα είναι διαθέσιμο για αποστολή εντός 3 εργάσιμων. <br /><br />
					
					Παράδοση 4-10 εργάσιμες: Το προϊόν θα είναι διαθέσιμο για αποστολή σε 4-10 εργάσιμες. <br /><br />
					
					Κατόπιν Παραγγελίας: Είναι διαθέσιμο για προ-παραγγελία και η ημερομηνία παράδοσης εξαρτάται από την επίσημη ημέρα παράδοσης από την επίσημη αντιπροσωπεία. Τηρείται σειρά προτεραιότητας. <br /><br />
					
					Εξαντλημένο: Δεν είναι διαθέσιμο για παραγγελία αυτή τη στιγμή.
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	)
}

export default DetailWidget
