import axios from "axios";
import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useAuth } from "../context/Context";
import { signinValidate } from "../helper/userValidate";
import Head from "next/head";

export default function SignIn() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsAdmin, setIsLoggedIn } = useAuth();
  const router = useRouter();

  const handleEmailChanges = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChanges = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = { email, password };

    const validationResult = signinValidate(form);
    if (validationResult?.error) {
      console.log(validationResult.message);
      return;
    }
    Login();
  };

  const Login = async () => {
    try {
      const res = await axios.post("http://localhost:8000/user/login", {
        email: email,
        password: password,
      });
      console.log(res?.data);
      setShowMessage(true);
      if (res.statusText === "OK") {
        setIsSuccess(true);
        Cookies.set("accessToken", res.data.accessToken);
        Cookies.set("refreshToken", res.data.refreshToken);
        Cookies.set("id", res.data.id);
        setUser(res?.data);
        setIsLoggedIn(true);
        router.push({
          pathname: "/",
          query: { ...res?.data.id },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Head>
        <title>Signin</title>
      </Head>
      <div className=" w-full max-w-xs">
        <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
        {showMessage && (
          <>
            {isSuccess ? (
              <div className="bg-green-200 text-green-800 p-4 mb-4 rounded">
                SignIn successful!
              </div>
            ) : (
              <div className="bg-red-200 text-red-800 p-4 mb-4 rounded">
                Check your info, try again!
              </div>
            )}
          </>
        )}
        <form
          method="POST"
          className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-4">
            <label
              htmlFor="email"
              className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4"
            >
              E-mail
            </label>
            <InputComponent
              type="email"
              className="focus:border-green-800"
              value={email}
              onChange={handleEmailChanges}
            />
            <label
              htmlFor="password"
              className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4"
            >
              Password
            </label>
            <InputComponent
              type="password"
              className="focus:border-green-800"
              value={password}
              onChange={handlePasswordChanges}
              placeholder="********"
            />
          </div>
          <ButtonComponent
            className="hover:bg-green-700 mt-5 rounded"
            onClick={handleSubmit}
            label="Sign In"
          />
          <a
            className=" font-bold text-sm text-green-800 ml-32 hover:text-green-700"
            href="/signup"
          >
            Register
          </a>
        </form>
      </div>
    </div>
  );
}
