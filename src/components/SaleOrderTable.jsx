import React from "react";
import { Table, Tr, Th, Td, Thead, Tbody, Button } from "@chakra-ui/react";

function SaleOrderTable({ status, orders, onEdit }) {
  if (!orders) return <div>Loading...</div>;

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Order ID</Th>
          <Th>Customer</Th>
          <Th>Date</Th>
          <Th>Status</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => (
          <Tr key={order.id}>
            <Td>{order.id}</Td>
            <Td>{order.customer_id}</Td>
            <Td>{new Date(order.invoice_date).toLocaleDateString()}</Td>
            <Td>{order.paid ? "Completed" : "Active"}</Td>
            <Td>
              <Button onClick={() => onEdit(order)}>...</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default SaleOrderTable;
