export default interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export class UserValidator {
  private static isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validate(user: IUser): { isValid: boolean; errors?: string[] } {
    const errors: string[] = [];

    if (!this.isEmailValid(user.email)) {
      errors.push('Invalid email format');
    }

    if (!user.firstName.trim() || user.firstName.trim().length < 3) {
      errors.push('First name must be above 3 characters');
    }

    if (!user.lastName.trim() || user.lastName.trim().length < 3) {
      errors.push('First name must be above 3 characters');
    }

    if (user.password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    return {
      isValid: errors.length === 0,
      errors: errors.length === 0 ? undefined : errors,
    };
  }
}
