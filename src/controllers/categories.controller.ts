import { Response, Request } from 'express';
import { ValidationError, ValidationErrorItem } from 'sequelize';
import Category from '../database/models/Category';
import { createCategory, deleteCategory, updateCategory } from '../services/categories.service';
import Utils from '../utils/utils';

// function that check error and return validation and the product according to the id in json

async function getById(req: Request, res: Response) {
  return Category.findOne({ where: { id: req.params.id }, raw: true })
    .then((category: Category | null) => {
      if (category === null) {
        const jsonValidation = Utils.jsonValidationHandler(false, `The id ${req.params.id} does not exist or is no longer accessible`);
        res.status(400);
        return res.json(jsonValidation);
      }
      const jsonValidation = Utils.jsonValidationHandler(true, 'Operation successful');
      res.status(200);
      return res.json(Object.assign(jsonValidation, { category }));
    }).catch((error) => {
      console.log(error);
      res.status(400);
      res.json();
    });
}

// function that check error and return validation and the all products in json

async function getAll(req: Request, res: Response) {
  return Category.findAll({ raw: true })
    .then((categories: Category[]) => {
      const jsonValidation = Utils.jsonValidationHandler(true, 'Operation successful');
      const jsonCategories = { categories };
      res.status(200);
      return res.json(Object.assign(jsonValidation, jsonCategories));
    }).catch((error) => {
      const validationMessages: string[] = error.errors.map((e: ValidationErrorItem) => e.message);
      const jsonValidation = Utils.jsonValidationHandler(false, validationMessages);
      res.status(400);
      return res.json(jsonValidation);
    });
}

// function that check error and return the product created and validation

async function create(req: Request, res: Response) {
  return createCategory(req)
    .then((category: Category) => {
      const jsonValidation = Utils.jsonValidationHandler(true, 'Operation successful');
      const jsonCategory = { category: category.toJSON() };
      res.status(201);
      return res.json(Object.assign(jsonValidation, jsonCategory));
    }).catch((error) => {
      const validationMessages: string[] = error.errors.map((e: ValidationErrorItem) => e.message);
      const jsonValidation = Utils.jsonValidationHandler(false, validationMessages);
      res.status(400);
      return res.json(Object.assign(jsonValidation, error));
    });
}

// funtion that check error and return the validation or not for the update

async function updateById(req: Request, res: Response) {
  return updateCategory(req)
    .then((rows) => {
      res.status(200);
      const jsonValidation = Utils.jsonValidationHandler(true, `Operation successful, ${rows} line updated`);
      return res.json(jsonValidation);
    }).catch((error) => {
      if (error instanceof ValidationError) {
        const validationMessages = error.errors.map((e: ValidationErrorItem) => e.message);
        const jsonValidation = Utils.jsonValidationHandler(false, validationMessages);
        res.status(400);
        return res.json(Object.assign(jsonValidation, error));
      }
      const jsonValidation = Utils.jsonValidationHandler(false, `The id ${req.params.id} does not exist or is no longer accessible`);
      res.status(404);
      return res.json(jsonValidation);
    });
}

// function that check error and return validation or not for the delete

async function deleteById(req: Request, res: Response) {
  return deleteCategory(req)
    .then((rows: number) => {
      const jsonValidation = Utils.jsonValidationHandler(true, `Operation successful, ${rows} line updated`);
      res.status(202);
      return res.json(jsonValidation);
    }).catch((error) => {
      console.log(error);
      const jsonValidation = Utils.jsonValidationHandler(false, `The id ${req.params.id} does not exist or is no longer accessible`);
      res.status(404);
      return res.json(jsonValidation);
    });
}

export {
  getById,
  getAll,
  create,
  updateById,
  deleteById,
};
