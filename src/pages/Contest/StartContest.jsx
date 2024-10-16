import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../App";
import TaskMain from "../../components/TaskMain";
import { Pagination } from "antd";
import classNames from "classnames";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";

const TableTask = () => {
  const { state, dispatch } = useContext(AppContext);
  const [dataContest, setDataContest] = useState([]);
  const [dataTask, setDataTask] = useState([]);
  const [current, setCurrent] = useState(1);
  const [timeEnd, setTimeEnd] = useState(null); // Store timeEnd
  const [timeLeft, setTimeLeft] = useState(""); // Store countdown time
  const [answer, setAnswer] = useState([]); // Store answers
  const [showAnswers, setShowAnswers] = useState(false); // State to toggle answers visibility
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const usT = userData ? userData.token : null;

  const url =
    import.meta.env.VITE_API_NODE_ENV === "production"
      ? import.meta.env.VITE_API_PRODUCTION
      : import.meta.env.VITE_API_DEVELOPMENT;

  const { id } = useParams();

  const onChange = (page) => {
    setCurrent(page);

    const targetElement = document.getElementById(`task-${page}`);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(
          `${url}/api/contest/start-exam`,
          { id: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${usT}`,
            },
          }
        );
        const contestData = response.data.message;
        console.log(contestData);
        if (response.data.status === 205) {
          setSuccess(true);
          return;
        }

        if (response.data.status === 200) {
          // Initialize answer array with empty values based on the number of tasks
          setAnswer(new Array(contestData.length).fill(""));

          setDataContest(contestData);

          // Initialize or update count in localStorage
          let count = localStorage.getItem("count");
          if (count === null) {
            count = 0;
          } else {
            count = parseInt(count, 10);
            count += 1; // Convert to number
          }
          localStorage.setItem("count", count); // Store initial count
          setTimeEnd(new Date(response.data.timeEnd)); // Set timeEnd from API
        } else {
          dispatch({
            type: "SET_SCREEN_LOADING",
            payload: { isLoading: false },
          });
          return toast.warning(contestData);
        }
      } catch (error) {
        dispatch({
          type: "SET_SCREEN_LOADING",
          payload: { isLoading: false },
        });
        return toast.error("Error fetching data!");
      }
    };

    getData();
  }, [id, usT]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (Array.isArray(dataContest) && dataContest.length > 0) {
          const tasks = await Promise.all(
            dataContest.map(async (contest) => {
              const taskResponse = await axios.post(
                `${url}/api/contest/get-task`,
                { taskId: contest }
              );
              return taskResponse.data;
            })
          );
          setDataTask(tasks);
        } else {
          console.error(
            "dataContest is not an array or is empty:",
            dataContest
          );
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    if (dataContest && dataContest.length > 0) {
      fetchTasks();
    }
  }, [dataContest]);

  // Countdown logic
  useEffect(() => {
    if (timeEnd) {
      const countdown = setInterval(() => {
        const now = new Date();
        const timeDiff = timeEnd - now;

        if (timeDiff <= 0) {
          clearInterval(countdown);
          setTimeLeft("Time's up!");
        } else {
          const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
          const seconds = Math.floor((timeDiff / 1000) % 60);
          setTimeLeft(`${hours}:${minutes}:${seconds}`);
        }
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [timeEnd]);

  // Visibility change handler
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        let count = localStorage.getItem("count");
        count = count ? parseInt(count, 10) + 1 : 1;
        localStorage.setItem("count", count.toString());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const updateAnswer = (index, value) => {
    setAnswer((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = value;
      return updatedAnswers;
    });
  };

  const toggleAnswers = () => {
    setShowAnswers((prev) => !prev);
  };

  const submitResult = async () => {
    try {
      const data = await axios.post(
        `${url}/api/contest/submit-result`,
        {
          MangTraLoi: answer,
          ContestId: id,
          OutTab: localStorage.getItem("count").toString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usT}`,
          },
        }
      );
      console.log(data);
      if (data.data.status === 200) {
        setOpen(false);

        localStorage.removeItem("count");
        return toast.success("Submit result success!!");
      }
      if (data.data.status === 210) {
        return toast.warning(data.data.message);
      }
      if (data.data.status === 400) {
        dispatch({
          type: "SET_SCREEN_LOADING",
          payload: { isLoading: false },
        });
        return toast.error("Error fetching data!");
      }
    } catch (error) {
      dispatch({
        type: "SET_SCREEN_LOADING",
        payload: { isLoading: false },
      });
      return toast.error("Error fetching data!");
    }
  };

  return (
    <section className="relative z-10 overflow-hidden w-full h-full bg-white pb-12 pt-10 dark:bg-dark lg:pb-[90px] lg:pt-[80px]">
      {success ? (
        <div className="bg-white border fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-slate-200 grid grid-cols-6 gap-2 max-w-[700px] max-h-[300px] rounded-xl p-2 text-sm">
          <h1 className="text-center text-xl col-span-6">
            Bạn đã hoàn thành bài thi, bạn có thể đóng góp ý kiến vào hòm thư
            bên dưới nhé!
          </h1>
          <textarea
            placeholder="Your feedback..."
            className="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
          />
          <div className="flex justify-between w-full col-span-6">
            <button className="bg-slate-100 px-12 stroke-slate-600 border border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 hover:text-white focus:stroke-blue-200 focus:bg-blue-400">
              <KeyboardReturnIcon />
            </button>
            <button className="bg-slate-100 px-12 stroke-slate-600 border border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 hover:text-white focus:stroke-blue-200 focus:bg-blue-400">
              <SendIcon />
            </button>
          </div>
        </div>
      ) : (
        <>
          {open && (
            <div className="fixed bg-white bg-opacity-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog">
                <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
                  <div className="opacity-25 w-full h-full absolute z-10 inset-0"></div>
                  <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
                    <div className="md:flex items-center">
                      <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                        <span className="text-3xl"></span>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                        <p className="font-bold">Thông báo!</p>
                        <p className="text-sm text-gray-700 mt-1">
                          Sau khi nộp bài, kết quả sẽ được chấm. Mỗi thí sinh
                          chỉ có một lượt thi duy nhất, kết quả bài thi sẽ được
                          công bố khi bài thi kết thúc!
                        </p>
                      </div>
                    </div>
                    <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                      <button
                        onClick={submitResult}
                        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-200 text-green-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                      >
                        Send
                      </button>
                      <button
                        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {dataTask.map((item, index) => (
            <TaskMain
              id={`task-${index + 1}`}
              cauhoi={item.message.task}
              key={index}
              so={index + 1}
              a={item.message.a}
              b={item.message.b}
              c={item.message.c}
              d={item.message.d}
              updateAnswer={updateAnswer}
              answer={answer[index]}
            />
          ))}
          <div
            className="fixed bottom-0 left-0 right-0 bg-white p-2 flex items-center justify-center gap-4"
            style={{ boxShadow: "0 0 50px rgba(0, 0, 0, 0.2)" }}
          >
            <button
              className="text-md font-semibold bg-blue-500 absolute left-4 text-white p-2 rounded-lg"
              onClick={toggleAnswers}
            >
              Check question
            </button>

            {/* Show answer list when `showAnswers` is true */}
            <div
              className={classNames(
                "w-[200px] h-[250px] fixed left-1 bottom-16 bg-white duration-[0.5s] grid grid-cols-5 grid-rows-10 overflow-y-auto p-2 gap-2 rounded-sm",
                {
                  "opacity-100 transform translate-x-0": showAnswers,
                  "opacity-0 transform -translate-x-full": !showAnswers,
                }
              )}
              style={{
                boxShadow: "0 0 50px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
              }}
            >
              {answer.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center p-4 border border-gray-300 ${
                    answer[index] === "" ? "" : "bg-slate-200"
                  }`}
                >
                  <p>{index + 1}</p>: <p>{item}</p>
                </div>
              ))}
            </div>

            {/* Countdown Timer */}
            <div className="text-md font-semibold rounded-xl">
              Time end: {timeLeft}
            </div>

            {/* Pagination */}
            <Pagination
              total={
                Array.isArray(dataContest) &&
                dataContest.length > 0 &&
                dataContest[0]
                  ? dataContest[0].length
                  : 0
              }
              current={current}
              onChange={onChange}
            />

            <button
              onClick={() => {
                setOpen(true);
              }}
              className="text-md absolute right-12 font-semibold bg-blue-500 text-white p-2 rounded-lg"
            >
              Nộp bài
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default TableTask;
