import React from "react";
import { Link } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";
interface OwnProps {
  to: string;
}

export const Logo: React.FC<OwnProps> = ({ to }) => {
  return (
    <Box pl={4} pt={2}>
      <Heading size="md">
        <Link to={to}>Morning Star⭐</Link>
      </Heading>
    </Box>
  );
};
