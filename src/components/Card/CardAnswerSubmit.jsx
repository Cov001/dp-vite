import { Link } from "react-router-dom";
import img1 from "../../assets/icons8-smile-96.png";
import Rating from "../Rating";
const CardAnswerSumit = () => {
  return (
    <div className="w-full z-10 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center p-10">
        <h5 className="mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">
          Bạn chắc chắn muốn nộp bài!
        </h5>
        <h5 className="mb-1 text-md text-center font-medium text-gray-900 dark:text-white">
          Kết quả chỉ được xem sau khi contest kết thúc!
        </h5>
        <div className="flex mt-4 w-full justify-evenly md:mt-6">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Quay Lại
          </button>
          <button className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Nộp Bài
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardAnswerSumit;
