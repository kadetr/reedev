import express from "express";
const router = express.Router();
import {
   getComments,
   deleteComment,
   addComment,
   getCommentsByHighlightId,
} from "../controllers/commentController.js";
import { protect, instructor } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getComments).post(protect, addComment);

router
   .route("/:id")
   .delete(protect, instructor, deleteComment)
   .get(protect, getCommentsByHighlightId);

export default router;
