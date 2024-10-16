import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const TableResult = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const url = import.meta.env.VITE_API_PRODUCTION;


  useEffect(() => {
    const getData = async () => {
      try {
        const dat = await axios.post(`${url}/api/contest/get-info-test`, {
          idC: id,
        });
        if (dat.data.message !== null) {
          setData(dat.data.message);
        }
        console.log(dat.data.message);
      } catch (error) {
        toast.error("Error fetching data!");
      }
    };
    getData();
  }, [id]);

  return (
    <div className="w-full min-h-screen">
      <div className="relative overflow-x-auto mt-28">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Thông tin thí sinh
              </th>
              <th scope="col" className="px-6 py-3">
                Kết quả
              </th>
              <th scope="col" className="px-6 py-3">
                Thời Gian
              </th>
              <th scope="col" className="px-6 py-3">
                Số lần out
              </th>
              <th scope="col" className="px-6 py-3">
                Các câu sai
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center dark:text-white"
                  >
                    {item?.Thi_Sinh?.name}
                    <img
                      src={item?.Thi_Sinh?.avatar}
                      className="w-10 ml-2 h-10"
                      alt=""
                    />
                  </th>
                  <td className="px-6 py-4">{item?.So_Diem}</td>
                  <td className="px-6 py-4">{item?.So_Thoi_Gian_Lam_Xong}</td>
                  <td className="px-6 py-4">{item?.So_Lan_Thoat_Tab}</td>
                  <td className="px-6 py-4 flex flex-wrap items-center">
                    {item?.Cac_Cau_Sai?.map((item, index) => (
                      <p className="px-1" key={index}>
                        {item}
                      </p>
                    ))}
                  </td>
                </tr>
              ))}
            {/* Example static rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableResult;
