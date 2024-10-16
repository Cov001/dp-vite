import React from "react";
import CardTask from "../../components/Card/CardTask";
import { Divider } from "@mui/material";
import CardAnswerSumit from "../../components/Card/CardAnswerSubmit";

const Contest = () => {
  return (
    <div className="min-h-screen flex w-full">
      {/* <CardAnswerSumit /> */}
      <div className="w-1/6 h-full">
        <div className=" w-20 sm:w-36 lg:w-56 2xl:w-72 h-[550px] 2xl:h-[1150px] rounded-lg fixed top-[50%] border-[1.5px] -translate-y-[50%] left-2 shadow-lg flex flex-col items-center justify-evenly">
          <img
            className="h-20 w-20 flex-shrink-0 rounded-full bg-gray-300"
            src="https://qph.cf2.quoracdn.net/main-thumb-554097988-200-xietklpojlcioqxaqgcyykzfxblvoqrb.jpeg"
            alt=""
          />
          <div>
            <p>Contest 1</p>
            <p>00:54:54</p>
          </div>
          <button className="shadow-lg p-2 border-[1.5px] rounded-lg font-semibold text-white bg-blue-500">
            Submit
          </button>
        </div>
      </div>
      <div className="p-4 w-5/6 h-full flex flex-col gap-16">
        <CardTask />
        <CardTask />
        <CardTask />
      </div>
    </div>
  );
};

export default Contest;
