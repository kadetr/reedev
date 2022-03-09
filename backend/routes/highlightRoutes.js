import express from "express";
const router = express.Router();
import {
   getHighlights,
   getHighlightsByPdfId,
   addHighlight,
   deleteHighlight,
} from "../controllers/highlightController.js";
import { protect, instructor } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addHighlight);
router
   .route("/:id")
   .delete(protect, instructor, deleteHighlight)
router
   .route("/:pdfId")
   .get(protect, getHighlightsByPdfId);

export default router;
