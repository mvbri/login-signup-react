import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";

export const useFetchUserOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await axiosInstance.get(`/api/orders/`);
      if (res.status === 200) {
        const orders = res.data.data;

        setOrders(orders);
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { orders, setOrders };
};
