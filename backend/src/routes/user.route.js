import { Router } from "express";
import { fetchLeaderboard, getprofile, loginUser, logout, registerUser} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    upload.single("profilePicture"),
    registerUser
);

router.route("/login").post(loginUser)
router.route("/").get(getprofile)
router.route("/logout").get(logout)
router.route("leaderboard").get(fetchLeaderboard)




export default router;