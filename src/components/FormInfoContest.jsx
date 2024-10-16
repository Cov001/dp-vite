import { useContext, useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import TimeInput from "./TimePicker";
import FileUpload from "./FileUpload";
import { AppContext } from "../App";
import axios from "axios";
import moment from "moment";
import TableTask from "./TableTask";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FormInfoContest = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [dateRS, setDateRS] = useState("");
  const [dateRE, setDateRE] = useState("");
  const [dateTS, setDateTS] = useState("");
  const [dateTE, setDateTE] = useState("");
  const [timeRS, setTimeRS] = useState("");
  const [timeRE, setTimeRE] = useState("");
  const [timeTS, setTimeTS] = useState("");
  const [timeTE, setTimeTE] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listTask, setListTask] = useState([]);

  const url =
    import.meta.env.VITE_API_NODE_ENV === "production"
      ? import.meta.env.VITE_API_PRODUCTION
      : import.meta.env.VITE_API_DEVELOPMENT;

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.post(`${url}/api/contest/get-contest`, {
          idContest: id,
        });

        if (data.status === 200) {
          const contest = data.message;

          setName(contest.TenContest || "");
          setDes(contest.Description || "");
          setDateRS(
            moment(contest.Thoi_Gian_Bat_Dau_Dang_Ky).format("YYYY-MM-DD")
          );
          setTimeRS(moment(contest.Thoi_Gian_Bat_Dau_Dang_Ky).format("HH:mm"));
          setDateRE(
            moment(contest.Thoi_Gian_Ket_Thuc_Dang_Ky).format("YYYY-MM-DD")
          );
          setTimeRE(moment(contest.Thoi_Gian_Ket_Thuc_Dang_Ky).format("HH:mm"));
          setDateTS(moment(contest.Thoi_Gian_Bat_Dau_Thi).format("YYYY-MM-DD"));
          setTimeTS(moment(contest.Thoi_Gian_Bat_Dau_Thi).format("HH:mm"));
          setDateTE(
            moment(contest.Thoi_Gian_Ket_Thuc_Thi).format("YYYY-MM-DD")
          );
          setTimeTE(moment(contest.Thoi_Gian_Ket_Thuc_Thi).format("HH:mm"));
          const fetchedTasks = await Promise.all(
            contest.Mang_Cau_Hoi.map(async (taskId) => {
              const response = await axios.post(`${url}/api/contest/get-task`, {
                taskId,
              });
              return {
                CauHoi: response.data.message.task,
                TRUE: response.data.message.answer,
                a: response.data.message.a,
                b: response.data.message.b,
                c: response.data.message.c,
                d: response.data.message.d,
              };
            })
          );

          setExcelData(fetchedTasks);
        } else {
          toast.error("Error fetching data!");
        }
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    getData();
  }, [id]);

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div
        className={`container z-0 max-w-screen-lg mx-auto ${
          open && "hidden"
        } }`}
      >
        <div>
          <div className="h-20"></div>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Contest Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Name contest</label>
                    <input
                      type="text"
                      name="full_name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Description</label>
                    <input
                      type="text"
                      value={des}
                      onChange={(e) => {
                        setDes(e.target.value);
                      }}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="Helloo..."
                    />
                  </div>

                  <div className="col-span-5 grid grid-cols-3">
                    <div className="md:col-span-2 flex flex-col justify-between">
                      <label htmlFor="address">Register start!</label>
                      <DatePicker value={dateRS} setValue={setDateRS} />
                    </div>

                    <div className="md:col-span-1 flex items-end">
                      <TimeInput value={timeRS} setValue={setTimeRS} />
                    </div>
                  </div>
                  <div className="col-span-5 grid grid-cols-3">
                    <div className="md:col-span-2 flex flex-col justify-between">
                      <label htmlFor="address">Register end!</label>
                      <DatePicker value={dateRE} setValue={setDateRE} />
                    </div>

                    <div className="md:col-span-1 flex items-end">
                      <TimeInput value={timeRE} setValue={setTimeRE} />
                    </div>
                  </div>
                  <div className="col-span-5 grid grid-cols-3">
                    <div className="md:col-span-2 flex flex-col justify-between">
                      <label htmlFor="address">Test start!</label>
                      <DatePicker value={dateTS} setValue={setDateTS} />
                    </div>

                    <div className="md:col-span-1 flex items-end">
                      <TimeInput value={timeTS} setValue={setTimeTS} />
                    </div>
                  </div>
                  <div className="col-span-5 grid grid-cols-3">
                    <div className="md:col-span-2 flex flex-col justify-between">
                      <label htmlFor="address">Test end!</label>
                      <DatePicker value={dateTE} setValue={setDateTE} />
                    </div>

                    <div className="md:col-span-1 flex items-end">
                      <TimeInput value={timeTE} setValue={setTimeTE} />
                    </div>
                  </div>
                  <div className="col-span-5 grid grid-cols-5">
                    <div className="col-span-4">
                      {/* <FileUpload
                                excelFile={excelFile}
                                setExcelFile={setExcelFile}
                                typeError={typeError}
                                setTypeError={setTypeError}
                                excelData={excelData}
                                setExcelData={setExcelData}
                            /> */}
                    </div>
                    <div className="col-span-1">
                      <button
                        onClick={() => {
                          setOpen(true);
                        }}
                        className={`py-2.5 px-5  mt-6 ml-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${
                          excelData === null &&
                          "text-gray-200 bg-gray-200 hover:bg-white  hover:text-gray-200"
                        }`}
                        disabled={excelData === null}
                      >
                        View File
                      </button>
                    </div>
                  </div>

                  {/* Submit button */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {ll && (
        <div className="w-full h-screen flex flex-col fixed -translate-y-10 z-20 bg-inherit items-center justify-center">
          <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>

          <p className="text-lg mt-5 font-bold">
            Contest đã được tạo thành công, câu hỏi đang được tải...
          </p>
        </div>
      )} */}
      {open && <TableTask excelData={excelData} setO={setOpen} />}
    </div>
  );
};

export default FormInfoContest;
