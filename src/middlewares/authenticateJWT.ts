import { Response, Request } from 'express';
import 'dotenv/config';

const jwt = require('jsonwebtoken');

// function that verify if a user and a token is valid or not

export default function authenticateJWT(req: Request, res: Response, next: Function) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err: any) => {
      if (err) {
        const message = {
          message: err,
        };
        res.sendStatus(403);
        return res.json(message);
      }
      return next();
    });
  } else {
    const message = {
      message: 'Unauthorized',
    };
    res.sendStatus(401);
    res.json(message);
  }
}
