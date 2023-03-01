import { Request } from 'express';
import Order from '../database/models/Order';

// create an order and return it

export function createOrder(req: Request) {
  return Order.create({
    attributes: { exclude: ['created_at', 'update_at'] },
    price: req.body.price,
    user_id: req.body.user_id,
  }, {
    fields: ['price', 'user_id'],
  });
}

// update an order according to the id and return it

export function updateOrder(req: Request) {
  return Order.update(req.body, {
    where: {
      id: req.params.id,
    },
    validate: true,
  });
}

// delete an order according to the id and return it

export function deleteOrder(req: Request) {
  return Order.destroy({
    where: {
      id: req.params.id,
    },
  });
}
