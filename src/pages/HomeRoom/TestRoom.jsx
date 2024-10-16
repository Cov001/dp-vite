import CardVideo from "../../components/Card/CardVideo";
import VideocamIcon from "@mui/icons-material/Videocam";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
const TestRoom = () => {
  const userVideoRef = useRef();
  const userStream = useRef();
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const toggleVideo = () => {
    setIsVideoEnabled((prevState) => !prevState);
    if (userStream.current) {
      userStream.current.getTracks().forEach((track) => {
        if (track.kind === "video") {
          track.enabled = !track.enabled;
        }
      });
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled((prevState) => !prevState);
    if (userStream.current) {
      userStream.current.getTracks().forEach((track) => {
        if (track.kind === "audio") {
          track.enabled = !track.enabled;
        }
      });
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;
        userStream.current = stream;

        // Các xử lý tiếp theo
      });
  }, []);
  return (
    <div className="w-full h-screen grid grid-cols-3">
      <div className="col-span-2 flex items-center p-8">
        <div className="w-full h-2/3">
          <CardVideo
            refVideo={userVideoRef?.current?.srcObject}
            refAudio={userStream.current}
          />
        </div>
      </div>
      <div className=" flex items-center justify-center">
        <ul
          className={` left-10 flex duration-[0.25s] bg-slate-400 overflow-hidden rounded-full  py-1 px-1 gap-4 `}
        >
          <li className="w-14 h-14 flex items-center justify-center hover:bg-slate-100 rounded-full duration-[0.25s] cursor-pointer ">
            <a onClick={toggleVideo}>
              {isVideoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
            </a>
          </li>
          <li className="w-14 h-14 flex items-center justify-center hover:bg-slate-100 rounded-full duration-[0.25s] cursor-pointer ">
            <a onClick={toggleAudio}>
              {isAudioEnabled ? <KeyboardVoiceIcon /> : <MicOffIcon />}
            </a>
          </li>
          <Link
            to="/room"
            className="w-14 h-14 flex items-center justify-center bg-green-500 hover:bg-slate-100 rounded-full duration-[0.25s] cursor-pointer "
          >
            <a>
              <CheckIcon style={{ color: "white" }} />
            </a>
          </Link>

          <Link
            to="/list-room"
            className="w-14 h-14 flex items-center justify-center bg-red-500 hover:bg-red-300 rounded-full duration-[0.25s] cursor-pointer "
          >
            <a>
              <CloseIcon style={{ color: "white" }} />
            </a>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default TestRoom;
