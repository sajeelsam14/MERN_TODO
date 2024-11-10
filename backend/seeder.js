import connectdb from "./config/db.js";
import Data from "./data/data.js";
import users from "./data/user.js";
import Todo from "./model/todo.js";
import User from "./model/user.js";

connectdb();
const imporToDO = async () => {
  try {
    await Todo.insertMany(Data);
    console.log(`✅✅✅ Data imported successfully.`);
    process.exit(0);
  } catch (error) {
    console.log(`❌❌❌Unable to import data : ${error.message} `.bgRed);
    process.exit(1);
  }
};

const importUsers = async () => {
  try {
    await User.insertMany(users);
    console.log("User Imported successfuly");
    process.exit(0);
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// To Clear the DB
// const deleData = async () => {
//   try {
//     connectdb();
//     await Todo.deleteMany();
//     console.log("Data Deleted Successfully");
//     process.exit(0);
//   } catch (error) {
//     console.log("Not able to delete it");
//     process.exit(1);
//   }
// };
// deleData();

imporToDO();
importUsers();
