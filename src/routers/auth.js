import  express  from "express";
import { login } from "../controller/loginController.js";

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("auth/Login");
});
router.post("/login", login);

export const authRouter = router