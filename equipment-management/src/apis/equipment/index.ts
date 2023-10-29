import { Equipment } from '@/types/equipment';
import axios from '@/utils/request';

const equipmentAPI = '/equipments';

export const query = (): Promise<Equipment[]> => axios.get(equipmentAPI);

export const detail = (id: string): Promise<Equipment> => axios.get(`${equipmentAPI}/${id}`);

export const create = (equipment: Equipment): Promise<Equipment> =>
  axios.post(equipmentAPI, equipment);

export const update = (id: string, equipment: Equipment) =>
  axios.put(`${equipmentAPI}/${id}`, equipment);

export const patch = (id: string, equipment: Equipment) =>
  axios.patch(`${equipmentAPI}/${id}`, equipment);

export const deleteItem = (id: string) => axios.delete(`${equipmentAPI}/${id}`);

export default {
  query,
  detail,
  create,
  update,
  patch,
  deleteItem,
};
