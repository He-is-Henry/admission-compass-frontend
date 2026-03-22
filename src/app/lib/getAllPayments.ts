import api from "../api/axios";

const getAllPayments = async (): Promise<Payment[]> => {
  const res = await api.get("/pay");
  return res.data;
};

export default getAllPayments;
