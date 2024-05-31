// src/api.js
import { customers, products, saleOrders } from "./data";

export const fetchCustomers = async () => {
  return customers;
};

export const fetchProducts = async () => {
  return products;
};

export const fetchActiveOrders = async () => {
  return saleOrders.filter((order) => !order.paid);
};

export const fetchCompletedOrders = async () => {
  return saleOrders.filter((order) => order.paid);
};

export const createSaleOrder = async (order) => {
  const newOrder = { ...order, id: saleOrders.length + 1 };
  saleOrders.push(newOrder);
  return newOrder;
};

export const updateSaleOrder = async (updatedOrder) => {
  const index = saleOrders.findIndex((order) => order.id === updatedOrder.id);
  if (index !== -1) {
    saleOrders[index] = updatedOrder;
  }
  return updatedOrder;
};
