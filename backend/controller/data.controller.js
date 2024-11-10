import ToDO from "../model/todo.js";
// path:     /data/todo
// request:  GET
// DESC:     Get All ToDos
// ACCESS:   Public

export const getTodo = async (req, res) => {
  const todo = await ToDO.find({});

  return res.status(200).json({ length: todo.length });
};
// Path:     /data?skip=
// request   get
// DESC      To get all to do
// Access    Everyone

export const getData = async (req, res) => {
  const skip = req.query.skip;
  const todo = await ToDO.find().skip(skip).limit(3);
  return res.status(200).json(todo);
};

// Path:       /data/:id
// request     GET
// DECS        Get ToDo By ID
// Access      Public

export const getDataByID = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await ToDO.findById(id);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: "No TODO Found" });
    }
  } catch (error) {
    res.status(404).json({ message: "Something Bad", id });
  }
};
// Path:      /data
// request:   delete
// DECS:      To Delete a Todo
// Access:    Everyone

export const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await ToDO.deleteOne({ _id: id });
    if (todo.deletedCount === 1) {
      res.status(200).json({ message: "Product Deleted Successfully", id });
    } else {
      res.status(404).json({ message: "Something went wrong try later" });
    }
  } catch (error) {
    res.status(404).json({ message: "SomeError Occur" });
  }
};

// Path:     /data
// request   Put
// DESC      Add a new todo
// ACCESS    Public

export const newData = async (req, res) => {
  const { task } = req.body;
  const user_id = req.headers.userid;
  const data = new ToDO({ user: user_id, task: task });
  try {
    const createdToDo = await data.save();
    res.status(201).json({
      _id: createdToDo._id,
      user_id: createdToDo.user,
      task: createdToDo.task,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Path:       /data
// ACCESS:      Public
// DESC:        To Update a task
// Type:        post

export const updateData = async (req, res) => {
  const { _id, task } = req.body;
  try {
    const data = await ToDO.findById(_id);
    if (data) {
      data.task = task;
      await data.save();
      res.status(200).json({ message: "Updated Successfully" });
    } else {
      res.status(404).json({ message: "ID not Found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong try again later" });
  }
};
