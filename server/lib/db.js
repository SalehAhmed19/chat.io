import mongoose from "mongoose";

// function for connecting mongodb database
export const connectMongo = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected!");
    });
    await mongoose.connect(`${process.env.URI}/chat-io`);
  } catch (error) {
    console.log(error);
  }
};
