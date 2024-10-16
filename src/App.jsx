import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useReducer, useEffect, useState } from "react";
import { initialState, reducer } from "./store";
import { ToastContainer } from "react-toastify";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import ForgotPassWord from "./pages/Auth/ForgotPassWord";
import Navbar from "./components/Navbar";
// import CreateRoom from "./Page/HomeRoom/CreateRoom";
// import Room from "./Page/HomeRoom/Room";
// import { useEffect, useState } from "react";
import ListRoom from "./pages/HomeRoom/ListRoom";
// import TestRoom from "./Page/HomeRoom/TestRoom";
// import { useContext } from "react";
import RoomChat from "./pages/ChatRoom/RoomChat";
// import Maybe from "./Page/Maybe/Maybe";
import ListContest from "./pages/Contest/ListContest";
import ContestCreate from "./pages/Contest/ContestCreate";
import MyContest from "./pages/Contest/MyContest";
// import Contest from "./Page/Contest/Contest";
// import Toast from "./Components/ToastSuccess";
// import AuthCode from "./Page/Auth/AuthCode";
import AuthEmail from "./components/AuthEmail";
import StartContest from "./pages/Contest/StartContest";
import TableResult from "./pages/Contest/TableResult";
import FormUpdateContest from "./components/FormUpdateContest";
import FormInfoContest from "./components/FormInfoContest";
import Meet from "./pages/Meet";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import PrepareRoom from "./pages/PrepareRoom";
import "./animation/fontawesome-free-6.6.0-web/css/all.min.css";

export const AppContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const navigate = useNavigate();
  const enviromentAPI = import.meta.env.VITE_API_NODE_ENV;
  const developmentAPI = import.meta.env.VITE_API_DEVELOPMENT;
  const productionAPI = import.meta.env.VITE_API_PRODUCTION;

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      dispatch({ type: "USER_LOGIN", payload: userData });
    }
    const url = enviromentAPI === "production" ? productionAPI : developmentAPI;

    console.log(`Environment: ${enviromentAPI}`);
    const socket = io(url, {});

    dispatch({ type: "SET_SOCKET_CONNECTION", payload: { socket: socket } });

    socket.on("connect", () => {
      console.log(socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);
  useEffect(() => {
    if (
      location.pathname !== "/sign-in" &&
      location.pathname !== "/sign-up" &&
      location.pathname !== "/forgot-password"
    ) {
      if (localStorage.getItem("userData") === null) {
        navigate("/sign-in");
      }
    }
  }, [location.pathname, localStorage.getItem("userData"), navigate]);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {!state.screenLoading ? (
        <>
          <div className="h-20 w-full z-50 fixed top-0">
            {state.openNav && <Navbar />}
          </div>
          <div className="min-h-screen w-full z-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/room/:roomId" element={<Meet />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/auth-code" element={<AuthEmail />} />
              <Route path="/list-room" element={<ListRoom />} />
              <Route path="/chat-room" element={<RoomChat />} />
              <Route path="/list-test" element={<ListContest />} />
              <Route path="/my-contest" element={<MyContest />} />
              <Route path="/create-contest" element={<ContestCreate />} />
              <Route path="/start-contest/:id" element={<StartContest />} />
              <Route path="/table-result/:id" element={<TableResult />} />
              <Route path="/forgot-password" element={<ForgotPassWord />} />

              <Route
                path="/form-info-contest/:id"
                element={<FormInfoContest />}
              />
              <Route
                path="/form-update-contest/:id"
                element={<FormUpdateContest />}
              />
              <Route path="/prepare-room/:idRoom" element={<PrepareRoom />} />
            </Routes>
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
        </div>
      )}
      <ToastContainer />
    </AppContext.Provider>
  );
}

export default App;
