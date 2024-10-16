import React, { useEffect, useContext, useState } from "react";
import { io } from "socket.io-client";
import ImgUser from "../components/ImgUser";
import { AppContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

const PrepareRoom = () => {
  const [isCameraOn, setCameraOn] = useState(false);
  const [isMicOn, setMicOn] = useState(false);
  const [imagess, setImagess] = useState([]);
  const { dispatch, state } = useContext(AppContext);
  const { idRoom } = useParams();
  const constraints = {
    audio: true,
    video: true,
  };
  const navigate = useNavigate();

  const onSubmit = () => {
    const roomId = idRoom;
    const email = state.user.email;
    const data = { roomId, email };

    window.navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        // const clone = stream.clone();

        dispatch({
          type: "SET_CREDENTIALS",
          payload: {
            email: email,
            roomId: roomId,
            mediaStream: stream,
          },
        });

        state.socket.emit("join-room", data);

        navigate(`/room/${roomId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const images = [
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    "https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg",
    // (Danh sách URL hình ảnh...)
  ];

  useEffect(() => {
    const url =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_API_BACK
        : process.env.REACT_APP_API_URL;

    const socket = io(url, {});

    dispatch({ type: "SET_SOCKET_CONNECTION", payload: { socket: socket } });

    socket.on("connect", () => {
      console.log(socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl items-center">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-300 mb-4">
            <img
              src="https://i.pinimg.com/564x/70/7a/03/707a037459182e745e1914f5e0a171f4.jpg"
              alt="Avatar"
            />
          </div>
          <p className="text-2xl font-bold">Contest4</p>
        </div>

        {/* Video Placeholder */}
        <div className="w-full h-max flex items-center justify-center text-white mx-4">
          <div className="relative w-full flex justify-center gap-1 max-w-4xl h-max p-1 flex-wrap">
            {imagess.map((image, index) => (
              <ImgUser key={index} src={image} alt={`Image ${index + 1}`} />
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-col m-2 items-center justify-center w-full">
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
          >
            Tham Gia Ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrepareRoom;
