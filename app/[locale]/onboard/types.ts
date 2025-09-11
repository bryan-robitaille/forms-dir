export type OnboardUserData = {
  name: string;
  email: string;
  titleEn: string;
  titleFr: string;
  department: string;
  address: {
    street: string;
    province: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  supervisor: string;
  team: string;
};
