import { Request, Response } from "express";
import News from "../models/News";
import User from "../models/User";
import Notification from "../models/Notifications";
import { verifyToken } from "../services/token";

// Combined auth and admin check middleware
export const authAdmin = async (req: Request, res: Response, next: Function):Promise<any> => {
  try {
    // 1. Check for token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error("Authentication required");

    // 2. Verify token
    const { valid, decoded } = await verifyToken(token);
    if (!valid || !decoded) throw new Error("Invalid token");
    
    // 3. Check admin role
    if (decoded.role !== 'admin') throw new Error("Admin access required");

    // Attach user to request
    req.user = decoded;
    next();
  } catch (error: any) {
    res.status(401).json({ 
      error: true, 
      message: error.message 
    });
  }
};

// Simplified create news endpoint
export const createNews = [
  authAdmin, // Middleware
  async (req: Request, res: Response) => {
    try {
      // Validate input
      if (!req.body.Newstitle || !req.body.Newscontent) {
        return res.status(400).json({
          error: true,
          message: "Title and content are required"
        });
      }

      // Create news
      const news = await News.create({
        UserId: req.user.id,
        Newstitle: req.body.Newstitle,
        Newscontent: req.body.Newscontent,
        Newsimage: req.body.Newsimage || null,
        links: req.body.links || null,
        categories: req.body.categories || []
      });

      // Create notifications for non-admin users
      const users = await User.findAll({ where: { role: 'user' } });
      const notificationData = users.map((u) => ({
        UserId: u.id,
        NewsId: news.Newsid,
        message: `New news posted: ${news.Newstitle}`,
        isRead: false,
      }));
      await Notification.bulkCreate(notificationData);

      // Log for debugging
      console.log('News created:', news.toJSON());
      console.log('Notifications created for:', users.length, 'users');

      res.status(201).json({
        error: false,
        data: news
      });

    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message
      });
    }
  }
];

// Simplified delete news endpoint
export const deleteNews = [
  authAdmin, // Middleware
  async (req: Request, res: Response) => {
    try {
      const deleted = await News.destroy({
        where: { 
          Newsid: req.params.Newsid,
          UserId: req.user.id 
        }
      });

      if (!deleted) throw new Error("News not found");
      
      res.json({ success: true });

    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message
      });
    }
  }
];

// Get all news endpoint
export const getAllNews = async (req: Request, res: Response):Promise<any> => {
  try {
    const news = await News.findAll({
      attributes: ['Newsid', 'UserId', 'Newstitle', 'Newscontent', 'Newsimage', 'links', 'categories', 'createdAt', 'updatedAt']
    });

    return res.status(200).json({
      error: false,
      message: "News retrieved successfully",
      data: news
    });
  } catch (error: any) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message
    });
  }
};