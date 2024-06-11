/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Dropdown from "../../components/dropdown/Dropdown";
import { MdRefresh, MdDownload } from "react-icons/md";
import DateRangePicker from "../../components/dateRangePicker/DatePicker";
import { DatePicker } from 'antd';
import { MdScreenshotMonitor } from "react-icons/md";
import Avatar from "react-avatar";
import MWService from "../../components/MWService";
import AuthService from "../../components/AuthService";
import moment from "moment";
import withLogin from "../../components/withLogin";
import Model from "../../components/model/Model";
import { dayJs, isEmpty } from "../../components/Utils";
import "./Screenshorts-styles.css";

const Screenshots = () => {
  const userLoginDetail = new AuthService().getProfile();
  console.log("userLoginDetail", userLoginDetail);
  const [userList, setUserList] = useState([]);
  const [selecteduser, setSelecteduser] = useState();
  const [screenshots, setScreenshots] = useState([]);
  const [openModel, setOpenModel] = useState();
  const [screenshotsDate, setScreenshotsDate] = useState([
    new Date(),
    new Date(),
  ]);
  const mw = new MWService();

  useEffect(() => {
    mw.post("Admin/GetUsers", {
      organizationId: userLoginDetail.organizationId,
    })
      .then(({ data }) => {
        if (data) {
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
    if (screenshotsDate && selecteduser) {
      getScreenshots(selecteduser, screenshotsDate);
    }
  }, [screenshotsDate]);

  const getScreenshots = (user, dates) => {
    setScreenshots([]);
    mw.post("Admin/GetScreenShots", {
      OrganizationId: user.organizationId,
      UserId: user.id,
      TeamId: user.teamId,
      CDate: moment(new Date()).format("YYYY-MM-DD"),
      start_date: moment(dates[0]).format("YYYY-MM-DD"),
      end_date: moment(dates[1]).format("YYYY-MM-DD"),
    })
      .then(({ data }) => {
        if (data) {
          data = data.map((x) => {
            x.display_date = moment(x.created_date).format("hh:mm A");
            return x;
          });
          const result = Object.groupBy(data, ({ created_date }) =>
            moment(created_date).format("hh:00 A")
          );
          setScreenshots(result);
          console.log("getScreenshots data =>", result, data);
        } else {
          setScreenshots([]);
          console.log("getScreenshots data =>", [], data);
        }
      })
      .catch((e) => {
        console.log("error:", e);
      });
  };

  const onSelectuser = (user) => {
    if (selecteduser?.id === user.id) {
      setSelecteduser(null);
      setScreenshots([]);
    } else {
      setSelecteduser(user);
      getScreenshots(user, screenshotsDate);
    }
  };
  const onImgClick = (val) => {
    console.log({ val });
    setOpenModel(val);
  };
  return (
    <div className="p-8 max-sm:p-0">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center">
          <MdScreenshotMonitor className="text-2xl text-blue-600" />
          <h2 className="text-xl font-bold ml-2">Screenshots</h2>
        </div>
        <ul className="flex w-96 shadow-lg rounded">
          <li className={`m-2 p-1 cursor-pointer $ rounded`}>
            All Screenshots
          </li>
          <li className={`m-2 p-1 cursor-pointer $ rounded`}>Flagged</li>
          <li className={`m-2 p-1 cursor-pointer $ rounded`}>Flagged By Me</li>
        </ul>
      </div>
      <div className="flex justify-between items-center w-full mb-2 max-sm:flex-col max-sm:w-full">
        <div>
          <Dropdown />
        </div>
        <div className="flex justify-end items-center h-20 w-full max-sm:flex-col">
          <div>
            {/* <DateRangePicker
              setDates={setScreenshotsDate}
              dates={screenshotsDate}
            /> */}
            <DatePicker defaultValue={dayJs(screenshotsDate[0].toDateString(), "yyyy-MM-dd")} />
          </div>
          <div>
            <button className="text-blue-500 p-1 m-1 border border-black rounded-lg">
              <MdDownload />
            </button>
            <button className="text-blue-500 p-1 border border-black rounded-md">
              <MdRefresh />
            </button>
          </div>
        </div>
      </div>
      {/* <DialogModal /> */}
      <div className=" grid grid-cols-3 gap-1 mt-4">
        <div className="col-span-1 shadow-lg ">
          <div className="  h-[450px] p-5">
            <h2 className="text-[13px] ">Punched In User</h2>
            <hr />
            <div className="overflow-y-auto h-[400px]">
              {userList.map((user, index) => (
                <>
                  <div
                    key={index}
                    onClick={() => onSelectuser(user)}
                    className={`flex justify-start m-3 ${selecteduser?.id === user.id && "bg-slate-300"
                      }`}
                  >
                    <Avatar name={user.usersName} size="50" round={true} />
                    <div className="mx-3">
                      <h3>{user.usersName}</h3>
                      <h6 className="text-[13px]">{user.email}</h6>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2 h-[450px] text-center shadow-lg rounded-md overflow-auto">
          <div className="flex p-4 border border-slate-200 rounded-[10px] ml-4 mb-4 bg-white">
            <div className="w-full pt-6">
              <div className="border-l-2 border-indigo  ml-[100px] relative pb-6 ml-[100px]">
                {Object.keys(screenshots).map((sdk) => {
                  return (
                    <div className="pl-[10px] mb-8">
                      <div className="flex-start flex items-center absolute">
                        <div className="-ml-[17px]  mr-3 flex h-3 w-3 items-center justify-center rounded-full bg-indigo bg-indigo-500"></div>
                        <span
                          className="inline-block   whitespace-nowrap rounded-[0.27rem] bg-indigo-100 px-[0.95em] pb-[0.45em] pt-[0.65em] 
  text-center align-baseline text-[0.75em]  leading-none text-indigo-700 -ml-[107px]"
                        >
                          {sdk}
                        </span>
                      </div>
                      <div className="w-full flex flex-wrap gap-4">
                        {screenshots[sdk].map((sd) => {
                          return (
                            <div
                              onClick={() => onImgClick(sd)}
                              className="min-w-[10rem] max-w-[16rem]"
                            >
                              <div className="flex border border-slate-300 overflow-hidden relative rounded-[7px] bg-white cursor-pointer w-full">
                                <img
                                  src={sd.filePath}
                                  class="relative z-1"
                                  style={{ "max-width": "100%" }}
                                ></img>
                                <div class="absolute top-1 right-1 flex items-center justify-between p-1 w-full z-10">
                                  <div class=" ml-2 flex items-center justify-center p-1 py-[0.2rem] rounded-sm bg-white text-slate-800 text-[11px]">
                                    {sd.display_date}
                                  </div>
                                </div>
                                <div class="absolute bottom-4 right-2 flex items-center justify-center p-1 w-5 h-5 rounded bg-white bg-opacity-80">
                                  <span
                                    role="img"
                                    aria-label="download"
                                    class="anticon anticon-download"
                                  >
                                    <svg
                                      viewBox="64 64 896 896"
                                      focusable="false"
                                      data-icon="download"
                                      width="1em"
                                      height="1em"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
                                    </svg>
                                  </span>
                                </div>
                                <div class="absolute bottom-4 right-2 flex items-center justify-center p-1 w-5 h-5 rounded bg-white bg-opacity-80">
                                  <span
                                    role="img"
                                    aria-label="download"
                                    class="anticon anticon-download"
                                  >
                                    <svg
                                      viewBox="64 64 896 896"
                                      focusable="false"
                                      data-icon="download"
                                      width="1em"
                                      height="1em"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
                                    </svg>
                                  </span>
                                </div>
                                <div class="absolute bottom-4 right-8 flex items-center justify-center p-1 w-5 h-5 rounded  bg-opacity-80 bg-white">
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 16 16"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"></path>
                                  </svg>
                                </div>
                                <div class="absolute bottom-0 w-full z-10">
                                  <div class="w-full bg-neutral-200">
                                    <div
                                      class="bg-[#4A2DDA] p-0.5 h-2 text-center text-xs font-medium leading-none text-slate-100"
                                      styles={{ width: "100%" }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isEmpty(openModel) && (
        <Model
          isOpen={!isEmpty(openModel)}
          onClose={() => setOpenModel(null)}
          data={openModel}
          title={`${selecteduser.first_Name} ${selecteduser.last_name || ""} ${selecteduser.roleName
            } | ${openModel.created_date}`}
        >
          <>
            <div>Hello</div>
            <img
              src={openModel.filePath}
              class="relative z-1"
              style={{ "max-width": "100%" }}
            ></img>
          </>
        </Model>
      )}
    </div>
  );
};

export default withLogin(Screenshots);
