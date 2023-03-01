import { Request } from 'express';
import User from '../database/models/User';

// create an user and return it

export function createUser(req: Request) {
  return User.create({
    attributes: { exclude: ['created_at', 'update_at'] },
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  }, {
    fields: ['firstname', 'lastname', 'email', 'password'],
  });
}

// update an user according to the id and return it

export function updateUser(req: Request) {
  return User.update(req.body, {
    where: {
      id: req.params.id,
    },
    validate: true,
  });
}

// delete an user according to the id and return it

export function deleteUser(req: Request) {
  return User.destroy({
    where: {
      id: req.params.id,
    },
  });
}
