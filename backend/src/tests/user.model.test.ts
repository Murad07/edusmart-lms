
import { User, IUser } from '../models/user.model';

describe('User Model', () => {
  it('should hash the password before saving', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };
    const user = new User(userData);
    await user.save();
    expect(user.password).not.toBe('password123');
  });

  it('should compare passwords correctly', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };
    const user = new User(userData);
    await user.save();

    // we need to fetch the user again to get the password field
    const userWithPassword = await User.findOne({ email: 'test@example.com' }).select('+password');

    const isMatch = await userWithPassword!.comparePassword('password123');
    expect(isMatch).toBe(true);

    const isNotMatch = await userWithPassword!.comparePassword('wrongpassword');
    expect(isNotMatch).toBe(false);
  });
});
