import { Request } from 'express';
import Product from '../database/models/Product';

// create a product and return it

export function createProduct(req: Request) {
  return Product.create({
    attributes: { exclude: ['created_at', 'update_at'] },
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    pictures: req.body.pictures,
    category_id: req.body.category_id,
  }, {
    fields: ['title', 'price', 'description', 'pictures', 'category_id'],
  });
}

// update a product according to the id and return it

export function updateProduct(req: Request) {
  return Product.update(req.body, {
    where: {
      id: req.params.id,
    },
    validate: true,
  });
}

// delete a product according to the id and return it

export function deleteProduct(req: Request) {
  return Product.destroy({
    where: {
      id: req.params.id,
    },
  });
}
