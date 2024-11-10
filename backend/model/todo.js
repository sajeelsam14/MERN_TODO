import mongoose from "mongoose";

const TodoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    task: {
      type: mongoose.Schema.Types.String,
      required: [true, "You Have to mention the task"],
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
