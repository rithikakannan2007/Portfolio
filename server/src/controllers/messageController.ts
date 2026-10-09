import { Request, Response, NextFunction } from 'express';
import { Message } from '../models/Message';

export class MessageController {
  public async getAllMessages(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const messages = await Message.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: messages.length,
        data: messages
      });
    } catch (error) {
      next(error);
    }
  }

  public async getMessageById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const message = await Message.findById(id);
      if (!message) {
        res.status(404).json({
          success: false,
          message: `Message not found with id: ${id}`
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: message
      });
    } catch (error) {
      next(error);
    }
  }

  public async createMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newMessage = await Message.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Message sent successfully. Thank you for reaching out!',
        data: newMessage
      });
    } catch (error) {
      next(error);
    }
  }

  public async markAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const message = await Message.findByIdAndUpdate(id, { isRead: true }, { new: true });
      if (!message) {
        res.status(404).json({ success: false, message: 'Message not found' });
        return;
      }
      res.status(200).json({ success: true, message: 'Message marked as read', data: message });
    } catch (error) {
      next(error);
    }
  }

  public async deleteMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deletedMessage = await Message.findByIdAndDelete(id);
      if (!deletedMessage) {
        res.status(404).json({
          success: false,
          message: `Message not found with id: ${id}`
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Message deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export const messageController = new MessageController();
