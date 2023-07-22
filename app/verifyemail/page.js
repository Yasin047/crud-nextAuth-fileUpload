"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const verifyEmail = async () => {
    try {
      await axios.post("api/verifyemail", { token }).then((res) => {
        if (res?.data?.success === true) {
          setMsg(res?.data?.message);
          setVerified(true);
        }
      });
    } catch (error) {
      setError(error?.message);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    const decodedString = urlToken.replace(/%24/g, "$");
    const finalToken = decodedString.replace(/%2F/g, "/");
    setToken(finalToken || "");
  }, []);

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else return;
  }, [token]);

  return (
    <div>
      {token ? `${token}` : "no token available"}
      {verified && (
        <div>
          <p>{msg}</p> <Link href="/api/auth/signin">Login</Link>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default VerifyEmailPage;
