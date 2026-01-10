import { db } from "../connection";

export const createUser = async (
  username: string,
  password_hash: string,
  email: string
) => {
  if (!username || !password_hash || !email)
    return {
      error: "All fields are required",
      status: 400,
    };

  try {
    const stmt = await db.execute({
      sql: `INSERT INTO users (username, password_hash, email) VALUES(?,?,?) RETURNING id`,
      args: [username, password_hash, email],
    });
    const userId = stmt.rows[0]?.id;
    return { success: true, userId };
  } catch (error: any) {
    if (error.message?.includes("UNIQUE constraint failed")) {
      return { error: "Username or email already exists", status: 409 };
    }
    console.error("Registration Error:", error);
    return { error: "Internal server error", status: 500 };
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
    console.error("Error fetching user:", error);
    return { error: "Internal server error", status: 500 };
  }
};

export const getUserByEmail = async (email: string) => {
  const userEmail = email?.trim();

  if (!userEmail) {
    return { error: "User email is required", status: 400 };
  }

  try {
    const stmt = await db.execute({
      sql: `SELECT id, username, email FROM users WHERE email = ?`,
      args: [userEmail],
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
    console.error("Error fetching user:", error);
    return { error: "Internal server error", status: 500 };
  }
};
