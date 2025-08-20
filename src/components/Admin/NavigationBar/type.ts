import { ParamValue } from 'next/dist/server/request/params';

export interface NavigationBarProps {
  formComplete?: boolean;
  allEnabled?: boolean;
  id?: ParamValue;
  steps: {
    path: string;
    label: string;
    key: string;
    icon: number;
  }[]
}
