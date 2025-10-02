import { Schema, model, Document } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Lesson:
 *       type: object
 *       required:
 *         - title
 *         - module
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the lesson
 *         title:
 *           type: string
 *           description: The title of the lesson
 *         module:
 *           type: string
 *           description: The ID of the module this lesson belongs to
 *         content:
 *           type: string
 *           description: The text content of the lesson (e.g., Markdown)
 *         videoUrl:
 *           type: string
 *           description: The URL of the lesson's video
 *         duration:
 *           type: number
 *           description: The duration of the lesson video in minutes
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the lesson was created
 */
export interface ILesson extends Document {
  title: string;
  module: Schema.Types.ObjectId;
  content?: string;
  videoUrl?: string;
  duration?: number;
  createdAt: Date;
}

const LessonSchema = new Schema<ILesson>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  module: {
    type: Schema.Types.ObjectId,
    ref: 'Module',
    required: true,
  },
  content: String,
  videoUrl: String,
  duration: Number, // in minutes
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Lesson = model<ILesson>('Lesson', LessonSchema);
