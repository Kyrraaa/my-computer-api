import { Router, Request, Response } from 'express';
import * as orderController from '../controllers/orders.controller';
import authenticateJWT from '../middlewares/authenticateJWT';

const router: Router = Router();

// route get all with the controller for order

router.get('/', (req: Request, res: Response) => {
  orderController.getAll(req, res);
});

// route get by id with the controller for order

router.get('/:id', (req: Request, res: Response) => {
  orderController.getById(req, res);
});

// route post with the controller for order

router.post('/', authenticateJWT, (req: Request, res: Response) => {
  orderController.create(req, res);
});

// route patch with the controller for order

router.patch('/:id', authenticateJWT, (req: Request, res: Response) => {
  orderController.updateById(req, res);
});

// route delete with controller for order

router.delete('/:id', authenticateJWT, (req: Request, res: Response) => {
  orderController.deleteById(req, res);
});

module.exports = router;
