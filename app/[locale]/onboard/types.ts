export type Address = {
  street: string;
  province: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
};

export type UserData = {
  name: string;
  email: string;
  titleEn: string;
  titleFr: string;
  department: string;
  address: Address;
  supervisor: string;
  team: string;
};
