import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import SaleOrderTable from "../components/SaleOrderTable";
import SaleOrderForm from "../components/SaleOrderForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchActiveOrders, createSaleOrder, updateSaleOrder } from "../api";

function ActiveOrdersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const queryClient = useQueryClient();

  const { data: activeOrders, refetch } = useQuery({
    queryKey: ["activeOrders"],
    queryFn: fetchActiveOrders,
  });

  const createMutation = useMutation({
    mutationFn: createSaleOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["activeOrders"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSaleOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["activeOrders"]);
    },
  });

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const handleSaveOrder = (data) => {
    if (selectedOrder) {
      updateMutation.mutate({ ...selectedOrder, ...data });
    } else {
      createMutation.mutate(data);
    }
    handleCloseModal();
  };

  return (
    <Box>
      <Button onClick={() => handleOpenModal(null)}>+ Sale Order</Button>
      <SaleOrderTable
        status="active"
        orders={activeOrders}
        onEdit={handleOpenModal}
      />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedOrder ? "Edit Sale Order" : "Create Sale Order"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SaleOrderForm
              order={selectedOrder}
              onClose={handleCloseModal}
              onSave={handleSaveOrder}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ActiveOrdersPage;
