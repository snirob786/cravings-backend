export const OrderRegistrationStatus = [
  'started',
  'pendingForPickUp',
  'pickUped',
  'delivering',
  'delivered',
  'canceled',
];

export const OrderStatus = {
  started: 'started',
  pendingForPickUp: 'pendingForPickUp',
  pickUped: 'pickUped',
  delivering: 'delivering',
  delivered: 'delivered',
  canceled: 'canceled',
} as const;
