import { Schema, model, Document } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Module:
 *       type: object
 *       required:
 *         - title
 *         - course
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the module
 *         title:
 *           type: string
 *           description: The title of the module
 *         course:
 *           type: string
 *           description: The ID of the course this module belongs to
 *         lessons:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of lesson IDs within this module
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the module was created
 */
export interface IModule extends Document {
  title: string;
  course: Schema.Types.ObjectId;
  lessons: Schema.Types.ObjectId[];
  createdAt: Date;
}

const ModuleSchema = new Schema<IModule>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  lessons: [{
    type: Schema.Types.ObjectId,
    ref: 'Lesson',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Module = model<IModule>('Module', ModuleSchema);
