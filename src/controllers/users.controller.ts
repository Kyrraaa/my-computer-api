/* eslint-disable consistent-return */
import { Response, Request } from 'express';
import { ValidationError, ValidationErrorItem } from 'sequelize';
import User from '../database/models/User';
import { createUser, deleteUser, updateUser } from '../services/users.service';
import Utils from '../utils/utils';
import 'dotenv/config';

const jwt = require('jsonwebtoken');

// function that check error and return validation and the product according to the id in json

async function getById(req: Request, res: Response) {
  return User.findOne({ where: { id: req.params.id }, raw: true })
    .then((user: User | null) => {
      if (user === null) {
        const jsonValidation = Utils.jsonValidationHandler(false, `The id ${req.params.id} does not exist or is no longer accessible`);
        res.status(400);
        return res.json(jsonValidation);
      }
      const jsonValidation = Utils.jsonValidationHandler(true, 'Operation successful');
      res.status(200);
      res.json(Object.assign(jsonValidation, { user }));
    });
}

// function that check error and return validation and the all products in json

async function getAll(req: Request, res: Response) {
  return User.findAll({ raw: true })
    .then((users: User[]) => {
      const jsonValidation = Utils.jsonValidationHandler(true, 'Operation successful');
      const jsonUsers = { users };
      res.status(200);

      return res.json(Object.assign(jsonValidation, jsonUsers));
    }).catch((error) => {
      const validationMessages: string[] = error.errors.map((e: ValidationErrorItem) => e.message);
      const jsonValidation = Utils.jsonValidationHandler(false, validationMessages);
      res.status(400);
      return res.json(jsonValidation);
    });
}

// function that check error and return the product created and validation

async function create(req: Request, res: Response) {
  return createUser(req)
    .then((user: User) => {
      const jsonValidation = Utils.jsonValidationHandler(true, 'Operation successful');
      const jsonUser = { user: user.toJSON() };
      delete jsonUser.user.password;
      res.status(201);
      return res.json(Object.assign(jsonValidation, jsonUser));
    }).catch((error) => {
      const validationMessages: string[] = error.errors.map((e: ValidationErrorItem) => e.message);
      const jsonValidation = Utils.jsonValidationHandler(false, validationMessages);
      res.status(400);
      return res.json(jsonValidation);
    });
}

// funtion that check error and return the validation or not for the update

async function updateById(req: Request, res: Response) {
  return updateUser(req)
    .then((rows) => {
      const jsonValidation = Utils.jsonValidationHandler(true, `Operation successful, ${rows} line updated`);
      res.status(200);
      return res.json(jsonValidation);
    }).catch((error) => {
      let jsonValidation = {};
      if (error instanceof ValidationError) {
        const validationMessages = error.errors.map((e: ValidationErrorItem) => e.message);
        jsonValidation = Utils.jsonValidationHandler(false, validationMessages);
      } else {
        jsonValidation = Utils.jsonValidationHandler(false, `The id ${req.params.id} does not exist or is no longer accessible`);
      }

      res.status(400);
      res.json(jsonValidation);
    });
}

// function that check error and return validation or not for the delete

async function deleteById(req: Request, res: Response) {
  return deleteUser(req)
    .then((rows: number) => {
      const jsonValidation = Utils.jsonValidationHandler(true, `Operation successful, ${rows} line updated`);
      res.status(200);
      return res.json(jsonValidation);
    }).catch(() => {
      const jsonValidation = Utils.jsonValidationHandler(false, `The id ${req.params.id} does not exist or is no longer accessible`);
      res.status(400);
      return res.json(jsonValidation);
    });
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findAll({ where: { email, password } });
  if (user.length !== 0) {
    const accessToken = jwt.sign({ username: email }, process.env.JWT_SECRET, { expiresIn: '1 day' });
    res.json({
      accessToken,
    });
  } else {
    const message = {
      message: 'Username or password incorrect',
    };
    res.json(message);
  }
}

async function register(req: Request, res: Response) {
  return createUser(req)
    .then((user: User) => {
      const jsonValidation = Utils.jsonValidationHandler(true, 'Operation successful');
      const jsonUser = { user: user.toJSON() };
      delete jsonUser.user.password;
      res.status(201);
      return res.json(Object.assign(jsonValidation, jsonUser));
    }).catch((error) => {
      const validationMessages: string[] = error.errors.map((e: ValidationErrorItem) => e.message);
      const jsonValidation = Utils.jsonValidationHandler(false, validationMessages);
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
  login,
  register,
};
