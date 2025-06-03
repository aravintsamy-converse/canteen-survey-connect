export interface EquipmentContextType {
  eqpId: string;
  setEqpId: (eqpId: string) => void;
}

export interface EquipmentDetails {
  name: string;
  address1_line1: string;
  address1_city: string;
  address1_stateorprovince: string;
  address1_postalcode: string;
}
