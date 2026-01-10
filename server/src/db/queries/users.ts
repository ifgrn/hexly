import { db } from "../connection";

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

    const user = stmt.rows[0];

    if (!user) {
      throw new Error("Insert failed: No rows returned");
    }

    return { success: true, user };
  } catch (error: any) {
    if (error.message?.includes("UNIQUE constraint failed")) {
      return {
        error: "El nombre de usuario o email ya está registrado",
        status: 409,
      };
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
    console.error("Error fetching user:", error);
    return { error: "Internal server error", status: 500 };
  }
};

export const getPasswordHash = async (username: string) => {
  try {
    const stmt = await db.execute({
      sql: `SELECT password_hash FROM users WHERE username = ?`,
      args: [username],
    });

    const result = stmt.rows[0];

    if (!result) {
      return { error: "User not found", status: 404 };
    }

    return result.password_hash;
  } catch (error) {
    console.error("Auth fetch error:", error);
    return { error: "Internal server error", status: 500 };
  }
};
