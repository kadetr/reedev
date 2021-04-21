import express from "express";
const router = express.Router();
import { getPdfById, getPdfs } from "../controllers/pdfController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/:id").get(protect, getPdfById);
router.route("/").get(protect, getPdfs);

export default router;
