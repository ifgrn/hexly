import { Hono } from "hono";
import { handleLogin, handleLogOut, handleSignUp } from "../controller/user.js";

const router = new Hono();

router.post("/register", handleSignUp);
router.post("/login", handleLogin);
router.post("/logout", handleLogOut);

export default router;
