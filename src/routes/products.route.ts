import { Router, Request, Response } from 'express';
import * as productController from '../controllers/products.controller';
import authenticateJWT from '../middlewares/authenticateJWT';

const router: Router = Router();

// route get all with the controller for product

router.get('/', (req: Request, res: Response) => {
  productController.getAll(req, res);
});

// route get by id with the controller for product

router.get('/:id', (req: Request, res: Response) => {
  productController.getById(req, res);
});

// route post with the controller for product

router.post('/', authenticateJWT, (req, res) => {
  productController.create(req, res);
});

// route patch with the controller for product

router.patch('/:id', authenticateJWT, (req: Request, res: Response) => {
  productController.updateById(req, res);
});

// route delete with controller for product

router.delete('/:id', authenticateJWT, (req: Request, res: Response) => {
  productController.deleteById(req, res);
});

module.exports = router;
