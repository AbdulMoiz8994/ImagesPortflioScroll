import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Stack, Skeleton, SimpleGrid } from "@chakra-ui/react";
import disableScroll from "disable-scroll";
import LeftNav from './LeftNav';
import RightNav from "./RightNav";

const ReactImageGallery = ({ product, loading }) => {
  if (loading)
    return (
      <Stack w="full">
        <Skeleton height="300px" width="full" />
        <SimpleGrid columns={2} spacing={2}>
          <Skeleton height="100px" />
          <Skeleton height="100px" />
        </SimpleGrid>
      </Stack>
    );

  return (
    <ImageGallery
      // items={images}
      items={product.images.map(image => ({
        original: image.src,
        thumbnail: image.src,
      }))}
      thumbnailPosition="bottom"
      showPlayButton={false}
      onScreenChange={e => (e ? disableScroll.on() : disableScroll.off())}
      showNav={true}
      disableThumbnailScroll={false}
      renderLeftNav={(onClick, disabled) => <LeftNav onClick={onClick} disabled={disabled} />}
      renderRightNav={(onClick, disabled) => <RightNav onClick={onClick} disabled={disabled} />}
      // originalClass={styles.image}
      // thumbnailClass={styles.image}
    />
  );
};

export default ReactImageGallery;
