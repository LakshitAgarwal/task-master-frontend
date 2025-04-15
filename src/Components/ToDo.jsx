import React, { useEffect, useState } from "react";
import { getUser } from "../utils/getUser";
import {
  Calendar,
  CircleCheck,
  CircleCheckBig,
  PenLine,
  Plus,
  Trash,
} from "lucide-react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { Select } from "@mui/material";

const ToDo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [allTodos, setAllToDos] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const createToDo = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/toDo/create-to-do", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getUser()?.token,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        console.log("Task added: ", result);
        setIsAdding(false);
        setTitle("");
        setDescription("");
        getToDos();
      } else {
        console.error("Error adding task:", result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getToDos = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/toDo/get-to-do/${getUser()?.userId}`,
        {
          method: "GET",
          headers: {
            Authorization: getUser()?.token,
          },
        }
      );
      const toDos = await res.json();

      if (res.ok) {
        console.log("Your To-Dos: ", toDos);
        setAllToDos(toDos);
      } else {
        console.error("Error fetching todos:", toDos.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (item) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/toDo/delete-to-do/${item._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: getUser()?.token,
          },
        }
      );
      const result = await res.json();

      if (res.ok) {
        console.log("Task deleted: ", result);
        getToDos();
        toast.error("Task Deleted ‼️", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        console.error("Error deleting task:", result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setEditingTodo(item);
    setTitle(item.title);
    setDescription(item.description);
    setIsEditing(true);
  };

  const updateTodo = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/toDo/update-to-do/${editingTodo._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: getUser()?.token,
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );
      const result = await res.json();
      if (res.ok) {
        console.log("Task updated: ", result);
        getToDos();
        toast.info("Task Updated Successfully ✏️", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        handleCancelEditModal();
      } else {
        console.error("Error updating task:", result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleted = async (item) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/toDo/update-to-do/${item._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: getUser()?.token,
          },
          body: JSON.stringify({
            isCompleted: !item.isCompleted,
          }),
        }
      );
      const result = await res.json();
      if (res.ok) {
        console.log("Task completed: ", result);
        getToDos();
        toast.success("YAY! Task Completed 👏", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        console.error("Error completing task:", result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (getUser() && getUser()?.userId) {
      getToDos();
    } else {
      navigate("/login");
    }
  }, []);

  const handleSubmit = () => {
    if (!title || !description) return alert("Please fill both fields");
    createToDo({
      title,
      description,
      isCompleted: false,
      createdBy: getUser()?.userId,
    });
    toast.success("Task Created Successfully 🎉", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleCancelModal = () => {
    setIsAdding(false);
    setTitle("");
    setDescription("");
  };

  const handleCancelEditModal = () => {
    setIsEditing(false);
    setEditingTodo(null);
    setTitle(" ");
    setDescription(" ");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const todosFiltered = allTodos.filter((todo) =>
      todo.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(todosFiltered);
  };

  return (
    <div className="p-6 mx-auto">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-32 mb-6 mt-5 mx-4 md:mx-10">
        <h1 className="hidden md:block text-3xl font-bold text-indigo-700 mb-4 md:mb-0">
          My Tasks
        </h1>

        <div className="w-full mb-5 md:mb-0 md:flex-1">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search tasks"
            className="w-full border border-gray-300 px-4 py-2 rounded-full"
          />
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="w-full md:w-auto cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center md:justify-start transition duration-200 shadow-md"
        >
          <Plus className="h-5 w-5 mr-1" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Add Modal */}
      {isAdding && (
        <div className="fixed px-5 md:px-0 inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full border border-gray-300 px-3 py-2 mb-4 rounded"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full border border-gray-300 px-3 py-2 mb-4 rounded"
              rows="4"
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelModal}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={title.length === 0}
                onClick={handleSubmit}
                className={`px-4 py-2 rounded text-white ${
                  title.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 cursor-pointer"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed px-5 md:px-0 inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full border border-gray-300 px-3 py-2 mb-4 rounded"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full border border-gray-300 px-3 py-2 mb-4 rounded"
              rows="4"
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelEditModal}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={title.length === 0}
                onClick={updateTodo}
                className={`px-4 py-2 rounded text-white ${
                  title.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }`}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* all to dos */}
      <div>
        {allTodos.length === 0 ? (
          <div className="mt-16 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
              <Calendar className="h-8 w-8 text-indigo-600" />
            </div>

            <h3 className="text-lg font-medium text-gray-900">
              No tasks found
            </h3>

            <p className="mt-4 text-sm text-gray-500 ">
              Click{" "}
              <span className="font-semibold mx-1 text-indigo-600 border-1 border-indigo-600 rounded-md bg-blue-50 px-2 py-1">
                Add Task
              </span>{" "}
              to create a new task.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 md:gap-8 mx-auto justify-center mt-5 md:mt-14">
            {(searchQuery.length > 0 ? filteredList : allTodos).map((todo) => {
              const formattedDate = new Date(todo.createdAt).toLocaleString(
                "en-US",
                {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              );

              return (
                <div
                  key={todo._id}
                  className="bg-white shadow-md rounded-lg my-4 p-4 w-full max-w-[26rem] transition-transform"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h1 className="text-xl font-semibold text-gray-800">
                      {todo.title}
                    </h1>
                    <span
                      className={`px-3 py-1 text-sm rounded-full border font-medium ${
                        todo.isCompleted
                          ? "text-green-600 border-green-200 bg-green-50"
                          : "text-yellow-600 border-yellow-200 bg-yellow-50"
                      }`}
                    >
                      {todo.isCompleted ? "Completed" : "Pending"}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-3 border-b-1 max-w-fit border-gray-200 pb-5">
                    {todo.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="bg-gray-100 rounded px-3 py-1 inline-block text-sm text-gray-700 font-medium mb-3">
                      {formattedDate}
                    </div>

                    <div className="flex gap-4 items-center">
                      <PenLine
                        onClick={() => handleEdit(todo)}
                        className="text-blue-600 cursor-pointer hover:scale-110 transition-transform  hover:bg-blue-100 rounded-full p-1"
                      />
                      <Trash
                        onClick={() => handleDelete(todo)}
                        className="text-red-600 cursor-pointer hover:scale-110 transition-transform  hover:bg-red-100 rounded-full p-1"
                      />
                      <CircleCheckBig
                        onClick={() => {
                          if (!todo.isCompleted) handleCompleted(todo);
                        }}
                        className={
                          todo.isCompleted
                            ? `text-amber-600 hover:scale-100 transition-transform bg-gray-100 rounded-full p-1 cursor-not-allowed`
                            : `text-green-600 cursor-pointer hover:scale-110 transition-transform hover:bg-green-100 rounded-full p-1`
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToDo;
