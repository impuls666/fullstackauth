import {
  Flex,
  Text,
  Icon,
  Link as ChakraLink,
  Menu,
  MenuButton,
} from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";

interface NavItemProps {
  icon: React.ElementType;
  title: string;
  description?: string;
  active?: boolean;
  navSize: "small" | "large";
  to?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  title,
  active,
  navSize,
  to,
}) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <ChakraLink
          as={ReactRouterLink}
          backgroundColor={active ? "#AEC8CA" : undefined}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={navSize === "large" ? "100%" : undefined}
          to={to}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#82AAAD" : "gray.500"}
              />
              <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </ChakraLink>
      </Menu>
    </Flex>
  );
};

export default NavItem;
