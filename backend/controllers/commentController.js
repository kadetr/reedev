import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Comment from "../models/commentModel.js";

// @desc    Get all cooments
// @route   GET /api/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
   const comments = await Comment.find({});
   res.json(comments);
});

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private/Admin
const deleteComment = asyncHandler(async (req, res) => {
   const comment = await Comment.findById(req.params.id);

   if (comment) {
      await comment.remove();
      res.json({ message: "Comment removed" });
   } else {
      res.status(404);
      throw new Error("Comment not found");
   }
});

const addComment = asyncHandler(async (req, res) => {
   const { comment, userId, name, parentId } = req.body;

   const _comment = await Comment.create({
      comment,
      userId,
      name,
      parentId,
   });
});

const getCommentsByHighlightId = asyncHandler(async (req, res) => {
   const comments = await Comment.find({ parentId: req.params.id });

   res.json(comments);
});

export { addComment, getComments, deleteComment, getCommentsByHighlightId };
