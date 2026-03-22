import api from "../api/axios";

const getAllPredictions = async (): Promise<PredictionHistory[]> => {
  const res = await api.get("/predict");
  return res.data;
};

export default getAllPredictions;
