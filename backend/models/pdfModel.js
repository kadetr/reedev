import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
   {
      id: { type: String },
      url: { type: String },
      name: { type: String },
      courseId: { type: String },
      instructor1: { type: String },
      instructor2: { type: String },
      instructor3: { type: String },
      //highlights: [highlightSchema],
   },
   {
      timestamps: true,
   }
);

const Pdf = mongoose.model("Pdf", pdfSchema);

export default Pdf;
