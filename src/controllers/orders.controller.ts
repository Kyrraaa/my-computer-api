import { Response, Request } from 'express';
import { ValidationError, ValidationErrorItem } from 'sequelize';
import Order from '../database/models/Order';
import { createOrder, deleteOrder, updateOrder } from '../services/orders.service';
import Utils from '../utils/utils';

// function that check error and return validation and the product according to the id in json

async function getById(req: Request, res: Response) {
  return Order.findOne({ where: { id: req.params.id }, raw: true })
    .then((order: Order | null) => {
      if (order === null) {
        const jsonValidation = Utils.jsonValidationHandler(false, `The id ${req.params.id} does not exist or is no longer accessible`);
        res.status(400);
        return res.json(jsonValidation);
      }
      const jsonValidation = Utils.jsonValidationHandler(true, 'Operation successful');
      res.status(200);
      return res.json(Object.assign(jsonValidation, { order }));
    }).catch((error) => {
      console.log(error);
      res.status(400);
    });
}

// function that check error and return validation and the all products in json

async function getAll(req: Request, res: Response) {
  return Order.findAll({ raw: true })
    .then((orders: Order[]) => {
      const jsonValidation = Utils.jsonValidationHandler(true, 'Operation successful');
      const jsonProducts = { orders };
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
  return createOrder(req)
    .then((order: Order) => {
      const jsonValidation = Utils.jsonValidationHandler(true, 'Operation successful');
      const jsonProduct = { order: order.toJSON() };
      res.status(201);
      return res.json(Object.assign(jsonValidation, jsonProduct));
    }).catch((error) => {
      const validationMessages: string[] = error.errors.map((e: ValidationErrorItem) => e.message);
      const jsonValidation = Utils.jsonValidationHandler(false, validationMessages);
      res.status(400);
      return res.json(Object.assign(jsonValidation, error));
    });
}

// funtion that check error and return the validation or not for the update

async function updateById(req: Request, res: Response) {
  return updateOrder(req)
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
  return deleteOrder(req)
    .then((rows: number) => {
      const jsonValidation = Utils.jsonValidationHandler(true, `Operation successful, ${rows} line updated`);
      res.status(202);
      return res.json(jsonValidation);
    }).catch(() => {
      const jsonValidation = Utils.jsonValidationHandler(false, `The id ${req.params.id} does not exist or is no longer accessible`);
      res.status(400);
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
