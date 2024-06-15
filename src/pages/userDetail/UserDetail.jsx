/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { MdRefresh, MdDownload } from "react-icons/md";
import DateRangePicker from "../../components/dateRangePicker/DatePicker";
import { RiUser3Fill } from "react-icons/ri";
import UserDetailAttendance from "./UserDetailAttendance";
import UserDetailBreak from "./UserDetailBreak";
import UserDetailWellness from "./UserDetailWellness";
import UserProductivity from "./UserProductivity";
import UserActivity from "./UserActivity";
import UserAppsAndUrl from "./UserAppsAndUrl";
import AuthService from "../../components/AuthService";
import MWService from "../../components/MWService";
import moment from "moment";
import withLogin from "../../components/withLogin";
import { uniqueId } from "lodash";
import { dayJs, formatDate } from "../../components/Utils";

const { Option } = Select;

const Dropdown = ({ userList = [], selectedUser, setSelectedUser }) => {
  return (
    <>
      <Select
        value={selectedUser?.id}
        onSelect={(val) => {
          console.log({ val });
          const user = userList.find((x) => x.id === val);
          setSelectedUser(user);
        }}
        style={{ width: 180 }}
      >
        {userList.map((user) => (
          <Option value={user.id}>{user?.usersName}</Option>
        ))}
      </Select>
    </>
  );
};

const UserDetail = () => {
  const userLoginDetail = new AuthService().getProfile();
  const mw = new MWService();
  console.log("userLoginDetail", userLoginDetail);

  const [activePage, setActivePage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [monthlyInOut, setMonthlyInOut] = useState({});
  const [refresh, setRefresh] = useState();
  const [range, setRange] = useState([dayJs().subtract(6, "d"), dayJs()]);

  useEffect(() => {
    mw.post("Admin/GetUsers", {
      organizationId: userLoginDetail.organizationId,
    })
      .then(({ data }) => {
        if (data) {
          setSelectedUser(data[0]);
          setUserList(data);
        }
        console.log("data =>", data);
      })
      .catch((e) => {
        console.log("error:", e);
      });
    return () => true;
  }, []);

  useEffect(() => {
    if (!selectedUser?.id) return;
    mw.post("Admin/GetMonthlyinout", {
      organizationId: selectedUser.organizationId,
      CDate: moment(new Date()).format("YYYY-MM-DD"),
      FDate: dayJs(range[0]).format("YYYY-MM-DD"),
      TDate: dayJs(range[1]).format("YYYY-MM-DD"),
      UserId: selectedUser.id,
    })
      .then(({ data }) => {
        if (data) {
          const result = Object.groupBy(data.data, ({ date }) =>
            formatDate(date)
          );
          console.log({ result });
          setMonthlyInOut(result);
        }
        console.log("data =>", data);
      })
      .catch((e) => {
        console.log("error:", e);
      });
    return () => true;
  }, [selectedUser?.id, refresh, range]);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const setDates = (dates) => {
    setRange(dates);
  };

  return (
    <div className="p-8 max-sm:p-0">
      <div className="flex justify-start items-center">
        <RiUser3Fill className="text-2xl text-blue-600" />
        <h2 className="text-xl font-bold ml-2">User wise Detailed</h2>
      </div>
      <div className="flex justify-between items-center w-full mb-2 max-sm:flex-col max-sm:w-full">
        <div>
          <Dropdown {...{ userList, selectedUser, setSelectedUser }} />
        </div>
        <div className="flex justify-end items-center h-20 w-full max-sm:flex-col">
          <div>
            <DateRangePicker setDates={setDates} dates={range} />
          </div>
          <div>
            <button className="text-blue-500 p-1 m-1 border border-black rounded-lg">
              <MdDownload />
            </button>
            <button className="text-blue-500 p-1 border border-black rounded-md">
              <MdRefresh onClick={() => setRefresh(uniqueId())} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 shadow-md gap-3 ">
        <div className=" col-span-1 shadow-lg p-4 h-auto">
          <div className="flex justify-around items-center p-1">
            <RiUser3Fill className="text-5xl" />
            <div className="">
              <p className="text-[20px]">{selectedUser?.usersName}</p>
              <p>{selectedUser?.email}</p>
            </div>
          </div>
          <hr />
          <ul className="flex flex-col justify-center items-start p-5">
            <li
              onClick={() => handlePageChange(1)}
              className={`m-2 p-1 cursor-pointer ${
                activePage === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded`}
            >
              Attendance
            </li>
            <li
              onClick={() => handlePageChange(2)}
              className={`m-2 p-1 cursor-pointer ${
                activePage === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded`}
            >
              Breaks
            </li>
            <li
              onClick={() => handlePageChange(3)}
              className={`m-2 p-1 cursor-pointer ${
                activePage === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded`}
            >
              Wellness
            </li>
            <li
              onClick={() => handlePageChange(4)}
              className={`m-2 p-1 cursor-pointer ${
                activePage === 4 ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded`}
            >
              Productivity
            </li>
            <li
              onClick={() => handlePageChange(5)}
              className={`m-2 p-1 cursor-pointer ${
                activePage === 5 ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded`}
            >
              Activity
            </li>
            <li
              onClick={() => handlePageChange(6)}
              className={`m-2 p-1 cursor-pointer ${
                activePage === 6 ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded`}
            >
              Apps & URLs
            </li>
          </ul>
        </div>
        <div className="col-span-3 shadow-lg">
          {activePage === 1 && Object?.keys(monthlyInOut)?.length > 0 && (
            <div>
              <UserDetailAttendance monthlyInOut={monthlyInOut} />
              {/* Add your content for page 1 here */}
            </div>
          )}
          {activePage === 2 && (
            <div>
              <UserDetailBreak />
            </div>
          )}
          {activePage === 3 && (
            <div>
              <UserDetailWellness />
            </div>
          )}
          {activePage === 4 && (
            <div>
              <UserProductivity />
            </div>
          )}
          {activePage === 5 && (
            <div>
              <UserActivity />
            </div>
          )}
          {activePage === 6 && (
            <div>
              <UserAppsAndUrl />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
