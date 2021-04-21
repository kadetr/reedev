import express from "express";
const router = express.Router();
import {
   getComments,
   deleteComment,
   addComment,
   getCommentsByHighlightId,
} from "../controllers/commentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getComments).post(protect, addComment);

router
   .route("/:id")
   .delete(protect, admin, deleteComment)
   .get(protect, getCommentsByHighlightId);

export default router;
