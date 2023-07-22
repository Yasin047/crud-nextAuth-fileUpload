"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
};
const Register = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({ ...initialState });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const data = {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    };
    const res = axios
      .post("/api/register", data)
      .then((res) => {
        setMsg(res?.data?.msg);
      })
      .catch((error) => setError(error.message));
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmitForm}>
          <input
            className="h-12 w-80 "
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            className="h-12 w-80 "
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            className="h-12 w-80 "
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button className="h-12 w-24 bg-black text-white">submit</button>
        </form>
      </div>
      {msg && <p>{msg}</p>}
      {/* <div>{error && { error }}</div> */}
    </div>
  );
};

export default Register;
