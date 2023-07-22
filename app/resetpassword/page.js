"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const initialLoginState = {
  password: "",
  confirmPassword: "",
};
const ResetPassword = () => {
  const [loginState, setLoginState] = useState({ ...initialLoginState });
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const handleLoginChange = (e) => {
    setLoginState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleForm = async (e) => {
    e.preventDefault();
    if (!(loginState.password === loginState.confirmPassword)) {
      return alert("Password do not match");
    } else {
      const data = {
        password: loginState.password,
        token: token,
      };
      await axios
        .post("/api/resetpassword", data)
        .then((res) => {
          if (res?.data?.success === true) {
            setMsg(res?.data?.message);
            setVerified(true);
          }
          setLoginState(...initialLoginState);
        })
        .catch((err) => setError(error?.message));
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    const decodedString = urlToken.replace(/%24/g, "$");
    const finalToken = decodedString.replace(/%2F/g, "/");
    setToken(finalToken || "");
  }, []);

  return (
    <div>
      <form onSubmit={handleForm}>
        <input
          className="h-12 w-80 outline-none"
          type="password"
          name="password"
          value={loginState.password}
          onChange={handleLoginChange}
          placeholder="Password"
        />
        <input
          className="h-12 w-80 outline-none"
          type="password"
          name="confirmPassword"
          value={loginState.confirmPassword}
          onChange={handleLoginChange}
          placeholder="Confirm Password"
        />
        <button className="h-12 w-24 bg-black text-white">submit</button>
      </form>
      <div>
        {!token && "no token available"}
        {verified && (
          <div>
            <p>{msg}</p> <Link href="/api/auth/signin">Login</Link>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
