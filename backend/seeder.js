import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import comments from "./data/comments.js";
import highlights from "./data/highlights.js";
import User from "./models/userModel.js";
import Comment from "./models/commentModel.js";
import Highlight from "./models/highlightModel.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
   try {
      await Comment.deleteMany();
      await Highlight.deleteMany();
      await User.deleteMany();

      const createdUsers = await User.insertMany(users);
      const adminUser = createdUsers[0]._id;

      const sampleComments = comments.map((c) => {
         return { ...c, user: adminUser };
      });
      const sampleHighlights = highlights.map((c) => {
         return { ...c, user: adminUser };
      });

      await Comment.insertMany(sampleComments);
      await Highlight.insertMany(sampleHighlights);

      console.log("data imported");
      process.exit();
   } catch (error) {
      console.error(`${error}`);
      process.exit(1);
   }
};

const destroyData = async () => {
   try {
      await Comment.deleteMany();
      await Highlight.deleteMany();
      await User.deleteMany();

      console.log("data destroyed");
      process.exit();
   } catch (error) {
      console.error(`${error}`);
      process.exit(1);
   }
};

if (process.argv[2] === "-d") {
   destroyData();
} else {
   importData();
}
