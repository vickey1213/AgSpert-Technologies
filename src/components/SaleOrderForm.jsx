import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, VStack, Select as ChakraSelect } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select } from "chakra-react-select";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomers, fetchProducts } from "../api";

function SaleOrderForm({ order, onClose, onSave }) {
  const { control, handleSubmit } = useForm({
    defaultValues: order || {
      customer_id: "",
      items: [],
      paid: false,
      invoice_no: "",
      invoice_date: new Date(),
    },
  });

  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const onSubmit = (data) => {
    data.invoice_date = new Date(data.invoice_date).toISOString(); // Ensure date is serialized correctly
    onSave(data);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <Controller
          name="invoice_date"
          control={control}
          render={({ field }) => (
            <DatePicker selected={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          name="customer_id"
          control={control}
          render={({ field }) => (
            <ChakraSelect placeholder="Select Customer" {...field}>
              {customers &&
                customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
            </ChakraSelect>
          )}
        />
        <Controller
          name="items"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              options={
                products &&
                products.map((product) => ({
                  label: product.name,
                  value: product.id,
                }))
              }
              placeholder="Select Products"
            />
          )}
        />
        <Button type="submit">Save</Button>
      </VStack>
    </Box>
  );
}

export default SaleOrderForm;
