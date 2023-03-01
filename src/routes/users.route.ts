import { Router, Request, Response } from 'express';
import * as userController from '../controllers/users.controller';
import authenticateJWT from '../middlewares/authenticateJWT';

const router: Router = Router();

// route get all with the controller for user

router.get('/', (req: Request, res: Response) => {
  userController.getAll(req, res);
});

// route get by id with the controller for user

router.get('/:id', (req: Request, res: Response) => {
  userController.getById(req, res);
});

// route post with the controller for user

router.post('/', (req, res) => {
  userController.create(req, res);
});

// route patch with the controller for user

router.patch('/:id', authenticateJWT, (req: Request, res: Response) => {
  userController.updateById(req, res);
});

// route delete with controller for user

router.delete('/:id', authenticateJWT, (req: Request, res: Response) => {
  userController.deleteById(req, res);
});

router.post('/register', (req: Request, res: Response) => {
  userController.register(req, res);
});

router.post('/login', (req: Request, res: Response) => {
  userController.login(req, res);
});

module.exports = router;
