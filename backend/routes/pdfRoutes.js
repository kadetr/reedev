import express from "express";
const router = express.Router();
import { getPdfById, getPdfs, deletePdf } from "../controllers/pdfController.js";

import { protect, instructor } from "../middleware/authMiddleware.js"

router.route("/:id").get(protect, getPdfById).delete(protect, instructor, deletePdf);
router.route("/").get(protect, getPdfs);
router
   .route("/:id")
   

export default router;
