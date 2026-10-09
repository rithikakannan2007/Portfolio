import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const validateObjectId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      success: false,
      message: `Invalid ID format: '${id}' is not a valid MongoDB ObjectID`
    });
    return;
  }
  next();
};

export const validateProject = (req: Request, res: Response, next: NextFunction): void => {
  const { title, description, technologies, image } = req.body;
  const errors: string[] = [];

  if (!title || typeof title !== 'string' || !title.trim()) {
    errors.push('Title is required');
  }
  if (!description || typeof description !== 'string' || !description.trim()) {
    errors.push('Description is required');
  }
  if (!technologies || !Array.isArray(technologies) || technologies.length === 0) {
    errors.push('Technologies must be a non-empty array of strings');
  }
  if (!image || typeof image !== 'string' || !image.trim()) {
    errors.push('Image URL is required');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: errors.join(', ')
    });
    return;
  }

  next();
};

export const validateMessage = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, subject, message } = req.body;
  const errors: string[] = [];

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('Name is required');
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Invalid email address format');
    }
  }
  if (!subject || typeof subject !== 'string' || !subject.trim()) {
    errors.push('Subject is required');
  }
  if (!message || typeof message !== 'string' || !message.trim()) {
    errors.push('Message is required');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: errors.join(', ')
    });
    return;
  }

  next();
};
