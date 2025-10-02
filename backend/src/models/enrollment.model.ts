import { Schema, model, Document } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       required:
 *         - user
 *         - course
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the enrollment record
 *         user:
 *           type: string
 *           description: The ID of the enrolled user
 *         course:
 *           type: string
 *           description: The ID of the course the user is enrolled in
 *         enrolledAt:
 *           type: string
 *           format: date-time
 *           description: The date and time of enrollment
 *         progress:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               lesson:
 *                 type: string
 *                 description: The ID of the lesson
 *               completed:
 *                 type: boolean
 *                 description: Whether the lesson has been completed
 *           description: The user's progress in the course
 */
export interface IEnrollment extends Document {
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  enrolledAt: Date;
  progress: {
    lesson: Schema.Types.ObjectId;
    completed: boolean;
  }[];
}

const EnrollmentSchema = new Schema<IEnrollment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  progress: [{
    lesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
    },
    completed: {
      type: Boolean,
      default: false,
    },
  }],
});

// Ensure a user can only enroll in a course once
EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export const Enrollment = model<IEnrollment>('Enrollment', EnrollmentSchema);
