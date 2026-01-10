import type { CreatedUser, UserLogin } from "../../types/types";
import { db } from "../connection";

const handleDbError = (error: any) => {
  if (error.message?.includes("UNIQUE constraint failed")) {
    return {
      error: "Username or email already exists",
      status: 409,
    };
  }
  console.error("Database Error:", error);
  return { error: "Internal server error", status: 500 };
};

export const createUser = async (
  username: string,
  password_hash: string,
  email: string
) => {
  try {
    const stmt = await db.execute({
      sql: `INSERT INTO users (username, password_hash, email) VALUES(?,?,?) RETURNING id, username`,
      args: [username, password_hash, email],
    });

    const user = stmt.rows[0] as CreatedUser | undefined;

    if (!user) {
      throw new Error("Insert failed: No rows returned");
    }

    return { success: true, user };
  } catch (error) {
    return handleDbError(error);
  }
};

export const getUserById = async (id: string) => {
  const userId = id?.trim();

  if (!userId) {
    return { error: "User Id is required", status: 400 };
  }

  try {
    const stmt = await db.execute({
      sql: `SELECT id, username, email FROM users WHERE id = ?`,
      args: [userId],
    });

    const user = stmt.rows[0];

    if (!user) {
      return { error: "User not found", status: 404 };
    }

    return {
      success: true,
      user: { id: user.id, username: user.username, email: user.email },
    };
  } catch (error) {
    return handleDbError(error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const stmt = await db.execute({
      sql: `SELECT id, username, email FROM users WHERE email = ?`,
      args: [email],
    });

    const user = stmt.rows[0];

    if (!user) {
      return { error: "User not found", status: 404 };
    }

    return {
      success: true,
      user: { id: user.id, username: user.username, email: user.email },
    };
  } catch (error) {
    return handleDbError(error);
  }
};

export const getUserInfo = async (username: string) => {
  try {
    const stmt = await db.execute({
      sql: `SELECT id, username, email, password_hash FROM users WHERE username = ?`,
      args: [username],
    });

    const result = stmt.rows[0] as UserLogin | undefined;

    if (!result) {
      return { error: "User not found", status: 404 };
    }

    return {
      success: true,
      user: {
        id: result.id,
        username: result.username,
        email: result.email,
        password_hash: result.password_hash,
      },
    };
  } catch (error) {
    return handleDbError(error);
  }
};
