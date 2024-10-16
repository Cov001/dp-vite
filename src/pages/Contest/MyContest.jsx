import React, { useState, useEffect, useContext } from "react";
import CardMyContest from "../../components/Card/CardMyContest";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../App";
import axios from "axios";

const MyContest = () => {
  const [dataCm, setDataCm] = useState([]);
  const [dataPr, setDataPr] = useState([]);
  const [dataFi, setDataFi] = useState([]);
  const { state, dispatch } = useContext(AppContext);
  const url =
    import.meta.env.VITE_API_NODE_ENV === "production"
      ? import.meta.env.VITE_API_PRODUCTION
      : import.meta.env.VITE_API_DEVELOPMENT;

  useEffect(() => {
    const getData = async (ll) => {
      try {
        const response = await axios.post(`${url}/api/contest/${ll}`, {
          userId: state?.user?.id,
        });
        return response.data.message;
      } catch (error) {
        toast.error("Error fetching data!");
      }
    };

    const fetchData = async () => {
      try {
        const [datacm, datapr, datafi] = await Promise.all([
          getData("get-ct-cm-id"),
          getData("get-ct-pr-id"),
          getData("get-ct-fi-id"),
        ]);

        setDataCm(datacm);
        setDataPr(datapr);
        setDataFi(datafi);
        console.log(datafi, datapr, datacm);
      } catch (error) {
        toast.error("Error fetching data!");
      }
    };

    fetchData();
  }, []); // Dependency array rỗng để đảm bảo useEffect chỉ chạy một lần khi component được mount

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="w-full h-20"></div>

      <div className="w-full p-2 flex flex-col gap-3">
        <Link
          to="/create-contest"
          type="button"
          className="py-2.5 w-full flex items-center justify-center  px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          + Create
        </Link>

        {dataPr?.map((item, index) => (
          <CardMyContest
            img={state?.user?.avatar}
            status={"pr"}
            name={item.TenContest}
            des={item.Description}
            key={index}
            idContest={item._id}
          />
        ))}
        {dataCm?.map((item, index) => (
          <CardMyContest
            img={state?.user?.avatar}
            status={"cm"}
            name={item.Ten_Contest}
            des={item.Description}
            key={index}
            idContest={item._id}
          />
        ))}
        {dataFi?.map((item, index) => (
          <CardMyContest
            img={state?.user?.avatar}
            status={"fi"}
            name={item.Ten_Contest}
            des={item?.Description}
            key={index}
            idContest={item.IdCtPr}
          />
        ))}
        {/*<CardMyContest />
        <CardMyContest />
        <CardMyContest />
        <CardMyContest />
        <CardMyContest />
        <CardMyContest /> */}
      </div>
    </div>
  );
};

export default MyContest;
