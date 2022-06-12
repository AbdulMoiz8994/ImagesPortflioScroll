import React, { FC } from 'react';
import { BsChevronLeft } from 'react-icons/bs'
import { Icon } from "@chakra-ui/react"

const LeftNav:FC<any> = React.memo(({
  disabled,
  onClick,
}) => {
  return (
    <button
      type="button"
      className="image-gallery-icon image-gallery-left-nav"
      disabled={disabled}
      onClick={onClick}
      aria-label="Previous Slide"
    >
      <Icon as={BsChevronLeft} fontSize="5xl" />
    </button>
  );
});

LeftNav.displayName = 'LeftNav';

export default LeftNav;