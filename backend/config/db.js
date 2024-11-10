import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `DB is Connected successfully with host ${connection.connection.host}`
    );
  } catch (error) {
    console.error(`Some error occur ${error?.message || error}`);
    process.exit(1);
  }
};

export default connectdb;
