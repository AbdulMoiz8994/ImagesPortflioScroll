import React, { FC } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Sticky from "react-stickynode";
import { Scrollbar } from "components/scrollbar/scrollbar";
import { useAppState } from "contexts/app/app.provider";
import { useState } from "react";
import { useSpringModal } from "contexts/spring-modal/use-spring-modal";
import { AlgoliaProps } from "components/sidebar/props";
import RenderSidebar from "./renderSidebar";

const MobileOnly = styled.div({
  display: "none",
  zIndex: 10,

  "@media (max-width: 990px)": {
    display: "block",
  },
});

const DesktopOnly = styled.div({
  display: "none",
  "@media (min-width: 991px)": {
    display: "block",
    // backgroundColor: 'red'
  },
});

interface ParentCategoryProps {
  type?: string;
  sidebarLayout: "parentCategory";
  categories: any[];
  categoryName: string;
  subCategories?: never;
  category?: never;
  algolia?: never;
}
interface ChildCategoryProps {
  type?: string;
  sidebarLayout: "childCategory";
  subCategories: any[];
  categoryName: string;
  category: any;
  algolia: AlgoliaProps;
  categories?: never;
}
interface PageProps {
  type?: string;
  sidebarLayout?: "page";
  algolia: AlgoliaProps;
  categories?: never;
  subCategories?: never;
  categoryName?: never;
  category?: never;
}

export const SidebarWithCardMenu: FC<
  ParentCategoryProps | ChildCategoryProps | PageProps
> = ({
  category,
  categoryName,
  categories: data,
  subCategories,
  sidebarLayout,
  algolia,
  type,
}) => {
  // State and hooks
  const router = useRouter();
  const isShowSidebar = useAppState("isSidebarShow");
  const [isAlreadyCategorized, setIsAlreadyCategorized] = useState(false);
  const [currentSlug, setCurrentSlug] = useState<string[] | string>("");
  const isSidebarSticky = useAppState("isSidebarSticky");
  const { isOpen, onModalOpen, onModalClose } = useSpringModal();
  const { pathname, query } = router;

  {
    /* INFO: Constants */
  }
  const selectedQueries = query.category;
  const showCategoryWalker =
    router.pathname === "/" || router.pathname === "/products-on-sale";

  // Handlers
  const onCategoryClick = (slug: string) => {};

  return (
    <React.Fragment>
      <MobileOnly>
        <Sticky top={50}>
          {/* Spring modal */}
          {/* <SpringModal isOpen={isOpen} onRequestClose={() => onModalClose()}>
            <RenderSidebar
              sidebarLayout={sidebarLayout}
              category={category}
              subCategories={subCategories}
              categoryName={categoryName}
              parentCategories={data}
              onCategoryClick={onCategoryClick}
              selectedQueries={selectedQueries}
              algolia={algolia}
            />
          </SpringModal> */}
        </Sticky>
      </MobileOnly>

      <DesktopOnly>
        {!isShowSidebar ? (
          <Sticky enabled={isSidebarSticky} top={110}>
            <Scrollbar
              style={{ height: "100%", maxHeight: "100%" }}
              options={{
                scrollbars: {
                  visibility: "hidden",
                },
              }}
            >
              <RenderSidebar
                sidebarLayout={sidebarLayout}
                category={category}
                subCategories={subCategories}
                categoryName={categoryName}
                parentCategories={data}
                onCategoryClick={onCategoryClick}
                selectedQueries={selectedQueries}
                algolia={algolia}
              />
            </Scrollbar>
          </Sticky>
        ) : (
          <Scrollbar
            style={{ height: "100%", maxHeight: "100%" }}
            options={{
              scrollbars: {
                visibility: "hidden",
              },
            }}
          >
            <RenderSidebar
              sidebarLayout={sidebarLayout}
              category={category}
              subCategories={subCategories}
              categoryName={categoryName}
              parentCategories={data}
              onCategoryClick={onCategoryClick}
              selectedQueries={selectedQueries}
              algolia={algolia}
            />
          </Scrollbar>
        )}
      </DesktopOnly>
    </React.Fragment>
  );
};
