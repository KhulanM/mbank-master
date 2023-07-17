import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useAuth } from "../context/Context";

const Navbar = ({ data }) => {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const isAdmin = user?.userTypes === "admin";

  axios.interceptors.request.use(
    (config) => {
      const token = Cookies.get("accessToken");
      if (!token) {
        return config;
      }
      config.headers.set("token", token);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-green-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            {user ? user.name : "Guest"}
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-green-900 dark:focus:ring-green-900"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-green-900 dark:bg-green-900 md:dark:bg-greene-900 dark:border-gray-700">
            <li>
              <p
                onClick={() => {
                  router.push("/");
                }}
                className="block py-2 pl-3 pr-4 text-white bg-green-700 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                aria-current="page"
              >
                Home
              </p>
            </li>
            {isLoggedIn && (
              <li>
                <p
                  onClick={() => {
                    router.push("/profile");
                  }}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 md:p-0 dark:text-white md:dark:hover:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Profile
                </p>
              </li>
            )}

            {isAdmin && (
              <li>
                <p
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 md:p-0 dark:text-white md:dark:hover:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Dashboard
                </p>
              </li>
            )}
            {isLoggedIn ? (
              <li>
                <a
                  onClick={handleLogout}
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 md:p-0 dark:text-white md:dark:hover:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Log Out
                </a>
              </li>
            ) : (
              <div className="flex justify-between space-x-6">
                <li>
                  <a
                    onClick={() => {
                      router.push("/signin");
                    }}
                    href="#"
                    className="py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 md:p-0 dark:text-white md:dark:hover:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Sign In
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      router.push("/signup");
                    }}
                    href="#"
                    className="py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 md:p-0 dark:text-white md:dark:hover:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Sign Up
                  </a>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
