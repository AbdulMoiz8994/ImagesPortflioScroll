import React from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SliderNav } from './banner.style';
import { ArrowNext } from 'assets/icons/ArrowNext';
import { ArrowPrev } from 'assets/icons/ArrowPrev';
import styled from 'styled-components';
import { Box } from '@chakra-ui/react';
import NextImage from 'next/image';

interface Props {
  data: any[] | undefined;
}

SwiperCore.use([Navigation]);

const ImageWrapper = styled.div({
  position: 'relative',

  img: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },

  '@media (max-width: 575px)': {
    minHeight: 180,

    img: {
      height: 180,
      objectPosition: 'left',
      objectFit: 'cover',
    },
  },
});

const Banner = ({ data }: Props) => {
  return (
    <Swiper
      id='banner'
      slidesPerView={1}
      loop={true}
      navigation={{
        nextEl: '.banner-slider-next',
        prevEl: '.banner-slider-prev',
      }}
      style={{ marginBottom: 20, minHeight: 180 }}
    >
      {data.map((item, idx) => (
        <SwiperSlide key={idx}>
          {/* <ImageWrapper> */}
            {/* <img src={item.img} alt={item.alt} /> */}
            <Box w="full" h={{ base: "10rem", md: "10rem", lg: "10rem", xl: "20rem" }} position="relative">
              <NextImage 
                src={item.img} 
                layout="fill"
                objectFit="contain"
              />
            </Box>
            {/* <Box w="full" h="full" bg="red">
              checking
            </Box> */}
          {/* </ImageWrapper> */}
        </SwiperSlide>
      ))}
      <SliderNav className='banner-slider-next'>
        <ArrowNext />
      </SliderNav>
      <SliderNav className='banner-slider-prev'>
        <ArrowPrev />
      </SliderNav>
    </Swiper>
  );
};
export default Banner;
