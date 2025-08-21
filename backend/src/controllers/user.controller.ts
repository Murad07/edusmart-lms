import { Request, Response } from 'express';
import User from '../models/user.model';

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
