import { AlgoliaProps } from "components/sidebar/props";
import { SidebarWithCardMenu } from "layouts/sidebar/sidebar-with-card-menu";
import React, { FC } from "react";

interface Props {
  sidebarLayout: "childCategory" | "parentCategory" | "page";
  category: any;
  subCategories: any[];
  categoryName: string;
  algolia: AlgoliaProps;
}
const RenderSideBar: FC<Props> = ({
  sidebarLayout,
  category,
  categoryName,
  subCategories,
  algolia
}) => {
  if (sidebarLayout === "page")
    return <SidebarWithCardMenu sidebarLayout={"page"} algolia={algolia} />;

  if (sidebarLayout === "childCategory")
    return (
      <SidebarWithCardMenu
        sidebarLayout={"childCategory"}
        category={category}
        subCategories={subCategories}
        categoryName={categoryName}
        algolia={algolia}
      />
    );

  return null;
};

export default RenderSideBar;
