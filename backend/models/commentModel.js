import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
   {
      content: {
         image: { type: String },
         text: { type: String },
      },
      comment: {
         type: String,
      },
      id: { type: String },
      pdfId: { type: String },
      parentId: { type: String },
      userId: { type: String },
      name: { type: String },
   },
   {
      timestamps: true,
   }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
