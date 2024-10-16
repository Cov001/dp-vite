import { useState } from "react";

const TaskMain = ({ cauhoi, a, b, c, d, so, id, updateAnswer, answer }) => {
  const [cd, setCd] = useState("");
  return (
    <div className="container mx-auto my-10">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4">
          <div className="mx-auto mb-[60px] w-full px-8 text-center lg:mb-20">
            <h2
              id={id}
              className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]"
            >
              Câu hỏi {so}
            </h2>
            <p className="text-lg text-start text-body-color w-full break-words dark:text-dark-6">
              {cauhoi}
            </p>
          </div>
        </div>
      </div>

      <div className="-mx-4 flex flex-wrap gap-4">
        <div className="w-full px-4 flex flex-col grow gap-4 lg:w-1/2">
          <div
            className={`h-max grow p-5 rounded-xl ${
              cd === "a" ? "bg-slate-300" : ""
            }`}
            style={{ boxShadow: "0 0 50px rgba(0, 0, 0, 0.2)" }}
            onClick={() => {
              updateAnswer(so - 1, "a");
              setCd("a");
            }}
          >
            A. {a}
          </div>

          <div
            className={`h-max grow p-5 rounded-xl ${
              cd == "b" ? "bg-slate-300" : ""
            }`}
            style={{ boxShadow: "0 0 40px rgba(0, 0, 0, 0.2)" }}
            onClick={() => {
              updateAnswer(so - 1, "b");
              setCd("b");
            }}
          >
            B. {b}
          </div>
        </div>
        <div className="w-full px-4 grow flex flex-col gap-5 lg:w-1/2">
          <div
            className={`h-max grow p-5 rounded-xl ${
              cd == "c" ? "bg-slate-300" : ""
            }`}
            style={{ boxShadow: "0 0 50px rgba(0, 0, 0, 0.2)" }}
            onClick={() => {
              updateAnswer(so - 1, "c");
              setCd("c");
            }}
          >
            C. {c}
          </div>
          <div
            className={`h-max grow p-5 rounded-xl ${
              cd == "d" ? "bg-slate-300" : ""
            }`}
            style={{ boxShadow: "0 0 40px rgba(0, 0, 0, 0.2)" }}
            onClick={() => {
              updateAnswer(so - 1, "d");
              setCd("d");
            }}
          >
            D. {d}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskMain;
