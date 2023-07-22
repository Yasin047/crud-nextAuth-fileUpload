"use client";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState("");
  const [getTodo, setGetTodo] = useState("");
  const [isUpdate, setIsUpdate] = useState("");
  const [msg, setMsg] = useState("");

  const getAllTodos = () => {
    const res = axios
      .get("/api/todo")
      .then((res) => setGetTodo(res?.data))
      .catch((error) => console.log(error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isUpdate == "") {
      if (todo.length > 2) {
        const res = await axios
          .post("/api/todo", { todo })
          .then((res) => setMsg(res.data.msg))
          .catch((error) => console.log(error));
        getAllTodos();
        setLoading(false);
        setTodo("");
      } else {
        alert("please provide minimum 3 characters");
      }
    } else {
      const res = await axios
        .put(`/api/todo/${isUpdate}`, { todo })
        .then((res) => setMsg(res.data.msg))
        .catch((error) => console.log(error));
      getAllTodos();
      setLoading(false);
      setIsUpdate("");
      setTodo("");
    }
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`/api/todo/${id}`)
      .then((res) => setMsg(res.data.msg))
      .catch((error) => console.log(error));
    getAllTodos();
  };
  const handleUpdate = ({ id, todo }) => {
    setIsUpdate(id);
    setTodo(todo);
  };

  useEffect(() => {
    setLoading(true);
    getAllTodos();
    setLoading(false);
  }, []);
  const emailType = "VERIFY";
  return (
    <main>
      <Link href="/register">Register</Link>
      <button onClick={() => signIn()}>LogIn</button>
      <button onClick={() => signOut()}>LogOut</button>
      <Link href="/forgotpassword">Forgot Password</Link>
      <Link href="/image">Image Upload</Link>

      {JSON.stringify(session)}
      <div>
        <h1 className="text-white w-80 h-[60px] flex justify-center items-center bg-blue-950 text-3xl font-bold mx-auto ">
          Todo App
        </h1>

        <form
          className="flex justify-center items-center mt-10"
          onSubmit={handleSubmit}
        >
          <input
            className="h-12 w-80 outline-none"
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="h-12 w-24 bg-black text-white">submit</button>
        </form>
        {
          <div>
            <h2 className=" text-center mt-10">
              {loading ? "Loading..." : <div>{msg}</div>}
            </h2>
          </div>
        }
        <div className="mt-10">
          {getTodo.length > 0 ? (
            <>
              {getTodo?.map(({ id, todo }) => (
                <div
                  key={id}
                  className=" w-96 mx-auto flex justify-between items-center gap-10 mt-5 border-2 px-8 py-6"
                >
                  <div>{todo}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate({ id, todo })}
                      className="h-12 w-24 bg-black text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="h-12 w-24 bg-black text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center">
              {loading ? "loading..." : "No todo found..."}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
