import { Link } from "react-router-dom";
import img1 from "../../assets/icons8-smile-96.png";
import Rating from "../Rating";
const CardEndCall = () => {
  return (
    <div className="w-full z-10 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center p-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={img1}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">
          Cuộc gọi đã kết thúc!
        </h5>
        <h5 className="mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">
          Vui lòng cho chúng tôi đánh giá để chúng tôi nâng cao trải nghiệm của
          bạn hơn nhé!
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          <Rating />
        </span>
        <textarea
          name=""
          id=""
          className="outline-none p-1 border-[2.5px] w-full mt-2 rounded-lg h-24"
        ></textarea>
        <div className="flex mt-4 w-full justify-evenly md:mt-6">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Gửi Đánh Giá
          </a>
          <Link
            to="/"
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Rời đi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardEndCall;
