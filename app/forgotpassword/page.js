"use client";
import axios from "axios";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const handleForm = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/forgotpassword", { email })
      .then((res) => setMsg(res?.data?.msg))
      .catch((err) => setError(err.message));
  };
  return (
    <div>
      <form onSubmit={handleForm}>
        <input
          className="h-12 w-80 outline-none"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button className="h-12 w-24 bg-black text-white">submit</button>
      </form>
      <div>{msg && <p>{msg}</p>}</div>
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
};

export default ForgotPassword;
