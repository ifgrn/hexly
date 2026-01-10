import { sign } from "hono/jwt";

export const generateToken = async (userId: string) => {
  const now = Math.floor(Date.now() / 1000);
  const secretKey = Bun.env.JWT_SECRET_KEY;

  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }

  const payload = {
    id: userId,
    exp: now + 7 * 24 * 60 * 60,
  };
  const token = await sign(payload, secretKey);

  return token;
};
