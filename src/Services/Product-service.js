import { apiClient } from "../Utils/ApiClient";

export async function getAllProducts({
  page,
  keyword,
  priceGreaterThan,
  priceLessThan,
  sortedBy,
  category,
  brand,
} = {}) {
  const params = [];
  if (page) params.push(`page=${page}`);
  if (keyword) params.push(`keyword=${keyword}`);
  if (priceGreaterThan) params.push(`price[gte]=${priceGreaterThan}`);
  if (priceLessThan) params.push(`price[lte]=${priceLessThan}`);
  if (sortedBy) params.push(`sort=${sortedBy}`);
  if (category) params.push(`category[in]=${category}`);
  if (brand) params.push(`brand=${brand}`);

  const options = {
    method: "GET",
    url: `/products${params.length ? `?${params.join("&")}` : ""}`,
  };
  return apiClient.request(options);
}

export async function getProductById({ id }) {
  const options = {
    method: "GET",
    url: `/products/${id}`,
  };
  return apiClient.request(options);
}
