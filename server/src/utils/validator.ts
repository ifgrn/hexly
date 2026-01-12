import type { LoginReq, UserReq } from "../types/types.js";

export const validateRegistration = (request: UserReq) => {
  const errors: string[] = [];

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!request.email || !emailRegex.test(request.email)) {
    errors.push("Invalid email format.");
  }

  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  if (!request.username || !usernameRegex.test(request.username)) {
    errors.push(
      "Username must be between 3 and 16 characters and contain only letters, numbers, or underscores."
    );
  }

  if (!request.password || request.password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(request.password) && !/[a-z]/.test(request.password)) {
    errors.push("Password must contain at least one letter.");
  }
  if (!/\d/.test(request.password)) {
    errors.push("Password must contain at least one number.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateLogin = (req: LoginReq) => {
  const { username, password } = req;

  const errors: string[] = [];

  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  if (!username || !usernameRegex.test(username)) {
    errors.push(
      "Username must be between 3 and 16 characters and contain only letters, numbers, or underscores."
    );
  }

  if (!password || password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(password) && !/[a-z]/.test(password)) {
    errors.push("Password must contain at least one letter.");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
