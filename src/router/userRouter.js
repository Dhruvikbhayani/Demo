import express from "express";
import controllers from "../controllers/index.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.post("/register", controllers.userController.userSingup);
router.post("/login", controllers.userController.userLogin);
router.get("/getalluser", auth, controllers.userController.getAllUser);
router.get("/getoneuser/:id", auth, controllers.userController.getOneUser);
router.put("/updateuser/:id", auth, controllers.userController.userUpdate);
router.delete("/deleteuser/:id", auth, controllers.userController.userRemove);
router.post("/forgetpass", auth, controllers.userController.forgetPassword);
router.post("/forgetemail", auth, controllers.userController.forgetMail);

export default router;