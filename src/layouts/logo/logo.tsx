import React from 'react';
import Router from 'next/router';
import { LogoBox, LogoImage, LogoImageMobile } from './logo.style';
import { useMedia } from 'utils/use-media';
import Link from 'next/link'
import { useBreakpointValue } from '@chakra-ui/react';

type LogoProps = {
  imageUrl: string;
  alt: string;
  onClick?: () => void;
  isDesktopView?: boolean
};

const Logo: React.FC<LogoProps> = ({ imageUrl, alt, onClick }) => {
  const desktop = useMedia('(min-width: 992px)');
  const screenSize = useBreakpointValue({ base: 'mobile', md: 'desktop' })

  function onLogoClick() {
    Router.push('/');
    if (onClick) {
      onClick();
    }
  } 
  return (
    <Link href="/">
      <a>
        <LogoBox>
          <LogoImage style={{ maxWidth: screenSize === 'desktop' ? 150 : 120 }} src={imageUrl} alt={alt} />
        </LogoBox>
      </a>
    </Link>
  );
};

export default Logo;
