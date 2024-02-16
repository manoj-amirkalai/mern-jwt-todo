const mongoose = require("mongoose");
const connectdb = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
  } catch (e) {
    console.log("not connected");
    process.exit(1);
  }
};

module.exports = connectdb;
