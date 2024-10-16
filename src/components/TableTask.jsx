import React, { useState } from "react";
import TaskItem from "./TaskItem";
import ClearIcon from "@mui/icons-material/Clear";

const TableTask = ({ excelData, setO }) => {
  return (
    <section className="relative z-10 overflow-hidden w-full h-full bg-white pb-12 pt-10 dark:bg-dark lg:pb-[90px] lg:pt-[80px]">
      <button
        onClick={() => {
          setO(false);
        }}
        className="absolute top-15 right-10 bg-gray-200 p-2 rounded-lg"
      >
        <ClearIcon />
      </button>
      {excelData.map((item, index) => {
        return (
          <TaskItem
            cauhoi={item.CauHoi}
            key={index}
            so={index + 1}
            traloi={item.TRUE}
            a={item.a}
            b={item.b}
            c={item.c}
            d={item.d}
          />
        );
      })}
    </section>
  );
};

export default TableTask;
