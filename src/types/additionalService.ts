import { ServiceType } from "../enums/serviceType";

export interface AdditionalService {
  type: ServiceType;
  name: string;
  price: number;
}
