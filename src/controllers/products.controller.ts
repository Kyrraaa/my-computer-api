/* eslint-disable consistent-return */
import { Response, Request } from 'express';
import { ValidationError, ValidationErrorItem } from 'sequelize';
import Product from '../database/models/Product';
import { createProduct, deleteProduct, updateProduct } from '../services/products.service';
import Utils from '../utils/utils';

// function that check error and return validation and the product according to the id in json

async function getById(req: Request, res: Response) {
  return Product.findOne({ where: { id: req.params.id }, raw: true })
    .then((product: Product | null) => {
      if (product === null) {
        const jsonValidation = Utils.jsonValidationHandler(false, `The id ${req.params.id} does not exist or is no longer accessible`);
        res.status(400);
        return res.json(jsonValidation);
      }
      const jsonValidation = Utils.jsonValidationHandler(true, 'Operation successful');
      res.status(200);
      return res.json(Object.assign(jsonValidation, { product }));
    }).catch((error) => {
      console.log(error);
      res.status(400);
    });
}

// function that check error and return validation and the all products in json

async function getAll(req: Request, res: Response) {
  return Product.findAll({ raw: true })
    .then((products: Product[]) => {
      const jsonValidation = Utils.jsonValidationHandler(true, 'Operation successful');
      const jsonProducts = { products };
      res.status(200);

      return res.json(Object.assign(jsonValidation, jsonProducts));
    }).catch((error) => {
      const validationMessages: string[] = error.errors.map((e: ValidationErrorItem) => e.message);
      const jsonValidation = Utils.jsonValidationHandler(false, validationMessages);
      res.status(400);

      return res.json(jsonValidation);
    });
}

// function that check error and return the product created and validation

async function create(req: Request, res: Response) {
  return createProduct(req)
    .then((product: Product) => {
      const jsonValidation = Utils.jsonValidationHandler(true, 'Operation successful');
      const jsonProduct = { product: product.toJSON() };
      res.status(201);

      return res.json(Object.assign(jsonValidation, jsonProduct));
    }).catch((error) => {
      if (error instanceof ValidationError) {
        const validationMessages = error.errors.map((e: ValidationErrorItem) => e.message);
        const jsonValidation = Utils.jsonValidationHandler(false, validationMessages);

        res.status(400);
        return res.json(jsonValidation);
      }

      const jsonValidation = Utils.jsonValidationHandler(false, `The category_id ${req.body.category_id} does not exist or is no longer accessible`);
      res.status(404);
      return res.json(jsonValidation);
    });
}

// funtion that check error and return the validation or not for the update

async function updateById(req: Request, res: Response) {
  return updateProduct(req)
    .then((rows) => {
      const jsonValidation = Utils.jsonValidationHandler(true, `Operation successful, ${rows} line updated`);
      res.status(200);
      res.json(jsonValidation);
    }).catch((error) => {
      let jsonValidation = {};

      if (error instanceof ValidationError) {
        const validationMessages = error.errors.map((e: ValidationErrorItem) => e.message);
        jsonValidation = Utils.jsonValidationHandler(false, validationMessages);
        res.status(400);
        return res.json(Object.assign(jsonValidation, error));
      }
      jsonValidation = Utils.jsonValidationHandler(false, `The id ${req.params.id} does not exist or is no longer accessible`);
      res.status(404);
      return res.json(jsonValidation);
    });
}

// function that check error and return validation or not for the delete

async function deleteById(req: Request, res: Response) {
  return deleteProduct(req)
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
