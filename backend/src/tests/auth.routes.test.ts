
import request from 'supertest';
import { app, server } from '../server';
import mongoose from 'mongoose';
import { User } from '../models/user.model';
import nodemailer from 'nodemailer';

// Mock nodemailer to prevent actual emails from being sent during tests
jest.mock('nodemailer');

describe('Auth Routes', () => {
  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
    });

    it('should not register a user with an existing email', async () => {
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });
      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login a registered user', async () => {
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should not login with incorrect credentials', async () => {
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });
      expect(res.status).toBe(401);
    });
  });

  describe('User Profile Routes', () => {
    let token: string;
    let userId: string;

    beforeEach(async () => {
      const user = await User.create({
        name: 'Profile User',
        email: 'profile@example.com',
        password: 'password123',
      });
      userId = (user._id as any).toString();
      const res = await request(app).post('/api/auth/login').send({
        email: 'profile@example.com',
        password: 'password123',
      });
      token = res.body.token;
    });

    it('should get user profile', async () => {
      const res = await request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('email', 'profile@example.com');
    });

    it('should update user profile', async () => {
      const res = await request(app)
        .put('/api/users/me')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Updated Profile User',
        });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', 'Updated Profile User');
    });

    it('should not update profile without token', async () => {
      const res = await request(app)
        .put('/api/users/me')
        .send({
          name: 'Updated Profile User',
        });
      expect(res.status).toBe(401);
    });
  });

  describe('Password Reset Routes', () => {
    let user: any;
    let resetToken: string;

    beforeEach(async () => {
      user = await User.create({
        name: 'Reset User',
        email: 'reset@example.com',
        password: 'oldpassword',
      });

      // Mock the nodemailer transporter and sendMail method
      (nodemailer.createTransport as jest.Mock).mockReturnValue({
        sendMail: jest.fn().mockResolvedValue(true),
      });
    });

    it('should send a password reset email', async () => {
      const res = await request(app)
        .post('/api/auth/forgotpassword')
        .send({
          email: 'reset@example.com',
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(nodemailer.createTransport().sendMail).toHaveBeenCalled();

      // Retrieve the reset token from the user object (for the next test)
      const updatedUser = await User.findById(user._id);
      resetToken = updatedUser?.getResetPasswordToken() || ''; // This will generate a new token, not the one sent in email

      // To get the actual token sent in email, we need to parse the message from the mock
      const sendMailMock = nodemailer.createTransport().sendMail as jest.Mock;
      const emailText = sendMailMock.mock.calls[0][0].text;
      const tokenMatch = emailText.match(/resetpassword\/(.+)/);
      if (tokenMatch && tokenMatch[1]) {
        resetToken = tokenMatch[1];
      }
    });

    it('should reset password with a valid token', async () => {
      // Manually set the reset token on the user for this test
      const tokenFromUser = user.getResetPasswordToken(); // This generates a new token
      await user.save({ validateBeforeSave: false });

      const res = await request(app)
        .put(`/api/auth/resetpassword/${tokenFromUser}`)
        .send({
          password: 'newpassword123',
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);

      const updatedUser = await User.findById(user._id).select('+password');
      expect(await updatedUser?.comparePassword('newpassword123')).toBe(true);
      expect(updatedUser?.resetPasswordToken).toBeUndefined();
      expect(updatedUser?.resetPasswordExpire).toBeUndefined();
    });

    it('should not reset password with an invalid token', async () => {
      const res = await request(app)
        .put('/api/auth/resetpassword/invalidtoken')
        .send({
          password: 'newpassword123',
        });
      expect(res.status).toBe(400);
    });

    it('should not reset password with an expired token', async () => {
      // Manually set an expired token
      user.getResetPasswordToken();
      user.resetPasswordExpire = Date.now() - 10 * 60 * 1000; // Set to 10 minutes ago
      await user.save({ validateBeforeSave: false });

      const res = await request(app)
        .put(`/api/auth/resetpassword/${user.resetPasswordToken}`)
        .send({
          password: 'newpassword123',
        });
      expect(res.status).toBe(400);
    });
  });
});
