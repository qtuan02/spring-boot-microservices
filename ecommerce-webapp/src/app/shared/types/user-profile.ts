export type UserProfile = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  
  // Extended profile fields for editing
  phone?: string;
  comments?: string;
  shippingAddress1?: string;
  shippingAddress2?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingCountry?: string;
  shippingZipCode?: string;
};
