import type { Context } from "hono";
import type { LoginReq, UserReq } from "../types/types";
import { validateLogin, validateRegistration } from "../utils/validator";
import { createUser, getUserInfo } from "../db/queries/users";
import { eraseCookie, setCookies } from "../utils/cookies";

export const handleLogin = async (c: Context) => {
  try {
    const requestBody: LoginReq = await c.req.json();

    const { isValid, errors } = validateLogin(requestBody);
    if (!isValid) return c.json({ success: false, errors }, 400);

    const dbResult = await getUserInfo(requestBody.username);

    if (!dbResult) {
      return c.json({ success: false, message: "Invalid credentials" }, 401);
    }

    const user = dbResult.user;

    if (!user) {
      return c.json({ success: false, error: "Invalid credentials" }, 401);
    }

    const isMatch = await Bun.password.verify(
      requestBody.password,
      user.password_hash
    );

    if (!isMatch) {
      return c.json({ success: false, message: "Invalid credentials" }, 401);
    }

    const sendUser = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    await setCookies(c, user.id);

    return c.json(
      {
        success: true,
        message: "Session started successfully",
        user: sendUser,
      },
      200
    );
  } catch (error) {
    console.error("Login Error:", error);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
};

export const handleSignUp = async (c: Context) => {
  try {
    const requestBody: UserReq = await c.req.json();

    const { isValid, errors } = validateRegistration(requestBody);

    if (!isValid) return c.json({ succcess: false, errors }, 400);

    const password_hash = await Bun.password.hash(requestBody.password);

    const result = await createUser(
      requestBody.username,
      password_hash,
      requestBody.email
    );

    if ("error" in result) {
      return c.json(
        { success: false, error: result.error },
        result.status as any
      );
    }

    const user = result.user;

    if (!user) {
      return c.json({ success: false, error: "Internal server error" }, 500);
    }

    const { id } = user;

    if (!id) return;

    await setCookies(c, id);

    return c.json(
      {
        success: true,
        message: "User created successfully",
        user: user,
      },
      201
    );
  } catch (error) {
    console.error("Critical Signup Error:", error);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
};

export const handleLogOut = async (c: Context) => {
  try {
    eraseCookie(c);
    return c.json({ success: true, message: "Logged out successfully" }, 201);
  } catch (error) {
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
};
