import React, { FC } from "react";
import { CardMenu } from "components/card-menu";
import styled from "styled-components";
import {
  Heading,
  ScaleFade,
} from "@chakra-ui/react";

import Sidebar from "components/sidebar";
import { AlgoliaProps } from "components/sidebar/props";

const Aside = styled.aside({
  width: "300px",
  position: "sticky",
  // top: 110,
  top: 0,
  botton: 10,
  // left: 30,
  height: "calc(100% - 110px)",
  backgroundColor: "yellow",
});

const CardMenuWrapper = styled.div({
  display: "grid",
  gridGap: "10px",
  gridTemplateColumns: "1fr 1fr",
  gridAutoRows: "max-content",
  paddingBottom: 30,

  "@media (min-width: 550px) and (max-width: 990px)": {
    gridTemplateColumns: "1fr 1fr 1fr",
  },
});


interface RenderSidebarProps {
  sidebarLayout: "parentCategory" | "childCategory" | "page";
  category: any;
  subCategories: any[];
  categoryName: string;
  parentCategories: any[];
  onCategoryClick: any;
  selectedQueries: any;
  algolia: AlgoliaProps;
}
export default function RenderSidebar({
  sidebarLayout,
  category,
  subCategories,
  categoryName,
  parentCategories,
  onCategoryClick,
  selectedQueries,
  algolia
}: RenderSidebarProps) {
  if (sidebarLayout === "childCategory")
    return (
      <ScaleFade initialScale={0.5} in={true}>
        <Sidebar
          category={category}
          subCategories={subCategories}
          categoryName={categoryName}
          algolia={algolia}
        />
      </ScaleFade>
    );

  if (sidebarLayout === "parentCategory")
    return (
      <>
        <Heading fontSize="20" pb="3" px="1">
          {categoryName}
        </Heading>
        <CardMenuWrapper>
          <CardMenu
            data={parentCategories}
            onClick={onCategoryClick}
            active={selectedQueries}
          />
        </CardMenuWrapper>
      </>
    );

  if (sidebarLayout === "page")
    return (
      <Sidebar
        category={category}
        subCategories={subCategories}
        categoryName={categoryName}
        algolia={algolia}
      />
    );

  return null;
}