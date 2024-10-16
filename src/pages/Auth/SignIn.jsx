import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { toast } from "react-toastify";
import axios from "axios";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(import.meta.env.VITE_API_NODE_ENV === "production"
      ? import.meta.env.VITE_API_PRODUCTION
      : import.meta.env.VITE_API_DEVELOPMENT);
  const url =
    import.meta.env.VITE_API_NODE_ENV === "production"
      ? import.meta.env.VITE_API_PRODUCTION
      : import.meta.env.VITE_API_DEVELOPMENT;

  
  const handleSignIn = async () => {
    if (email === "" || pass === "") {
      toast.warning("Please fill all fields!");
    }
    dispatch({ type: "SET_SCREEN_LOADING", payload: { isLoading: true } });

    const data = await axios.post(`${url}/api/user/sign-in`, {
      email: email,
      password: pass,
    });
    dispatch({ type: "SET_SCREEN_LOADING", payload: { isLoading: false } });

    if (data.data.status === 200) {
      dispatch({
        type: "USER_LOGIN",
        payload: {
          name: data.data.message.CheckEmail.name,
          email: data.data.message.CheckEmail.email,
          avatar: data.data.message.CheckEmail.avatar,
          token: data.data.message.token,
          id: data.data.message.CheckEmail._id,
        },
      });

      localStorage.setItem("name", data.data.message.CheckEmail.name);
      localStorage.setItem("email", data.data.message.CheckEmail.email);
      localStorage.setItem("avatar", data.data.message.CheckEmail.avatar);
      localStorage.setItem("token", data.data.message.token);
      localStorage.setItem("id", data.data.message.CheckEmail._id);

      navigate("/");
      toast.success("Sign in success");
    }
    if (data.data.status === 210) {
      toast.warning(data.data.message);
    }
    if (data.data.status === 400) {
      toast.error("Something error in server!");
    }
  };
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className=" min-h-screen w-full bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <Link
            to="/sign-up"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            <p className="mt-2 text-center text-sm text-gray-600 max-w">
              Or create an account
            </p>{" "}
          </Link>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
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
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
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
                    autoComplete="current-password"
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSignIn}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
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

export default SignIn;
