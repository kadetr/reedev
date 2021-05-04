import mongoose from "mongoose";

const highlightSchema = mongoose.Schema(
   {
      content: {
         image: { type: String },
         text: { type: String }
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
      userId: { type: String },
      name: { type: String },
      drawUrl: {type: String}
   },
   {
      timestamps: true,
   }
);

const Highlight = mongoose.model("Highlight", highlightSchema);

export default Highlight;
