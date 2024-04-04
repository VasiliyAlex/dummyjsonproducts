import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "../types/types";

export const getProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get("https://dummyjson.com/products?limit=100"),
    select: (response: { data: { products: IProduct[]; }; }) => {
      const products: IProduct[] = response.data.products;
      return products;
    },
  });
};
