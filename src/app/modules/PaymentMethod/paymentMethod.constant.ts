export const PaymentMethodRegistrationStatus = [
  'active',
  'inactive',
  'deleted',
];
export const PaymentMethodTypesEnum = ['mfs', 'bank', 'cashOnDelivery'];

export const PaymentMethodType = {
  mfs: 'mfs',
  bank: 'bank',
  cashOnDelivery: 'cashOnDelivery',
} as const;
