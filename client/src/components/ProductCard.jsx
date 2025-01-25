import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";

import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");

  const { deleteProduct } = useProductStore();

  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      toaster.error({
        title: "Error",
        description: message,
        status: "error",
        isCloseble: true,
      });
    } else {
      toaster.success({
        title: "Success",
        description: message,
        status: "success",
        isCloseble: true,
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bgColor}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />

      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontSize={"xl"} fontWeight={"bold"} color={textColor} mb={2}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            as={FaRegEdit}
            aria-label="Edit product"
            bg="blue.500"
            _hover={{ bg: "blue.600" }}
            p={2.5}
            minW="40px"
            borderRadius="md"
          />

          <IconButton
            as={MdDelete}
            aria-label="Delete product"
            bg="red.500"
            _hover={{ bg: "red.600" }}
            p={2.5}
            minW="40px"
            borderRadius="md"
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
