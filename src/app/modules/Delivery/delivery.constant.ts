export const DeliveryRegistrationStatus = [
  'started',
  'pendingForPickUp',
  'pickUped',
  'delivering',
  'delivered',
  'canceled',
];

export const DeliveryStatus = {
  started: 'started',
  pendingForPickUp: 'pendingForPickUp',
  pickUped: 'pickUped',
  delivering: 'delivering',
  delivered: 'delivered',
  canceled: 'canceled',
} as const;
