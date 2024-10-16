import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { Divider } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
const CardMyContest = ({ img, status, name, des, idContest }) => {
  return (
    <div className="col-span-1 w-full h-max divide-y border-[1.5px] divide-gray-200 rounded-lg bg-white shadow">
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-md font-medium text-gray-900">
              {name}
            </h3>
            <span
              className={`inline-flex flex-shrink-0 items-center rounded-full  px-1.5 py-0.5 text-xs font-medium  ring-1 ring-inset  ${
                status === "cm" &&
                "text-green-600 bg-green-50 ring-green-600/20"
              } ${
                status === "pr" && "text-blue-600 bg-blue-50 ring-blue-600/20"
              } ${
                status === "fi" &&
                "text-yellow-600 bg-yellow-50 ring-yellow-600/20"
              }`}
            >
              {status === "cm" && "Coming"}
              {status === "pr" && "Progress"}
              {status === "fi" && "Finished"}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">{des}</p>
        </div>
        <img
          className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
          src={img}
          alt=""
        />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            {status === "cm" && (
              <>
                <Link
                  to={`/form-update-contest/${idContest}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 "
                >
                  Update
                </Link>
                <div className="w-[1px] h-full rounded-lg bg-slate-200"></div>
              </>
            )}
            {(status === "pr" || status === "fi") && (
              <>
                <Link
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  to={`/table-result/${idContest}`}
                >
                  View Result
                </Link>
                <div className="w-[1px] h-full rounded-lg bg-slate-200"></div>
                <Link
                  to={`/form-info-contest/${idContest}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 "
                >
                  View Info
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMyContest;
