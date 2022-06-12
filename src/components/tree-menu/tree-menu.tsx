import React, { useState, useEffect, useContext } from "react";
import { usePrevious, useMeasure } from "utils/hooks";
import { useSpring, animated } from "react-spring";
import {
  Frame,
  Title,
  Content,
  Header,
  IconWrapper,
  SubCategoryHeader,
  ModalHeader,
} from "./tree-menu.style";
import { Button } from "components/button/button";
import { ArrowNext } from "assets/icons/ArrowNext";
import { ArrowPrev } from "assets/icons/ArrowPrev";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";

import * as icons from "assets/icons/category-icons";
import { useDisclosure } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
const Tree = React.memo(
  ({
    children,
    name,
    icon,
    // isOpen,
    onClick,
    dropdown,
    onToggleBtnClick,
    depth,
    defaultOpen = false,
  }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const previous = usePrevious(isOpen);
    const [bind, { height: viewHeight }] = useMeasure();
    const { height, opacity, transform } = useSpring<any>({
      from: { height: 0, opacity: 0, transform: "translate3d(20px,0,0)" },
      to: {
        height: isOpen ? viewHeight : 0,
        opacity: isOpen ? 1 : 0,
        transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`,
      },
    });
    const screenSize = useBreakpointValue({ base: 'mobile', md: 'desktop' })
    // const Icon = icon ? Icons[icon] : depth === 'child' ? Icons['Minus'] : null;
    // const Icon = icon ? Icons[icon] : null;
    const Icon = ({ iconName, style }: { iconName: any; style?: any }) => {
      const TagName = icons[iconName];
      return !!TagName ? (
        <TagName style={style} />
      ) : (
        <p>Invalid icon {iconName}</p>
      );
    };
    return (
      <Frame depth={depth}>
        <Header open={isOpen} depth={depth} className={depth}>

          {dropdown === true ? (
            <>
              <Title onClick={onOpen}>{name}</Title>
              <Button onClick={onOpen} variant="text" className="toggleButton">
                <ArrowNext width="16px" />
              </Button>
            </>) : <Title onClick={onClick}>{name}</Title>
          }
        </Header>
        <Content
          style={{
            opacity,
            height: isOpen && previous === isOpen ? "auto" : height,
          }}
        >
          <Drawer
            placement={"left"}
            onClose={onClose}
            isOpen={isOpen}
            size={screenSize === "mobile" ? "xs" : "sm"}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">
                <ModalHeader>
                  <Stack
                    spacing={2}
                    direction="row"
                    onClick={onClose}
                    className="main-category"
                  >
                    <ArrowPrev />
                    <p>
                      {name}
                    </p>
                  </Stack>
                </ModalHeader>
              </DrawerHeader>
              <DrawerBody>
                <SubCategoryHeader>
                  <Stack
                    spacing={4}
                    direction="row"
                    onClick={onClose}
                    className="main-category"
                  >
                    {/* <ArrowPrev /> */}
                    <p onClick={onClick}>
                      <FormattedMessage 
                        id="drawer.allProducts"
                        defaultMessage="All Products"
                      />
                    </p>
                  </Stack>
                </SubCategoryHeader>
                <animated.div
                  style={{ transform }}
                  {...bind}
                  children={children}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Content>
      </Frame>
    );
  }
);

type Props = {
  className?: any;
  data: any;
  onClick: (slug: string) => void;
  active: string | string[];
};
export const TreeMenu: React.FC<Props> = ({
  data,
  className,
  onClick,
  active,
}) => {
  const handler = (children) => {
    return children.map((subOption) => {
      if (!subOption.children) {
        return (
          <Tree
            // key={subOption.title}
            key={subOption.id}
            name={subOption.title}
            icon={subOption.icon}
            depth="child"
            onClick={() => onClick(subOption.slug)}
            defaultOpen={active === subOption.slug}
          />
        );
      }
      return (
        <Tree
          // key={subOption.title}
          key={subOption.id}
          name={subOption.title}
          icon={subOption.icon}
          dropdown={!subOption.children.length ? false : true}
          depth="parent"
          onClick={() => onClick(subOption.slug)}
          defaultOpen={
            active === subOption.slug ||
            subOption.children.some((item) => item.slug === active)
          }
        >
          {handler(subOption.children)}
        </Tree>
      );
    });
  };
  return <>{handler(data)}</>;
};
