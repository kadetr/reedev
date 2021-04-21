import express from "express";
const router = express.Router();
import {
   getHighlights,
   getHighlightsByPdfId,
   addHighlight,
   deleteHighlight,
} from "../controllers/highlightController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getHighlights).post(protect, addHighlight);
router
   .route("/:id")
   .delete(protect, admin, deleteHighlight)
   .get(protect, getHighlightsByPdfId);

export default router;
