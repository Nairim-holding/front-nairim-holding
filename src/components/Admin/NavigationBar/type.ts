import { ParamValue } from 'next/dist/server/request/params';

export interface NavigationBarProps {
  formComplete?: boolean;
  allEnabled?: boolean;
  path: "cadastrar" | "visualizar" | "editar";
  id?: ParamValue;
}
