import asyncHandler from "express-async-handler";
import Pdf from "../models/pdfModel.js";
// import multer from "multer";

// @desc    Create a pdf
// @route   POST /api/pdfs
// @access  Private/Instructor/Admin
const createPdf = asyncHandler(async (req, res) => {
   const { name } = req.body;
   const url =
      req.protocol + "://" + req.get("host") + "/public/" + req.file.filename;

   const pdf = await Pdf.create({
      name,
      url,
   });

   if (pdf) {
      res.status(201).json({
         name: pdf.name,
         url: pdf.url,
      });
   } else {
      res.status(400);
      throw new Error("invalid pdf data");
   }
});

// @desc    Fetch single pdf
// @route   GET /api/pdfs/:id
// @access  Public
const getPdfById = asyncHandler(async (req, res) => {
   const pdf = await Pdf.findById({ _id: req.params.id });

   if (pdf) {
      res.json(pdf);
   } else {
      res.status(404);
      throw new Error("Pdf not found");
   }
});

const getPdfs = asyncHandler(async (req, res) => {
   const pdfs = await Pdf.find({});
   res.json(pdfs);
});

export { createPdf, getPdfById, getPdfs };
