import { GroupName } from "./Group";

export type Student = {
  id: string | number;
  name: string;
  lastName: string;
  nationality: string;
  group?: GroupName;
};
