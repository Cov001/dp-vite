import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassWord = () => {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState(""); // Khởi tạo email với chuỗi rỗng
  const [code, setCode] = useState(""); // Khởi tạo code với chuỗi rỗng
  const [pass, setPass] = useState(""); // Khởi tạo pass với chuỗi rỗng
  const [confirmPass, setConfirmPass] = useState(""); // Khởi tạo confirmPass với chuỗi rỗng
  const { dispatch } = useContext(AppContext);
  const url = import.meta.env.VITE_API_PRODUCTION;

  const navigate = useNavigate();
  const handleSendRequest = async () => {
    if (email === "") {
      return toast.warning("Please fill all fields!");
    }
    // dispatch({ type: "SET_SCREEN_LOADING", payload: { isLoading: true } });

    const data = await axios.post(`${url}/api/user/send-code-forgot-pass`, {
      email: email,
    });
    // dispatch({ type: "SET_SCREEN_LOADING", payload: { isLoading: false } });

    if (data.status === 200) {
      setOpen(false);
    } else if (data.status === 400 || data.status === 210) {
      toast.warning("Something went wrong!");
    }
  };
  const handleChangePass = async () => {
    if (code === "" || pass === "" || confirmPass === "") {
      return toast.warning("Please fill all fields!");
    }
    if (pass !== confirmPass) {
      return toast.warning("Passwords do not match!");
    }
    dispatch({ type: "SET_SCREEN_LOADING", payload: { isLoading: true } });

    const data = await axios.post(`${url}/api/user/reset-pass`, {
      email: email,
      code: code,
      newPass: pass,
    });

    setTimeout(() => {
      dispatch({ type: "SET_SCREEN_LOADING", payload: { isLoading: false } });

      if (data.data.status === 200) {
        toast.success("Password changed successfully");
        navigate("/sign-in");
        return;
      } else if (data.data.status === 210) {
        return toast.warning(data.data.message);
      } else if (data.data.status === 400) {
        return toast.error("Something went wrong on the server!");
      }
    }, 1500);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {open ? (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Input your email
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email} // Thêm value để đảm bảo input controlled
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleSendRequest}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              We sent a code to your email
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Code
                  </label>
                  <div className="mt-1">
                    <input
                      id="code"
                      name="code"
                      value={code} // Thêm value để đảm bảo input controlled
                      onChange={(e) => setCode(e.target.value)}
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter the code"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={pass} // Thêm value để đảm bảo input controlled
                      onChange={(e) => setPass(e.target.value)}
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your new password"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      value={confirmPass} // Thêm value để đảm bảo input controlled
                      onChange={(e) => setConfirmPass(e.target.value)}
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <button className="font-medium text-blue-600 hover:text-blue-500">
                      Resend code!
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleChangePass}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassWord;
