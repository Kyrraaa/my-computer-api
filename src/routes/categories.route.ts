import { Router, Request, Response } from 'express';
import * as categoryController from '../controllers/categories.controller';
import authenticateJWT from '../middlewares/authenticateJWT';

const router: Router = Router();

// route get all with the controller for category

router.get('/', (req: Request, res: Response) => {
  categoryController.getAll(req, res);
});

// route get by id with the controller for category

router.get('/:id', (req: Request, res: Response) => {
  categoryController.getById(req, res);
});

// route post with the controller for category

router.post('/', authenticateJWT, (req, res) => {
  categoryController.create(req, res);
});

// route patch with the controller for category

router.patch('/:id', authenticateJWT, (req: Request, res: Response) => {
  categoryController.updateById(req, res);
});

// route delete with controller for category

router.delete('/:id', authenticateJWT, (req: Request, res: Response) => {
  categoryController.deleteById(req, res);
});

module.exports = router;
