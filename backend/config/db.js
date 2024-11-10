import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ToDoApp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB is Connected succesfully");
  } catch (error) {
    console.error(`Some error occur ${error}`);
  }
};

export default connectdb;
