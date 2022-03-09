import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Highlight from "../models/highlightModel.js";

// @desc    Get all highlights
// @route   GET /api/highlights
// @access  Private
const getHighlights = asyncHandler(async (req, res) => {
   const { pdfId  } = req.body
   const highlights = await Highlight.find({pdfId});
   res.json(highlights);
   
});

const getHighlightsByPdfId = asyncHandler(async (req, res) => {
   const highlights = await Highlight.find({ pdfId: req.params.pdfId });
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

   const {  content,
      position,
      comment,
      pdfId, 
      userId, 
      name } = req.body;

   const highlight = await Highlight.create({
      content,
      position,
      comment,
      pdfId, 
      userId, 
      name
   });

});

// @desc    Create a draw
// @route   POST /api/draw-upload
// @access  Private/Instructor/Admin
const addDrawHighlight = asyncHandler(async (req, res) => {
   const { userId, name, content, position, pdfId  } = req.body;
   const drawUrl =
      req.protocol + "://" + req.get("host") + "/public/" + req.file.filename;

      let posObj = JSON.parse(position)
      let contentObj = JSON.parse(content)

   const highlight = await Highlight.create({
      userId,
      name, 
      content: contentObj,
      position: posObj,
      pdfId,
      
      drawUrl,
   });

   if (highlight) {
      res.status(201).json({
         name: highlight.name,
         userId: highlight.userId,
         pdfId: highlight.pdfId,
         content: highlight.content,
         position: highlight.position,
         drawUrl: highlight.drawUrl
      });
   } else {
      res.status(400);
      throw new Error("invalid draw data");
   }
});

export { addHighlight, getHighlights, deleteHighlight, addDrawHighlight, getHighlightsByPdfId };
