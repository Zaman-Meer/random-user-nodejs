import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models';
import logging from '../config/logging';
import { getUserSchema, addUserSchema, updateUserSchema } from '../validations';

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // Access the user ID from URL parameters
    const { error } = getUserSchema.validate({ id });

    if (error) {
        logging.error('User', `Validation error: ${error.message}`);
        return res.status(400).json({ message: `Validation error: ${error.message}` });
    }

    try {
        const user = await UserModel.findById(id); // Use findById directly
        if (user) {
            logging.info('User', `User ${user.id} fetched`);
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        logging.error('User', `Internal Server Error`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, sectors, agree_to_terms } = req?.body;
    const { error } = addUserSchema.validate(req.body);

    if (error) {
        logging.error('User', `Validation error: ${error.message}`);
        return res.status(400).json({ message: `Validation error: ${error.message}` });
    }

    try {
        const newUser = new UserModel({
            name,
            sectors,
            agree_to_terms
        });
        const user = await newUser.save();
        logging.info('User', 'User created successfully');
        return res.status(200).json({ message: 'User created successfully', id: user?.id });
    } catch (error) {
        logging.error('User', `User not created`);
        res.status(404).json({ message: 'User not created' });
    }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // Access the user ID from URL parameters
    const { error } = updateUserSchema.validate({ ...req.body, id });

    if (error) {
        logging.error('User', `Validation error: ${error.message}`);
        return res.status(400).json({ message: `Validation error: ${error.message}` });
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            {
                $set: req?.body
            },
            { new: true }
        );

        logging.info('User', 'User updated successfully');
        return res.status(200).json({ message: 'User updated successfully', id: updatedUser?.id });
    } catch (error) {
        logging.error('User', `User not updated`);
        res.status(404).json({ message: 'User not updated' });
    }
};

export default { getUser, addUser, updateUser };
