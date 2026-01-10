const environment = Bun.env.NODE_ENV;

export const COOKIE_NAME =
  environment === "production" ? "__Host-token" : "token";

export const cookieOptions = {
  path: "/",
  secure: environment === "production",
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60,
  sameSite: (environment === "production" ? "None" : "Lax") as
    | "None"
    | "Lax"
    | "Strict",
};
