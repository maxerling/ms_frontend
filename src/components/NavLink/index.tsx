import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Flex, Link, useColorModeValue } from "@chakra-ui/react";
interface INavLink {
  id: string;
  name: string;
  to: string;
  onClick?: () => void;
  type: string;
  typeOfButton?: string;
}
interface OwnProps {
  navLinks: INavLink[];
}

export const NavLink: React.FC<OwnProps> = ({ navLinks }) => {
  const linkColor = useColorModeValue("gray.500", "gray.200");

  return <Flex>{navLinks.map((ele) => getNavBarLink(ele, linkColor))}</Flex>;
};

function getNavBarLink(navLink: INavLink, linkColor: string) {
  if (navLink.type === "button") {
    return (
      <Box pr={4} key={navLink.id}>
        <Button
          variant={navLink.typeOfButton}
          colorScheme="yellow"
          onClick={() => {
            if (navLink.onClick !== undefined) {
              navLink.onClick();
            }
          }}
        >
          {navLink.name}
        </Button>
      </Box>
    );
  } else if (navLink.type === "link") {
    return (
      <Box pr={4} pt={2} key={navLink.id}>
        <Link
          color={linkColor}
          _hover={{
            textDecoration: "underline",
          }}
          fontSize={"sm"}
          fontWeight={400}
          as={RouterLink}
          to={navLink.to}
        >
          {navLink.name}
        </Link>
      </Box>
    );
  } else if (navLink.type === "actionLink") {
    return (
      <Box pr={4} pt={2} key={navLink.id}>
        <Link
          color={linkColor}
          _hover={{
            textDecoration: "underline",
          }}
          fontSize={"sm"}
          fontWeight={400}
          as={RouterLink}
          key={navLink.id}
          to={navLink.to}
          onClick={navLink.onClick}
        >
          {navLink.name}
        </Link>
      </Box>
    );
  } else if (navLink.type === "buttonLink") {
    return (
      <Box pr={4} key={navLink.id}>
        <Link
          as={RouterLink}
          to={navLink.to}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Button variant={navLink.typeOfButton} colorScheme="yellow">
            {navLink.name}
          </Button>
        </Link>
      </Box>
    );
  }
}
