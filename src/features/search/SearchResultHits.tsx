import { connectHits } from "react-instantsearch-dom";
import {
  Box,
  HStack,
  Image,
  Stack,
  Text,
  Container,
  Wrap,
} from "@chakra-ui/react";
import currencyFormatter from "currency-formatter";
import { extractProductCatAndProd } from "utils/extractProductLink";
import { FC } from "react";
import Link from 'next/link'

const Hits: FC<any> = ({ hits, onSubmit }) => {
  return (
    <>
      {hits.length > 0 ? (
        hits
          .filter((hit) => hit.status === "publish")
          .slice(0, 6)
          .map((item) => {
            const { category, product } = extractProductCatAndProd(
              item.permalink
            );

            return (
              <>
              <Link href={`/${category}/${product}`} passHref>
                <Box
                  as="a"
                  key={item.name}
                  cursor="pointer"
                  userSelect="none"
                  p="2"
                  rounded="md"
                  onClick={() => onSubmit(`/${category}/${product}`)}
                >
                  <HStack>
                    <Image
                      w={{ base: "10", md: "16" }}
                      h={{ base: "10", md: "16" }}
                      src={item.images?.[0]?.src}
                      rounded="full"
                      border="1px"
                      objectFit="cover"
                      borderColor="gray.300"
                    />
                    <Stack spacing="1" w="full" justify="space-between">
                      <Text fontWeight="bold" key={item.name}>
                        {item.name}
                      </Text>
                      <Text
                        color={"gray"}
                        noOfLines={2}
                        dangerouslySetInnerHTML={{
                          __html: item.short_description,
                        }}
                      />
                      <Wrap justify="space-between">
                        {/* Translations:: 'Κωδικός Προϊόντος' --> 'SKU' */}
                        <Text color="GrayText">Κωδικός Προϊόντος: {item.sku}</Text>
                        {item.price > '0' && <Text fontSize="16" fontWeight="bold">
                          € {currencyFormatter.format(item.price, {})}
                        </Text>}
                      </Wrap>
                    </Stack>
                  </HStack>
                </Box>
              </Link>
              <hr />
              </>
            );
          })
      ) : (
        <Container centerContent py="3">
          No product found!
        </Container>
      )}
    </>
  );
};

export const SearchResultHits = connectHits(Hits);
