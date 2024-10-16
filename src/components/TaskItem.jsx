import React from "react";

const TaskItem = ({ cauhoi, traloi, a, b, c, d, so }) => {
  return (
    <>
      <div className="container mx-auto my-10">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] w-full px-8 text-center lg:mb-20">
              <h2 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
                Câu hỏi {so}
              </h2>
              <p className="text-lg text-start text-body-color w-full break-words dark:text-dark-6">
                {cauhoi}
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 flex flex-col grow gap-4 lg:w-1/2">
            <div
              className={` h-max grow  p-5 rounded-xl ${
                traloi === "a" && "bg-gray-200"
              }`}
              style={{ boxShadow: "0 0 50px rgba(0, 0, 0, 0.1)" }}
            >
              A.{a}
            </div>
            <div
              className={` h-max grow  p-5 rounded-xl ${
                traloi === "c" && "bg-gray-200"
              }`}
              style={{ boxShadow: "0 0 50px rgba(0, 0, 0, 0.1)" }}
            >
              C.{c}
            </div>
          </div>
          <div className="w-full px-4 grow flex flex-col gap-5 lg:w-1/2">
            <div
              className={` h-max grow  p-5 rounded-xl ${
                traloi === "b" && "bg-gray-200"
              }`}
              style={{ boxShadow: "0 0 40px rgba(0, 0, 0, 0.1)" }}
            >
              B.{b}
            </div>
            <div
              className={` h-max grow  p-5 rounded-xl ${
                traloi === "d" && "bg-gray-200"
              }`}
              style={{ boxShadow: "0 0 40px rgba(0, 0, 0, 0.1)" }}
            >
              D.{d}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
