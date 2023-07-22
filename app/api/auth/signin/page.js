"use client";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialLoginState = {
  email: "",
  password: "",
};
const Login = () => {
  const router = useRouter();
  const [loginState, setLoginState] = useState({ ...initialLoginState });

  const handleLoginChange = (e) => {
    setLoginState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleLoginForm = (e) => {
    e.preventDefault();
    const data = {
      email: loginState.email,
      password: loginState.password,
    };
    signIn("credentials", {
      ...data,
      redirect: true,
    }).then((res) => {
      if (res.error === "Invalid credentials") {
        return alert("Invalid credentials");
      } else if (res.error === null) {
        router.push("/");
      }
    });
  };
  return (
    <div>
      <button onClick={() => signIn("google")}>lOGIN WITH GOOGLE</button>
      <button onClick={() => signIn("github")}>lOGIN WITH GITHUB</button>
      <button onClick={() => signOut()}>signOut</button>
      <div>
        <form onSubmit={handleLoginForm}>
          <input
            className="h-12 w-80 outline-none"
            type="email"
            name="email"
            value={loginState.email}
            onChange={handleLoginChange}
            placeholder="Email"
          />
          <input
            className="h-12 w-80 outline-none"
            type="password"
            name="password"
            value={loginState.password}
            onChange={handleLoginChange}
            placeholder="Password"
          />
          <button className="h-12 w-24 bg-black text-white">submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
