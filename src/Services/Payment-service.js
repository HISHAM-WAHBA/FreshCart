import { apiClient } from "../Utils/ApiClient";

export async function createOrder({ paymentMethod, cartId, shippingAddress }) {
  const options = {
    method: "POST",
    data: {
      shippingAddress,
    },
  };

  if (paymentMethod == "cod") {
    options.url = `/orders/${cartId}`;
  } else if (paymentMethod == "online") {
    options.url = `/orders/checkout-session/${cartId}?url=${window.location.origin}`;
  }

  return apiClient.request(options);
}
