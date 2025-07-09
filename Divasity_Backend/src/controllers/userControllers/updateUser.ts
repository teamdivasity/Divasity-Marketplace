import { Request, Response } from "express";
import User from "../../models/User";
import { verifyToken } from "../../services/token";

export const updateUser = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id } = req.params;
    const { userName, telephone } = req.body;

    // Validate input
    if (!userName && !telephone) {
      return res.status(400).json({
        error: true,
        message: "At least one field (username, telephone) must be provided",
      });
    }

    // Verify token to ensure user is updating their own profile
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: true,
        message: "Authentication token required",
      });
    }

    const token = authHeader.split(' ')[1];
    const result = await verifyToken(token);
    if (!result.valid || !result.decoded || result.decoded.id !== id) {
      return res.status(403).json({
        error: true,
        message: "Access denied: You can only update your own profile",
      });
    }

    // Find user
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    // Validate username uniqueness if provided
    if (userName && userName !== user.userName) {
      const existingUser = await User.findOne({ where: { userName } });
      if (existingUser) {
        return res.status(400).json({
          error: true,
          message: "Username is already in use",
        });
      }
    }

    // Update user
    const updates: { userName?: string; telephone?: string } = {};
    if (userName) updates.userName = userName;
    if (telephone) updates.telephone = telephone;

    await user.update(updates);

    return res.status(200).json({
      error: false,
      message: "User updated successfully",
      data: {
        id: user.id,
        username: user.username,
        telephone: user.telephone,
      },
    });
  } catch (error: any) {
    console.error('Update user error:', error.message);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
};