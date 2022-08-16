enum OrderStatus {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  CANCELED = 'CANCELED',
  DELIVERED = 'DELIVERED',
}

export interface OrderDto {
  id: number;
  status: OrderStatus;
  userId: number;
  amount: number;
}
