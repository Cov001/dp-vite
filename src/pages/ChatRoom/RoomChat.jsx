import React from "react";
import VerticalNav from "../../components/VerticalNav";
import SendIcon from "@mui/icons-material/Send";
import Message from "../../components/chat/Message";
const RoomChat = () => {
  return (
    <div className="h-screen flex flex-col w-full">
      <div className=" h-20 w-full"></div>
      <div className="grow flex">
        <VerticalNav />
        <div className="grow">
          <form className="w-[500px] z-20 min-w-[140px] fixed bottom-3 left-[40%] mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                id="default-search"
                className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-4 pt-1 pb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center"
              >
                <SendIcon style={{ color: "white" }} />
              </button>
            </div>
          </form>

          <div className="w-[calc(100vw-280px)] relative ml-[260px] h-[calc(100vh - 80px)] p-4">
            <div className="w-full h-max mt-[90px] flex flex-col gap-4">
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
            </div>
            <div className="w-full h-[60px] "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomChat;
