import express from "express";
import {
  register,
  login,
  otp_authentication,
  login1,
  deleteData,
  editData,
} from "../controllers/auth.js";
const router = express.Router();
router.post("/login", login);
router.post("/register", register);
router.patch("/otp_authentication/:id", otp_authentication);
router.get("/data12", login1);
router.delete("/data12/:id", deleteData);
router.put("/data12/:id", editData);

export default router;
