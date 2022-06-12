import React, { useEffect } from "react";
import { Modal } from "@redq/reuse-modal";
import dynamic from "next/dynamic";
import styled from "styled-components";
import css from "@styled-system/css";
import { SidebarWithCardMenu } from "layouts/sidebar/sidebar-with-card-menu";
import CloseModalOutsideClick from "../../../utils/closeModalOutsideClick";
import router, { useRouter } from "next/router";
import { useState } from "react";
import { FC } from "react";
import { CustomHits } from "components/algolia/CustomHits";
import { CustomPagination } from "components/algolia/CustomPagination";
import { CustomCurrentRefinements } from "components/algolia/CustomCurrentRefinements";
import { CustomStats } from "components/algolia/CustomStats";
import CategoryPageHeader from "./Header";
import RenderSideBar from "./RenderSideBar";
import { AlgoliaProps } from "components/sidebar/props";

import { useSpringModal } from 'contexts/spring-modal/use-spring-modal';
import { openModal, closeModal } from '@redq/reuse-modal';
import Cart from 'features/carts/cart';
import RenderSidebar from "layouts/sidebar/renderSidebar";
import { CartPopupBody, CloseButton, ItemWrapper, PopupHeader } from "features/carts/cart.style";
import { CloseIcon } from 'assets/icons/CloseIcon';
import { Scrollbar } from 'components/scrollbar/scrollbar';


import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react'

const CartPopUp = dynamic(() => import("features/carts/cart-popup"), {
  ssr: false,
});

const PAGE_TYPE = "grocery";

interface DeviceTypeProps {
  desktop: boolean;
  mobile: boolean;
  tablet: boolean;
}

interface ChildCategoryProps {
  deviceType: DeviceTypeProps;
  sidebarLayout: "childCategory";
  category: any;
  count: number;
  subCategories: any[];
  categoryName: string;
  categoryDescription: string;
  algolia: AlgoliaProps;
}
interface PageProps {
  deviceType: DeviceTypeProps;
  sidebarLayout: "page";
  algolia: AlgoliaProps;
  categoryName?: string;
  categoryDescription?: string;
  category?: never;
  count?: never;
  subCategories?: never;
}

// const ChildCategory:FC<MainProps> = ({ sidebarLayout, category, categoryName, categoryDescription, subCategories, count, deviceType }) => {
const ChildCategory: FC<ChildCategoryProps | PageProps> = ({
  sidebarLayout,
  category,
  categoryName,
  categoryDescription,
  subCategories,
  count,
  deviceType,
  algolia,
}) => {
  const router = useRouter();
  const [view, setView] = useState<"list" | "grid">("grid");
  const { pathname, query } = router;
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen, onModalOpen, onModalClose } = useSpringModal();

  return (
    <Modal>
      <ContentArea>
        <RenderSideBar
          sidebarLayout={sidebarLayout}
          category={category}
          subCategories={subCategories}
          categoryName={categoryName}
          algolia={algolia}
        />

        <main>
          <FiltersForModal isOpen={isOpen} onClose={onModalClose} sidebarLayout={sidebarLayout} category={category} subCategories={subCategories} categoryName={categoryName} query={query} algolia={algolia} />
          <CategoryPageHeader
            title={categoryName}
            description={categoryDescription}
            count={count}
            view={view}
            onChangeView={value => setView(value)}
            onModal={onModalOpen}
          />

          <CustomStats />

          <CustomCurrentRefinements createURL="" />
          <CustomHits
            view={view}
            pageType={PAGE_TYPE}
            deviceType={deviceType}
          />
          <CustomPagination defaultRefinement={router.query?.page || 1} />
        </main>
      </ContentArea>
      <CloseModalOutsideClick>
        <CartPopUp deviceType={deviceType} />
      </CloseModalOutsideClick>
    </Modal>
  );
};

function FiltersForModal({ isOpen, sidebarLayout, category, subCategories, categoryName, query, algolia, onClose }) {
  return (
    <Drawer
      isOpen={isOpen}
      placement='left'
      onClose={onClose}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
        <RenderSidebar
          sidebarLayout={sidebarLayout}
          category={category}
          subCategories={subCategories}
          categoryName={categoryName}
          parentCategories={[]}
          onCategoryClick={() => {}}
          selectedQueries={query.category}
          algolia={algolia} 
        />
        </DrawerBody>

        <DrawerFooter>
          <Button w="full" colorScheme="primary" mr={3} onClick={onClose}>
            {/* Cancel */}
            Άκυρο
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const ContentArea = styled.div<any>(
  css({
    overflow: "hidden",
    // padding: ['68px 0 100px', '68px 0 50px', '110px 2rem 50px'],
    padding: ["0 0 100px", "20px 0 50px", "60px 2rem 50px"],
    display: "grid",
    // minHeight: "100vh",
    gridColumnGap: "30px",
    // gridRowGap: ["0", "0px", "0"],
    gridTemplateColumns: [
      "minmax(0, 1fr)",
      "minmax(0, 1fr)",
      "300px minmax(0, 1fr)",
    ],
    backgroundColor: "#f9f9f9",
  })
);

export default ChildCategory;
