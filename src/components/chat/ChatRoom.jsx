import { useState } from "react";
import Message from "./Message";
import CallEndIcon from "@mui/icons-material/CallEnd";
import VideocamIcon from "@mui/icons-material/Videocam";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import "../../animation/keyfarme.css";
const ChatRoom = ({ setOpenCard }) => {
  const [open, setOpen] = useState(false);
  const [openi, setOpeni] = useState(true);
  return (
    <>
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className={`fixed bottom-4 duration-[0.25s] right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer z-20 border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900 ${
          open ? "-translate-x-[450px]" : ""
        }`}
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white block border-gray-200 align-middle"
        >
          <path
            d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
            className="border-gray-200"
          ></path>
        </svg>
      </button>

      <div
        className={`fixed bottom-0 z-20 h-screen right-0 bg-white py-6 pl-6 duration-[0.25s] rounded-lg border border-[#e5e7eb] w-[440px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          boxShadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)",
        }}
      >
        <div
          className="pr-2 z-20 h-[calc(100vh-80px)] overflow-y-auto flex flex-col gap-4"
          style={{
            minWidth: "100%",
            "--scrollbar-width": "4px",
            "--scrollbar-height": "4px",
            "&::-webkit-scrollbar": {
              width: "var(--scrollbar-width)",
              height: "var(--scrollbar-height)",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#ccc",
              borderRadius: "4px",
            },
          }}
        >
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
        <div className="flex items-center h-12 pt-0">
          <form className="flex items-center justify-center w-full space-x-2">
            <input
              className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Type your message"
              value=""
            />
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2">
              Send
            </button>
          </form>
        </div>
      </div>

      <ul
        className={`fixed bottom-3 z-20 left-10 flex duration-[0.25s] bg-slate-400 overflow-hidden rounded-full  py-1 px-1 gap-4 ${
          !openi ? "" : "translate-y-[130%]"
        }`}
      >
        <li
          className="w-14 h-14 flex items-center justify-center hover:bg-slate-100 rounded-full duration-[0.25s] cursor-pointer "
          onClick={() => {
            setOpeni(!openi);
          }}
        >
          <a>
            <KeyboardDoubleArrowDownIcon />
          </a>
        </li>
        <li className="w-14 h-14 flex items-center justify-center hover:bg-slate-100 rounded-full duration-[0.25s] cursor-pointer ">
          <a>
            <VideocamIcon />
          </a>
        </li>
        <li className="w-14 h-14 flex items-center justify-center hover:bg-slate-100 rounded-full duration-[0.25s] cursor-pointer ">
          <a>
            <KeyboardVoiceIcon />
          </a>
        </li>
        <li className="w-14 h-14 flex items-center justify-center hover:bg-slate-100 rounded-full duration-[0.25s] cursor-pointer ">
          <a>
            <ScreenShareIcon />
          </a>
        </li>
        <li className="w-14 h-14 flex items-center justify-center hover:bg-slate-100 rounded-full duration-[0.25s] cursor-pointer ">
          <a>
            <MoreVertIcon />
          </a>
        </li>
        <li
          className="w-14 h-14 flex items-center justify-center bg-red-500 hover:bg-red-300 rounded-full duration-[0.25s] cursor-pointer "
          onClick={() => {
            setOpenCard(2);
          }}
        >
          <a>
            <CallEndIcon style={{ color: "white" }} />
          </a>
        </li>
      </ul>
      <button
        className={`bottom-4 z-20 left-4 duration-[0.25s] fixed w-16 h-16 bg-slate-300 rounded-full flex items-center justify-center cursor-pointer ${
          openi ? "" : "translate-y-[130%]"
        }`}
        onClick={() => {
          setOpeni(!openi);
        }}
      >
        <KeyboardDoubleArrowUpIcon />
      </button>
    </>
  );
};

export default ChatRoom;
