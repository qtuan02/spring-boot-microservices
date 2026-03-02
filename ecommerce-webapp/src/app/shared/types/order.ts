export type CreateOrderRequest = {
  customer: Customer;
  deliveryAddress: DeliveryAddress;
  items: Item[];
  totalAmount: number;
  taxAmount: number;
  finalAmount: number;
  comments?: string;
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
};

export type DeliveryAddress = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type Item = {
  code: string;
  name: string;
  price: number;
  quantity: number;
};

export type CreateOrderResponse = {
  orderNumber: string;
};
