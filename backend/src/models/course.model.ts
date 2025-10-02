import { Schema, model, Document } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - instructor
 *         - slug
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the course
 *         title:
 *           type: string
 *           description: The title of the course
 *         description:
 *           type: string
 *           description: A detailed description of the course
 *         instructor:
 *           type: string
 *           description: The ID of the instructor (User) who created the course
 *         price:
 *           type: number
 *           description: The price of the course
 *           default: 0
 *         category:
 *           type: string
 *           description: The category or subject of the course
 *         level:
 *           type: string
 *           enum: [Beginner, Intermediate, Advanced]
 *           description: The difficulty level of the course
 *         slug:
 *           type: string
 *           description: A URL-friendly slug for the course (must be unique)
 *         thumbnail:
 *           type: string
 *           description: The URL of the course's thumbnail image
 *         modules:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of module IDs associated with the course
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the course was created
 */
export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: Schema.Types.ObjectId;
  price: number;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  slug: string;
  thumbnail?: string;
  modules: Schema.Types.ObjectId[];
  createdAt: Date;
}

const CourseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: String,
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  thumbnail: String,
  modules: [{
    type: Schema.Types.ObjectId,
    ref: 'Module',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = model<ICourse>('Course', CourseSchema);
