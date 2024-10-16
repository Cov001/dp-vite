import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthEmail from "../../components/AuthEmail";
import { AppContext } from "../../App";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPass, setConfirm] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_PRODUCTION;


  const { dispatch } = useContext(AppContext);

  const handleAuthmail = async () => {
    if (name === "" || email === "" || confirmPass === "" || pass === "") {
      toast.warning("Please fill all fields!");
    }
    if (confirmPass !== pass) {
      return toast.warning("Password is not equal confirm password!");
    }
    dispatch({ type: "SET_SCREEN_LOADING", payload: { isLoading: true } });

    const data = await axios.post(`${url}/api/user/get-code`, { email: email });
    setTimeout(() => {
      dispatch({ type: "SET_SCREEN_LOADING", payload: { isLoading: false } });
    }, 1000);
    if (data.data.status === 200) {
      localStorage.setItem("nameSign", name);
      localStorage.setItem("emailSign", email);
      localStorage.setItem("passSign", pass);
      navigate("/auth-code");
    }
    if (data.data.status === 210) {
      return toast.warning(data.data.message);
    }
    if (data.data.status === 400) {
      return toast.error("Something error in server!");
    }
  };
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className=" min-h-screen w-full bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up your accout
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or{" "}
            <Link
              to="/sign-in"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in your account
            </Link>
          </p>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-4  px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    autoComplete="email"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={pass}
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    name="password"
                    type="password"
                    value={confirmPass}
                    onChange={(e) => {
                      setConfirm(e.target.value);
                    }}
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter confirm password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm"></div>
              </div>

              <div>
                <button
                  onClick={handleAuthmail}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>
            </div>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-100 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <img
                      className="h-5 w-5"
                      src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                      alt=""
                    />
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <img
                      className="h-6 w-6"
                      src="https://www.svgrepo.com/show/506498/google.svg"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
