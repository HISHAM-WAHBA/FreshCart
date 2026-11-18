import { apiClient } from "../Utils/ApiClient";

export async function getUserOrders() {
  const options = {
    method: "GET",
    url: "/orders",
  };
  return apiClient.request(options);
}

export async function getOrderById({ id }) {
  const options = {
    method: "GET",
    url: `/orders/${id}`,
  };
  return apiClient.request(options);
}
