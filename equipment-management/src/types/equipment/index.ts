import { TablePaginationConfig } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { Dayjs } from 'dayjs';

export interface Equipment {
  id: string;
  model: string;
  brand: string;
  weight: string;
  manufactureDate: string | Dayjs;
  [key: string]: any;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}
export const dateFormat = 'YYYY-MM-DD';
