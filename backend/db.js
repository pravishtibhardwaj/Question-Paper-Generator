import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to DB ${con.connection.host}`);
  } catch (error) {
    console.log(`error occured in mongodb ${error}`);
  }
};

export default connectDB;
