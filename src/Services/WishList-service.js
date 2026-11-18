import { apiClient } from "../Utils/ApiClient";

export async function addProductToWishList({ id }) {
  const options = {
    method: "Post",
    url: `/wishlist`,
    data: {
      productId: id,
    },
  };
  return apiClient.request(options);
}

export async function getWishListItems() {
  const options = {
    method: "GET",
    url: `/wishlist`,
  };
  return apiClient.request(options);
}

export async function removeItemFromWishList({ id }) {
  const options = {
    method: "DELETE",
    url: `/wishlist/${id}`,
  };
  return apiClient.request(options);
}
