import { apiClient } from "../Utils/ApiClient";

export async function addProductToCart({ id }) {
  const options = {
    method: "Post",
    url: `/cart`,
    data: {
      productId: id,
    },
  };
  return apiClient.request(options);
}

export async function getCartItems() {
  const options = {
    method: "GET",
    url: `/cart`,
  };
  return apiClient.request(options);
}

export async function removeItemFromCart({ id }) {
  const options = {
    method: "DELETE",
    url: `/cart/${id}`,
  };
  return apiClient.request(options);
}

export async function updateProductQuantity({ id, count }) {
  const options = {
    method: "Put",
    url: `/cart/${id}`,
    data: {
      count,
    },
  };
  return apiClient.request(options);
}

export async function ClearCart() {
  const options = {
    method: "DELETE",
    url: `/cart`,
  };
  return apiClient.request(options);
}
