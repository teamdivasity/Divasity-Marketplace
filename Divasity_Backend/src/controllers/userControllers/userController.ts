import { Request, Response } from "express";
import { User, Notification } from '../../models';

export const getAllUsers = async (req: Request, res: Response):Promise<any> => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'username', 'firstName', 'lastName', 'telephone', 'role', 'isVerified'],
    });

    return res.status(200).json({
      error: false,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error: any) {
    console.error('Get all users error:', error.message);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
};

export const getUserById = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ['id', 'email', 'username', 'firstName', 'lastName', 'telephone', 'role', 'isVerified'],
    });

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    return res.status(200).json({
      error: false,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    console.error('Get user by ID error:', error.message);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
};