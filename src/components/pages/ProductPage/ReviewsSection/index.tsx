import {
  Box,
  Heading,
  Wrap,
  SimpleGrid,
  Text,
  HStack,
  Button,
  Alert,
  AlertIcon,
  Checkbox,
  Flex,
  FormControl,
  Textarea,
  Stack,
  FormLabel,
  Input,
  Image,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import React, { useEffect, useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import { Progress } from "@chakra-ui/progress";
import { createProductReview } from "services/products";
import StarsRating from "components/common/StarsRating";
import axios from "axios";
import WooCommerce from "lib/woocommerce";
import {
  consumerKey,
  consumerSecret,
  siteURL,
} from "site-settings/site-credentials";
import RatingBox from "components/rating-box/rating-box";
import { FormattedMessage, useIntl } from "react-intl";
const ReviewsSection = ({ product }) => {
  const [userRatedStars, setUserRatedStars] = useState(0);
  const intl = useIntl()
  const [ratings, setRatings] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userReview, setUserReview] = useState("");
  const [userName, setUserName] = useState("");
  const [advantages, setAdvantages] = useState("");
  const [disadvantages, setDisAdvantages] = useState("");
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [zeroStar, setZeroStar] = useState(0);
  const [oneStar, setOneStar] = useState(0);
  const [twoStar, setTwoStar] = useState(0);
  const [threeStar, setThreeStar] = useState(0);
  const [fourStar, setFourStar] = useState(0);
  const [fiveStar, setFiveStar] = useState(0);

  const [averageOfRatings, setAverageOfRatings] = useState(0);

  async function getReviews() {
    
    const id = product.id;
    const { data } = await axios.get(
      `${siteURL}/wp-json/wc/v3/products/reviews?product=${product.id}&consumer_secret=${consumerSecret}&consumer_key=${consumerKey}`
    );
    setRatings(data);

    // console.log("Logged By Winepine", data);
  }
  useEffect(() => {
    getReviews();
  }, []);
  const handleReviewSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    const template = `
       Review: ${userReview}
       ${advantages && `Advantages: ${advantages}`}
       ${disadvantages && `Disadvantages: ${disadvantages}`}
       `;

    const data = {
      product_id: product.id,
      // review: userReview,
      review: template,
      reviewer: userName,
      reviewer_email: userEmail,
      rating: userRatedStars,
    };
    setRatings([
      {
        reviewer_avatar_urls: {
          "48": "https://secure.gravatar.com/avatar/f06d215e10e7308895100822e9a23b86?s=48&d=mm&r=g",
        },
        ...data,
      },
      ...ratings,
    ]);
    await createProductReview(data);
    setTimeout(() => {
      setIsLoading(false);
      setIsReviewSubmitted(true);
    }, 2000);

    setTimeout(() => {
      setIsReviewSubmitted(false);
    }, 5000);

    setUserRatedStars(0);
    setUserReview("");
    setAdvantages("");
    setDisAdvantages("");
    setUserName("")
    setUserEmail("")
  };

  useEffect(() => {
    // First check if ratings are there
    if (ratings.length === 0) return;

    // Update the star rating count
    let zeroStar = 0;
    let oneStar = 0;
    let twoStar = 0;
    let threeStar = 0;
    let fourStar = 0;
    let fiveStar = 0;
    ratings.forEach(singleRating => {
      if (singleRating.rating === 0) {
        // setZeroStar(s => s + 1)
        zeroStar++
      } else if (singleRating.rating === 1) {
        // setOneStar(s => s + 1);
        oneStar++
      } else if (singleRating.rating === 2) {
        // setTwoStar(s => s + 1);
        twoStar++
      } else if (singleRating.rating === 3) {
        // setThreeStar(s => s + 1);
        threeStar++
      } else if (singleRating.rating === 4) {
        // setFourStar(s => s + 1);
        fourStar++
      } else if (singleRating.rating === 5) {
        // setFiveStar(s => s + 1);
        fiveStar++
      }
      setZeroStar(zeroStar);
      setOneStar(oneStar)
      setTwoStar(twoStar)
      setThreeStar(threeStar)
      setFourStar(fourStar)
      setFiveStar(fiveStar)
    });

    // Count the average
    const allRatings = ratings.map(rating => rating.rating);

    let sumOfAllRatings = 0;
    for (const count of allRatings) {
      sumOfAllRatings = sumOfAllRatings + count;
    }  
    const averageOfRating = sumOfAllRatings / ratings.length
    setAverageOfRatings(averageOfRating);
  }, [ratings])


  return (
    <Box
      px={{ base: "5", md: "16" }}
      rounded="md"
      shadow="md"
      border="1px"
      // bg="gray.50"
      bg="white"
      borderColor="gray.100"
      w="full"
      mx="2"
      my={10}
      py={10}
    >
      {/* <StarIcon w="5" h="3" mb={3} /> */}
      <Heading
        my={5}
        display="inline-block"
        fontSize="22"
        fontWeight="500"
        as="h2"
      >
        <FormattedMessage 
          id="ProductPage.Ratings"
          defaultMessage="Ratings"
        />
      </Heading>
      <hr></hr>
      <Heading
        my={5}
        display="inline-block"
        fontSize="26"
        fontWeight="900"
        as="h1"
      >
        <FormattedMessage 
          id="ProductPage.ShareYourExperience"
          defaultMessage="Share Your Experiences"
        />
      </Heading>
      <Text>
        {/* Write a review for <b>{product.name}</b> and help other users
        significantly! */}
        <FormattedMessage
          id="ProductPage.reviewdetails"
          defaultMessage="Write a review for this product and help other users"
          values={{ productName: product.name }}
        />
      </Text>
      <hr />
      <Wrap spacing="0" flex="3">
        <SimpleGrid
          py="5"
          spacing={5}
          alignItems="center"
          justifyContent="center"
          columns={{ base: 1, md: 3 }}
          w="full"
          fontSize="16"
        >
          <Box textAlign="center">
            <Text>
              {/* {averageOfRatings} out of 5 */}
              {averageOfRatings} από 5 
            </Text>
          </Box>
          {
            //Ratings Start Here
          }
          <Box textAlign="center">
            <HStack>
              <HStack align="center" justify="center">
                <StarIcon color="orange" />
                <StarIcon color="orange" />
                <StarIcon color="orange" />
                <StarIcon color="orange" />
                <StarIcon color="orange" />
              </HStack>
              <Box flex="10" borderRadius="5px">
                <Progress value={0} />
              </Box>
              <Box flex="1">{fiveStar}</Box>
            </HStack>
            <HStack>
              <HStack>
                <StarIcon color="orange" />
                <StarIcon color="orange" />
                <StarIcon color="orange" />
                <StarIcon color="orange" />
                <StarIcon color="gray.200" />
              </HStack>
              <Box flex="10" borderRadius="5px">
                <Progress value={0} />
              </Box>
              <Box flex="1">{fourStar}</Box>
            </HStack>
            <HStack>
              <HStack>
                <StarIcon color="orange" />
                <StarIcon color="orange" />
                <StarIcon color="orange" />
                <StarIcon color="gray.200" />
                <StarIcon color="gray.200" />
              </HStack>
              <Box flex="10" borderRadius="5px">
                <Progress value={0} />
              </Box>
              <Box flex="1">{threeStar}</Box>
            </HStack>
            <HStack>
              <HStack>
                <StarIcon color="orange" />
                <StarIcon color="orange" />
                <StarIcon color="gray.200" />
                <StarIcon color="gray.200" />
                <StarIcon color="gray.200" />
              </HStack>
              <Box flex="10" borderRadius="5px">
                <Progress value={0} />
              </Box>
              <Box flex="1">{twoStar}</Box>
            </HStack>
            <HStack>
              <HStack>
                <StarIcon color="orange" />
                <StarIcon color="gray.200" />
                <StarIcon color="gray.200" />
                <StarIcon color="gray.200" />
                <StarIcon color="gray.200" />
              </HStack>
              <Box flex="10" borderRadius="5px">
                <Progress value={0} />
              </Box>
              <Box flex="1">{oneStar}</Box>
            </HStack>
            <HStack>
              <HStack>
                <StarIcon color="gray.200" />
                <StarIcon color="gray.200" />
                <StarIcon color="gray.200" />
                <StarIcon color="gray.200" />
                <StarIcon color="gray.200" />
              </HStack>
              <Box flex="10" borderRadius="5px">
                <Progress value={0} />
              </Box>
              <Box flex="1">{zeroStar}</Box>
            </HStack>
          </Box>
          <Box textAlign="center">
            <Button size="sm" shadow="lg" colorScheme="primary">
              <FormattedMessage id="ProductPage.writeareview" defaultMessage="Write a review" />
            </Button>
          </Box>
        </SimpleGrid>
      </Wrap>

      <chakra.form onSubmit={handleReviewSubmit}>
        <Stack>
          {ratings.length === 0 && (
            <Text fontSize="18" mb={8} mt={5}>
              <FormattedMessage id="ProductPage.noreviews" defaultMessage="There are no reviews for this product yet" />
            </Text>
          )}
          <Box borderRadius="2%">
            {ratings.map((rating, i) => {
              if (rating.product_id === product.id)
                return <RatingBox key={rating.product_id} ratings={rating} />;
            })}
          </Box>
          <Heading fontSize="xl"><FormattedMessage id="ProductPage.ReviewProduct" defaultMessage={"Review"} /> {`"${product.name}"`}</Heading>
          <Text fontSize="14" color="gray.400" pt={6}>
            <FormattedMessage 
              id="ProductPage.ReviewProductDetails"
              defaultMessage="Your email address will not be published. Required fields are marked
              with *"
            />
          </Text>

          <Wrap spacing={3}>
            <Text><FormattedMessage id="ProductPage.YourCriticism" defaultMessage="Your Criticism" /></Text>
            <StarsRating
              initialRating={userRatedStars}
              onChangeRating={rating => setUserRatedStars(rating)}
            />
          </Wrap>

          <FormControl isRequired pt="5">
            <FormLabel><FormattedMessage id="ProductPage.YourReview" defaultMessage="Your Review" /></FormLabel>
            <Textarea
              bg="white"
              borderColor="black"
              value={userReview}
              onChange={e => setUserReview(e.currentTarget.value)}
              colorScheme="primary"
            />
          </FormControl>
        </Stack>

        <Wrap flex="2" lineHeight={10} pt={2}>
          <SimpleGrid w="full" columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl>
              <Textarea
                borderColor="black"
                bg="white"
                value={advantages}
                onChange={e => setAdvantages(e.currentTarget.value)}
                placeholder={intl.formatMessage({ id: 'ProductPage.ReviewAdvantages', defaultMessage: "Advantages" })}
              />
            </FormControl>
            <FormControl>
              <Textarea
                borderColor="black"
                bg="white"
                value={disadvantages}
                onChange={e => setDisAdvantages(e.currentTarget.value)}
                placeholder={intl.formatMessage({ id: 'ProductPage.ReviewDisadvantages', defaultMessage: "Disadvantages" })}
              />
            </FormControl>
          </SimpleGrid>
        </Wrap>
        <FormControl isRequired my="3">
          <FormLabel><FormattedMessage id="ProductPage.ReviewName" defaultMessage="Name" /></FormLabel>
          <Input
            value={userName}
            onChange={e => setUserName(e.currentTarget.value)}
            bg="white"
            type="text"
            colorScheme="primary"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel><FormattedMessage id="footer.emailTitle" defaultMessage="Email" /></FormLabel>
          <Input
            bg="white"
            value={userEmail}
            onChange={e => setUserEmail(e.currentTarget.value)}
            type="email"
          />
        </FormControl>
        <Checkbox defaultIsChecked pt={2} fontSize={17}>
          <FormattedMessage id="ProductPage.ReviewCheckbox" defaultMessage="Save my name, email, and site to this browser for next time I comment." />
        </Checkbox>
        <Box mt="5">
          <Button
            isLoading={isLoading}
            type="submit"
            colorScheme="primary"
            size="sm"
            fontWeight="semibold"
            shadow="xl"
          >
            <FormattedMessage id="ProductPage.Mission" defaultMessage="Mission" />
          </Button>
        </Box>
        {isReviewSubmitted && (
          <Alert status="success" my="5">
            <AlertIcon />
            <FormattedMessage id="alert.reviewSubmittedSuccessfully" defaultMessage="Review submitted successfully" />
          </Alert>
        )}
      </chakra.form>
    </Box>
  );
};

export default ReviewsSection;
