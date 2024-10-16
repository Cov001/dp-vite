import { useEffect, useState } from "react";
import RoomCard from "../../components/Card/RoomCard";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ListRoom = () => {
  const [page, setPage] = useState(1);
  const [listRoom, setListRoom] = useState([]);
  const url =
    import.meta.env.VITE_API_NODE_ENV === "production"
      ? import.meta.env.VITE_API_PRODUCTION
      : import.meta.env.VITE_API_DEVELOPMENT;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.post(
          `${url}/api/room/get-all-room?page=${page}&limit=10`
        );
        // console.log(data);
        setListRoom(data.data.message);
      } catch (error) {
        toast.error("Error load room!");
      }
    };

    getData();
  }, [page]);

  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-20 z-100"></div>
      <div className="w-full my-4 fixed flex gap-4 z-20 px-6">
        <Link
          to="/create-room"
          className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-28 transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg flex items-center justify-center text-lg"
        >
          Create +
        </Link>
      </div>
      <div className="h-max grid gap-6 mt-24 sm:grid-cols-1 md:grid-cols-2 p-2 ">
        {listRoom.map((item, index) => (
          <RoomCard
            name={item.name}
            key={index}
            intro={item.intro}
            img1={item?.history[0]}
            img2={item?.history[1]}
            img3={item?.history[2]}
            img4={item?.history[3]}
            option={item.topic}
            limit={item.limit}
            avatar={item.admin.avatar}
            hisJoin={item.history.length}
            idRoom={item._id}
          />
        ))}

        {/* <RoomCard
          name={"jonh"}
          intro={"hello"}
          hisJoin={9}
          img1={
            "https://i.pinimg.com/564x/e1/bf/16/e1bf16afd3dbe6423e89712a4382b479.jpg"
          }
          img2={
            "https://i.pinimg.com/564x/e1/bf/16/e1bf16afd3dbe6423e89712a4382b479.jpg"
          }
          img3={
            "https://i.pinimg.com/564x/e1/bf/16/e1bf16afd3dbe6423e89712a4382b479.jpg"
          }
          img4={
            "https://i.pinimg.com/564x/e1/bf/16/e1bf16afd3dbe6423e89712a4382b479.jpg"
          }
          option={["Toan", "Van"]}
          limit={25}
          avatar={
            "https://i.pinimg.com/564x/e1/bf/16/e1bf16afd3dbe6423e89712a4382b479.jpg"
          }
        /> */}
      </div>
    </div>
  );
};

export default ListRoom;
