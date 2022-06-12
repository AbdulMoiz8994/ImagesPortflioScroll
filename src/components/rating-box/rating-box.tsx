import { Flex } from "@chakra-ui/react";
import { Image, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
const RatingBox = ({ ratings }) => {
  return (
    <>
      <Flex
        bg="white"
        my="5"
        p="5"
        border="1px rgba(0,0,0,0.1) solid"
        flexDirection="column"
        justifyContent="center"
      >
        <Flex>
          <Image
            borderRadius="50%"
            src={ratings.reviewer_avatar_urls["48"]}
            alt=""
          />
          <Flex ml="5" flexDirection="column" alignItems="space-between">
            <Flex>
              {[...Array(ratings.rating)].map((star, i) => (
                <StarIcon color="orange" />
              ))}
            </Flex>

            <Text mt="2">
              <b>{ratings.reviewer}</b> on&nbsp;
              {ratings.date_created
                ? ratings.date_created.split("T")[0]
                : `Today`}
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Text
            mt="5"
            fontWeight="600"
            dangerouslySetInnerHTML={{ __html: ratings.review }}
          ></Text>
        </Flex>
      </Flex>
    </>
  );
};
export default RatingBox;
