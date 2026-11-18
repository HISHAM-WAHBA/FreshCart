import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../Services/Orders-service";

export default function useOrders() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: getUserOrders,
  });

  return {
    orders: data?.data?.data || [],
    isLoading,
    isError,
    error,
    refetch,
  };
}
