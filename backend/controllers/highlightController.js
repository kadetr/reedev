import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Highlight from "../models/highlightModel.js";

// @desc    Get all highlights
// @route   GET /api/highlights
// @access  Private
const getHighlights = asyncHandler(async (req, res) => {
   const highlights = await Highlight.find({});
   res.json(highlights);
});

const getHighlightsByPdfId = asyncHandler(async (req, res) => {
   const highlights = await Highlight.find({ pdfId: req.params.id });
   res.json(highlights);
});

// @desc    Delete highlight
// @route   DELETE /api/highlights/:id
// @access  Private/Admin
const deleteHighlight = asyncHandler(async (req, res) => {
   const highlight = await Highlight.findById(req.params.id);

   if (highlight) {
      await highlight.remove();
      res.json({ message: "highlight removed" });
   } else {
      res.status(404);
      throw new Error("highlight not found");
   }
});

const addHighlight = asyncHandler(async (req, res) => {
   const { userId, name, pdfId, content, position, comment } = req.body;

   const highlight = await Highlight.create({
      userId,
      name,
      pdfId,
      content,
      position,
      comment,
   });
});

export { addHighlight, getHighlights, getHighlightsByPdfId, deleteHighlight };
