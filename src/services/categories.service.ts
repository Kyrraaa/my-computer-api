import { Request } from 'express';
import Category from '../database/models/Category';

// create a category and return it

export function createCategory(req: Request) {
  return Category.create({
    attributes: { exclude: ['created_at', 'update_at'] },
    title: req.body.title,
    description: req.body.description,
  }, {
    fields: ['title', 'description'],
  });
}

// update a category according to the id and return it

export function updateCategory(req: Request) {
  return Category.update(req.body, {
    where: {
      id: req.params.id,
    },
    validate: true,
  });
}

// delete a category according to the id and return it

export function deleteCategory(req: Request) {
  return Category.destroy({
    where: {
      id: req.params.id,
    },
  });
}
