import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CardContestProgress = ({
  name,
  user,
  timeend,
  avaAd,
  idAd,
  contestId,
}) => {
  const [countdown, setCountdown] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(timeend) - new Date();
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        return `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      } else {
        return "00:00:00"; // Khi thời gian kết thúc
      }
    };

    const updateCountdown = () => {
      setCountdown(calculateTimeLeft());
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [timeend]);

  const handleJoinContest = async () => {};

  return (
    <div className="col-span-1 w-full h-max border-[1.5px] divide-gray-200 rounded-lg bg-white shadow">
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
                      Sau khi bắt đầu tham gia cuộc thi, kết quả sẽ được chấm
                      khi bạn thoát trang web hoặc bấm vào nút nộp bài. Mỗi thí
                      sinh chỉ có một lượt thi duy nhất, kết quả bài thi sẽ được
                      công bố khi bài thi kết thúc!
                    </p>
                  </div>
                </div>
                <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                  <button
                    onClick={() => {
                      navigate(`/start-contest/${contestId}`);
                    }}
                    className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-200 text-green-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                  >
                    Joinnn
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
      <div className="flex w-full items-center justify-evenly space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-xl font-bold text-gray-900">{name}</h3>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">
            Users: {user.length}
          </p>
          <p className="mt-1 text-sm font-semibold text-gray-700">
            Time end: {countdown}
          </p>
        </div>
        <img
          className="h-16 w-16 flex-shrink-0 rounded-full bg-gray-300"
          src={avaAd}
          alt="Avatar"
        />
      </div>
      <div className="flex justify-center py-4">
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700
          text-white w-36 h-10 rounded-lg font-semibold transition ease-in duration-200"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default CardContestProgress;
