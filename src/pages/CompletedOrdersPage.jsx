import React from "react";
import { Box } from "@chakra-ui/react";
import SaleOrderTable from "../components/SaleOrderTable";
import { useQuery } from "@tanstack/react-query";
import { fetchCompletedOrders } from "../api";

function CompletedOrdersPage() {
  const { data: completedOrders } = useQuery({
    queryKey: ["completedOrders"],
    queryFn: fetchCompletedOrders,
  });

  return (
    <Box>
      <SaleOrderTable status="completed" orders={completedOrders} />
    </Box>
  );
}

export default CompletedOrdersPage;
