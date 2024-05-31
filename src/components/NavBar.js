import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Flex as="nav" p={4} bg="gray.700" color="white" justifyContent="center">
      <Button as={Link} to="/active-orders" mx={2} colorScheme="teal">
        Active Sales Orders
      </Button>
      <Button as={Link} to="/completed-orders" mx={2} colorScheme="teal">
        Completed Sales Orders
      </Button>
      <Button as={Link} to="/sales-orders" mx={2} colorScheme="teal">
        Sales Orders
      </Button>
    </Flex>
  );
}

export default NavBar;
