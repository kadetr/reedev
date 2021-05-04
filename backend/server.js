import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import highlightRoutes from "./routes/highlightRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import drawHighlightRoutes from "./routes/drawHighlightRoutes.js"

dotenv.config();

connectDB();

const app = express();

// if (process.env.NODE_DEV === "development") {
//    app.use(morgan("dev"));
// }

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/highlights", highlightRoutes);
app.use("/api/pdfs", pdfRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/draw-uploads", drawHighlightRoutes);

 app.enable('trust proxy');

// app.use(function (req, res, next) {
// 	if (req.headers['x-forwarded-proto'] !== 'https'){
//       return res.status(404).send('Not found');
//     } else {
//     next();
//     }
// })

const __dirname = path.resolve();
app.use("/public", express.static(path.join(__dirname, "/public")));

// app.use("/uploads", express.static("uploads"));
 //app.use("/public", express.static("public"));

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "frontend/build")));

   app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
   );
} else {
   app.get("/", (req, res) => {
      res.send("API is running....");
   });
}
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
   PORT,
   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
