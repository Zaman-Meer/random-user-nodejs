import express from 'express';
import { sectorController } from '../controllers';

const router = express.Router();

router.get('/', sectorController.getAllSectors);

export default router;
