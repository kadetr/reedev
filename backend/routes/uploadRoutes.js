import express from "express";
const router = express.Router();
import multer from "multer";
import { v4 as uuid } from "uuid";
import { createPdf } from "../controllers/pdfController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const DIR = "public/";

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, DIR);
   },
   filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(" ").join("-");
      cb(null, uuid() + "-" + fileName);
   },
});

let upload = multer({
   storage: storage,
   fileFilter: (req, file, cb) => {
      if (file.mimetype == "application/pdf") {
         cb(null, true);
      } else {
         cb(null, false);
         return cb(new Error("Only .pdf format allowed!"));
      }
   },
});

router.post("/", protect, upload.single("pdfFile"), createPdf);

export default router;
