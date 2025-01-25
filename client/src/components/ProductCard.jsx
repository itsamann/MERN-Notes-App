import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";
import { Field } from "../components/ui/field"; // Adjust the path as needed

import { useDisclosure } from "@chakra-ui/react";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
} from "../components/ui/dialog";

import {
  Box,
  Heading,
  HStack,
  IconButton,
  Button,
  Stack,
  Image,
  Text,
  Input,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useState, useEffect, useRef } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const { onOpen, onClose } = useDisclosure();

  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

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

  const handleUpdateProduct = async (productId, updateProduct) => {
    const { success, message } = await updateProduct(productId, updatedProduct);
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
        description: "Product updated successfully.",
        status: "success",
        isCloseble: true,
      });
      onClose();
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
      <DialogRoot initialFocusEl={() => ref.current}>
        <Box p={4}>
          <Heading as={"h3"} size={"md"} mb={2}>
            {product.name}
          </Heading>
          <Text fontSize={"xl"} fontWeight={"bold"} color={textColor} mb={2}>
            ${product.price}
          </Text>

          <HStack spacing={2}>
            <DialogTrigger asChild>
              <IconButton
                as={FaRegEdit}
                onClick={onOpen} // Optionally keep onOpen here as well
                aria-label="Edit product"
                bg="blue.500"
                _hover={{ bg: "blue.600" }}
                p={2.5}
                minW="40px"
                borderRadius="md"
              />
            </DialogTrigger>

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

        <DialogContent>
          <DialogHeader>Update Product</DialogHeader>
          <DialogBody pb="4">
            <Stack gap="4">
              <Field label="Product Name">
                <Input
                  placeholder="Product Name"
                  name="name"
                  type="text"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Product Price">
                <Input
                  placeholder="Product Price"
                  name="price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Image URL">
                <Input
                  placeholder="Image URL"
                  name="image"
                  type="text"
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  }
                />
              </Field>
            </Stack>
          </DialogBody>
          <DialogFooter>
            <Button
              onClick={() => handleUpdateProduct(product._id, updateProduct)}
            >
              Update
            </Button>

            <DialogActionTrigger asChild>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default ProductCard;
