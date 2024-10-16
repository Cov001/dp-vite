import { useState } from "react";
import * as XLSX from "xlsx";
import CircularIndeterminate from "./Loading";
const FileUpload = ({
  setExcelData,
  excelData,
  setTypeError,
  typeError,
  setExcelFile,
  excelFile,
}) => {
  const [open, setOpen] = useState(false);
  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleFileSubmit = (e) => {
    setOpen(true);
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data.slice(0, 50));
    }
    const timer = setTimeout(() => {
      setOpen(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  };
  return (
    <form className="max-w-lg mx-auto " onSubmit={handleFileSubmit}>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="user_avatar"
      >
        Upload file
      </label>
      <input
        className="block p-1 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="user_avatar_help"
        id="user_avatar"
        type="file"
        onChange={handleFile}
      />
      {!open ? (
        <button
          type="submit"
          className="w-[80px] h-[30px] flex justify-center items-center rounded-sm mt-4 bg-blue-500 text-sm font-bold text-white btn-success btn-md hover:shadow-3xl  duration-200"
        >
          {/* {open ? <CircularIndeterminate /> : <>Up Load</>} */}
          Up Load
        </button>
      ) : (
        <div
          className="
      w-[80px] h-[30px] flex justify-center items-center rounded-sm mt-4 bg-blue-500 text-sm font-bold text-white btn-success btn-md hover:shadow-3xl  duration-200
      "
        >
          <CircularIndeterminate />
        </div>
      )}
      <div
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="user_avatar_help"
      >
        Tải lên file câu hỏi để chúng tôi có thể kiểm duyệt nội dung thi!!
      </div>
    </form>
  );
};

export default FileUpload;
