import api from "./api";

export const findAll = async () => {
  return await api.get("/product");
};

export const create = async (product) => {
  return await api.post("/product", product);
};

export const update = async (product) => {
  return await api.put("/product", product);
};

export const deletet = async (id) => {
  return await api.delete(`product/${id}`);
};