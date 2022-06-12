import React, { FC } from 'react';
import { BsChevronRight } from 'react-icons/bs'
import { Icon } from "@chakra-ui/react"

const RightNav:FC<any> = React.memo(({
  disabled,
  onClick,
}) => {
  return (
    <button
      type="button"
      className="image-gallery-icon image-gallery-right-nav"
      disabled={disabled}
      onClick={onClick}
      aria-label="Next Slide"
    >
      <Icon as={BsChevronRight} fontSize="5xl" />
    </button>
  );
});

RightNav.displayName = 'RightNav';

export default RightNav;