import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
function RoomCard({
  name,
  intro,
  hisJoin,
  img1,
  img2,
  img3,
  img4,
  option,
  limit,
  avatar,
  idRoom,
  oncl,
}) {
  const navigate = useNavigate();
  function clickJoin() {
    navigate(`/prepare-room/${idRoom}`);
  }
  return (
    <div className="flex items-center z-10 w-full justify-center">
      <div className="flex bg-white rounded-lg max-w-[600px] w-full  shadow-lg border border-[1.5px] dark:bg-gray-800 flex-col md:flex-row">
        <div className="relative w-full md:w-48 flex justify-center items-center">
          <img
            src={avatar}
            className="object-cover w-full h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <h1 className="flex-auto text-xl font-semibold dark:text-gray-50">
              {name}
            </h1>
            <div className="text-xl font-semibold text-gray-500 flex items-center dark:text-gray-300">
              {hisJoin} <RemoveRedEyeIcon />
            </div>
            <div className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300 break-words">
              {intro}
            </div>
          </div>
          <div className="flex items-center mt-4 mb-6 text-gray-700 dark:text-gray-300">
            <div className="flex w-1/4  space-x-2">
              {img1 && <img src={img1} className="w-8 h-8  rounded-full" />}

              {img2 && <img src={img2} className="w-8 h-8  rounded-full" />}
              {img3 && <img src={img3} className="w-8 h-8  rounded-full" />}
              {img4 && <img src={img4} className="w-8 h-8  rounded-full" />}
            </div>
            <div className="w-28 h-8"></div>
          </div>
          {/* <div className="w-full grid  grid-cols-4 pb-1 gap-1">
            {(() => {
              let lish = [];
              for (let item of option) {
                lish.push(
                  <div className="border-[1.5px] flex item-center justify-center rounded-xl px-2 py-1">
                    {item}
                  </div>
                );
              }
              return lish;
            })()}
          </div> */}
          <div className="flex mb-4 text-sm font-medium">
            <button
              onClick={clickJoin}
              className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg z-10"
            >
              Join Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoomCard;
