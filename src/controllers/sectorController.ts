import { NextFunction, Request, Response } from 'express';
import { SectorModel } from '../models';
import logging from '../config/logging';

const getAllSectors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sectors = await SectorModel.find({});
        logging.info('Sectors', `Sectors fetch ${sectors?.length}`);
        return res.status(200).json(sectors);
    } catch (error) {
        res.status(404).json({ message: 'Sectors not found' });
    }
};

export default { getAllSectors };
