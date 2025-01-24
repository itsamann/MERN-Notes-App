import React from "react";
import { Container, Flex, HStack, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaRegPlusSquare, FaMoon, FaRegSun } from "react-icons/fa";
import { useColorMode } from "./ui/color-mode";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textStyle="2xl"
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button aria-label="Toggle color mode" size="md" variant="outline">
              <FaRegPlusSquare fontSize={20} />
            </Button>
          </Link>
          <Button
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
            size="md"
            variant="outline"
          >
            {colorMode === "light" ? <FaMoon /> : <FaRegSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
