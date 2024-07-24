export const AddressRegistrationStatus = ['active', 'deleted', 'inactive'];

export const AddressStatus = {
  active: 'active',
  deleted: 'deleted',
  inactive: 'inactive',
} as const;
export const AddressType = {
  present: 'present',
  permanent: 'permanent',
  delivery: 'delivery',
  pickUp: 'pickUp',
} as const;
