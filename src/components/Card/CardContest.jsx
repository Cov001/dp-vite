import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";
import axios from "axios";
import CircularIndeterminate from "../Loading";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
const CardContest = ({
  examEnd,
  examStart,
  resEnd,
  resStart,
  avaAd,
  nameAd,
  des,
  name,
  listRes,
  idAd,
  contestId,
}) => {
  const [resCountdown, setResCountdown] = useState(""); // Thời gian đếm ngược cho resEnd
  const [examCountdown, setExamCountdown] = useState(""); // Thời gian đếm ngược cho examStart
  const { dispatch } = useContext(AppContext);
  const [res, setRes] = useState(0);
  const url = import.meta.env.VITE_API_PRODUCTION;


  useEffect(() => {
    const calculateTimeLeft = (targetTime) => {
      const difference = new Date(targetTime) - new Date();
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        return `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      } else {
        return "00:00:00";
      }
    };

    const updateCountdowns = () => {
      setResCountdown(calculateTimeLeft(resEnd));
      setExamCountdown(calculateTimeLeft(examStart));
    };

    updateCountdowns(); // Khởi tạo đếm ngược
    const timer = setInterval(updateCountdowns, 1000); // Cập nhật đếm ngược mỗi giây

    return () => clearInterval(timer); // Dọn dẹp khi component unmount
  }, [resEnd, examStart]);
  useEffect(() => {
    const check = () => {
      for (let i = 0; i < listRes.length; ++i) {
        if (listRes[i] === idAd) {
          return true;
        }
      }
      return false;
    };
    const ch = check();
    if (ch) {
      setRes(0);
    } else {
      setRes(1);
    }
  }, []);
  const handleDeleteRes = async () => {
    try {
      setRes(2);
      const data = await axios.post(`${url}/api/contest/delete-user-register`, {
        userId: idAd,
        contestId: contestId,
      });
      if (data.data.status === 200) {
        const timer = setTimeout(() => {
          setRes(1);
        }, 1000);
        return () => {
          clearTimeout(timer);
        };
      } else {
        const timer = setTimeout(() => {
          setRes(0);
        }, 1000);
        return () => {
          clearTimeout(timer);
        };
      }
    } catch (error) {
      return toast.error("Error fetching data!");
    }
  };
  const handleAddRes = async () => {
    try {
      setRes(2);
      const data = await axios.post(`${url}/api/contest/add-user-register`, {
        userId: idAd,
        contestId: contestId,
      });

      if (data.data.status === 200) {
        const timer = setTimeout(() => {
          setRes(0);
        }, 1000);
        return () => {
          clearTimeout(timer);
        };
      } else {
        const timer = setTimeout(() => {
          setRes(1);
        }, 1000);
        return () => {
          clearTimeout(timer);
        };
      }
    } catch (error) {
      return toast.error("Error fetching data!");
    }
  };
  return (
    <div className="col-span-1 w-full h-max divide-y border-[1.5px] divide-gray-200 rounded-lg bg-white shadow">
      <div className="flex w-full items-center justify-evenly space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-bold text-gray-900">{name}</h3>
            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-blue-600 ring-1 ring-inset ring-green-600/20">
              Creator
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">{des}</p>
        </div>
        <div className="h-full w-[40%] flex flex-col">
          <p className="text-sm font-semibold">
            Thời gian kết thúc đăng ký: {resCountdown}
          </p>
          <p className="text-sm font-semibold">
            Thời gian đến lúc thi: {examCountdown}
          </p>
        </div>
        <img
          className="h-16 w-16 flex-shrink-0 rounded-full bg-gray-300"
          src={avaAd}
          alt=""
        />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            {res === 0 && (
              <button
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                onClick={handleDeleteRes}
              >
                <DoneIcon />
                Register success!
              </button>
            )}{" "}
            {res === 1 && (
              <button
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                onClick={handleAddRes}
              >
                <AddIcon />
                Register now!
              </button>
            )}
            {res === 2 && (
              <button className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                <Box sx={{ display: "flex" }}>
                  <CircularProgress size={24} sx={{ color: "black" }} />
                </Box>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardContest;
