import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
   {
      content: {
         image: { type: String },
         text: { type: String },
      },
      position: {
         boundingRect: {
            x1: { type: Number },
            x2: { type: Number },
            y1: { type: Number },
            y2: { type: Number },
            width: { type: Number },
            height: { type: Number },
         },
         rects: [
            {
               x1: { type: Number },
               x2: { type: Number },
               y1: { type: Number },
               y2: { type: Number },
               width: { type: Number },
               height: { type: Number },
            },
         ],
         pageNumber: { type: String },
      },
      comment: {
         text: { type: String },
         emoji: { type: String },
      },
      id: { type: String },
      parentId: { type: String },
      pdfId: { type: String },
   },
   {
      timestamps: true,
   }
);

const highlightSchema = new mongoose.Schema(
   {
      content: {
         image: { type: String },
         text: { type: String },
      },
      position: {
         boundingRect: {
            x1: { type: Number },
            x2: { type: Number },
            y1: { type: Number },
            y2: { type: Number },
            width: { type: Number },
            height: { type: Number },
         },
         rects: [
            {
               x1: { type: Number },
               x2: { type: Number },
               y1: { type: Number },
               y2: { type: Number },
               width: { type: Number },
               height: { type: Number },
            },
         ],
         pageNumber: { type: String },
      },
      comment: {
         text: { type: String },
         emoji: { type: String },
      },
      id: { type: String },
      pdfId: { type: String },
      comments: [commentSchema],
   },
   {
      timestamps: true,
   }
);
const pdfSchema = new mongoose.Schema({
   id: { type: String },
   filepath: { type: String },
   name: { type: String },
   couseId: { type: String },
   instructor1: { type: String },
   instructor2: { type: String },
   instructor3: { type: String },
   highlights: [highlightSchema],
});

const Pdf = mongoose.model("Pdf", pdfSchema);

export default Pdf;
