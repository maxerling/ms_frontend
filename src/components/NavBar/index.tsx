import React from "react";
import * as S from "./styled";
import { Flex, Box, useColorModeValue } from "@chakra-ui/react";
interface OwnProps {}

export const NavBar: React.FC<OwnProps> = ({ children }) => {
  return (
    <Box
      pt={4}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
      pb={4}
    >
      <Flex>{children}</Flex>
    </Box>
  );
};
