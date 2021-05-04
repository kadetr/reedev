import express from "express";
const router = express.Router();
import multer from "multer";
import { v4 as uuid } from "uuid";
import { addDrawHighlight } from "../controllers/highlightController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const DIR = "public/";

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, DIR);
   },
   filename: (req, file, cb) => {
    //   const fileName = file.originalname.toLowerCase().split(" ").join("-");
      cb(null, uuid());
   },
});

let upload = multer({
   storage: storage,
   fileFilter: (req, file, cb) => {
    //   if (file.mimetype) {
         cb(null, true);
    //   } else {
    //      cb(null, false);
    //      return cb(new Error("Only !!!"));
    //   }
   },
});

router.post("/", protect, upload.single("image"), addDrawHighlight);

export default router;
