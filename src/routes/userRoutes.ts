import express from 'express';
import { userController } from '../controllers';

const router = express.Router();

router.post('/', userController.addUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);

export default router;
