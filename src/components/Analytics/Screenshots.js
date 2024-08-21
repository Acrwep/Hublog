import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip, Avatar, Modal } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import { MdScreenshotMonitor } from "react-icons/md";
import Screenshot1 from "../../assets/images/Screenshot 2024-07-05 125005.png";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import { CommonToaster } from "../Common/CommonToaster";
import { MdOutlineFileDownload } from "react-icons/md";
import {
  getScreenShots,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import CommonAvatar from "../Common/CommonAvatar";
import moment from "moment";
import Loader from "../Common/Loader";
import PrismaZoom from "react-prismazoom";

const Screenshots = () => {
  const [date, setDate] = useState(new Date());
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [userName, setUserName] = useState("");
  const [screenshotData, setScreenshotData] = useState([]);
  const [image, setImage] = useState("");
  const [scrnShotDate, setScrnShotDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTeamData();
  }, []);

  const getTeamData = async () => {
    setLoading(true);
    try {
      const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
      setOrganizationId(orgId);
      const response = await getTeams(orgId);
      console.log("teamsssssss response", response.data);
      const teamList = response.data;
      setTeamList(teamList);
      setTeamId(null);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        getUsersData();
      }, 500);
    }
  };

  const getUsersData = async () => {
    let userIdd = null;
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getUsers(orgId);
      console.log("users response", response.data);
      const usersList = response?.data;

      //merge user fullname and lastname in full_name property
      const updateUserList = usersList.map((item) => {
        return { ...item, full_Name: item.first_Name + " " + item.last_Name };
      });
      console.log("update user list", updateUserList);

      setUserList(updateUserList);
      userIdd = updateUserList[0].id;
      setUserId(updateUserList[0].id);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        getScreenShotsData(userIdd, orgId, date);
      }, 500);
    }
  };

  const getScreenShotsData = async (user, orgId, selectedDate) => {
    setLoading(true);
    try {
      const response = await getScreenShots(
        user,
        orgId,
        moment(selectedDate).format("YYYY-MM-DD")
      );
      console.log("screenshot response", response.data);
      const ScreenShotsData = response.data;
      const reveseData = ScreenShotsData.reverse();

      setScreenshotData(reveseData);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleTeam = async (value) => {
    console.log("clicked team", value);
    setTeamId(value);
    try {
      const response = await getUsersByTeamId(value);
      console.log("user by teamId response", response?.data);
      const teamMembersList = response?.data?.team?.users;
      console.log("team members", teamMembersList);
      if (teamMembersList.length <= 0) {
        setUserList([]);
        setUserId(null);
        return;
      }
      const updatedArr = teamMembersList.map(
        ({ firstName, lastName, userId, ...rest }) => ({
          first_Name: firstName,
          last_Name: lastName,
          id: userId,
          ...rest,
        })
      );

      //merge user fullname and lastname in full_name property
      const adddFullName = updatedArr.map((item) => {
        return { ...item, full_Name: item.first_Name + " " + item.last_Name };
      });

      setUserList(adddFullName);
      setUserId(adddFullName[0].id);
      getScreenShotsData(adddFullName[0].id, organizationId, date);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    }
  };

  const onDateChange = (value) => {
    setDate(value);
    getScreenShotsData(userId, organizationId, value);
  };

  const handleUser = (value) => {
    console.log("userIdddd", value);
    setUserId(value);
    getScreenShotsData(value, organizationId, date);
  };

  const handleScreenshot = (item) => {
    console.log("itemmm", item);
    setIsModalOpen(true);
    const base64String = `data:image/jpeg;base64,${item.imageData}`;
    setImage(base64String);
    setScrnShotDate(item.screenShotDate);
    const filterUser = userList.find((f) => f.id === item.userId);
    setUserName(filterUser.first_Name + " " + filterUser.last_Name);
  };

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <MdScreenshotMonitor size={20} />
        </div>
        <h2 className="allpage_mainheadings">Screenshots</h2>
      </div>

      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="screenshot_selectfieldsContainer">
            <div className="screenshot_selectfields">
              <CommonSelectField
                options={teamList}
                value={teamId}
                placeholder="Select Team"
                onChange={handleTeam}
              />
            </div>
            <div className="screenshot_selectfields">
              <CommonSelectField
                options={userList}
                value={userId}
                placeholder="Select User"
                onChange={handleUser}
              />
            </div>
            {/* <div style={{ width: "170px" }}>
              <CommonSelectField
                options={userList}
                // value={userId}
                placeholder="Select Interval"
                // onChange={handleUser}
              />
            </div> */}
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="wellness_calendarContainer">
            <div>
              <CommonDatePicker onChange={onDateChange} value={date} />
            </div>
            <Tooltip placement="top" title="Download">
              <Button
                className="dashboard_download_button"
                // onClick={() => {
                //   DownloadTableAsXLSX(data, columns, "alerts.xlsx");
                // }}
              >
                <DownloadOutlined className="download_icon" />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="Refresh">
              <Button className="dashboard_refresh_button">
                <RedoOutlined className="refresh_icon" />
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>

      <div>
        <Row gutter={16} className="screenshots_imagesOuterContainer">
          {/* <Col xs={24} sm={24} md={8} lg={8} style={{ height: "75vh" }}>
          <div className="screenshots_usersmainContainer">
            <div className="screenshots_userlistheaderContainer">
              <p className="screenshots_userheading">Users</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <p className="screenshots_userheading">
                  Total:{userList.length}
                </p>
              </div>
            </div>

            <hr className="screenshot_userhrtag" />
            <div
              className={
                userList.length <= 0
                  ? "screenshots_nousersnamemainContainer"
                  : "screenshots_usersnamemainContainer"
              }
            >
              {userList.length >= 1 ? (
                <>
                  {userList &&
                    userList.map((item, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="screenshots_usersnameContainer"
                            style={{
                              backgroundColor:
                                userId === item.id
                                  ? "rgba(20, 184, 166, 0.1)"
                                  : "",
                            }}
                            onClick={() => {
                              setUserId(item.id);
                              getScreenShotsData(item.id, organizationId, date);
                            }}
                          >
                            <CommonAvatar
                              avatarSize={35}
                              itemName={item.first_Name}
                              avatarfontSize="17px"
                            />

                            <p>{item.first_Name + " " + item.last_Name}</p>
                          </div>
                          <hr className="screenshot_users_hrtag" />
                        </>
                      );
                    })}
                </>
              ) : (
                <div className="screenshots_nousertextContainer">
                  <p className="screenshots_nousersfound">
                    No users found in the selected team
                  </p>
                </div>
              )}
            </div>
          </div>
        </Col> */}
          {/* <Col xs={24} sm={24} md={16} lg={16} style={{ height: "auto" }}>
          <div className="screenshots_imagesOuterContainer">
            <Row
              gutter={screenshotData.length <= 2 ? 16 : ""}
              className="screenshots_imagesRowContainer"
              // style={{
              //   margin: "20px 66px",
              // }}
            >
              {loading ? (
                <Loader />
              ) : (
                <>
                  {screenshotData.length >= 1 ? (
                    <>
                      {screenshotData &&
                        screenshotData.map((item, index) => {
                          const base64String = `data:image/jpeg;base64,${item.imageData}`;
                          return (
                            <Col
                              xs={24}
                              sm={24}
                              md={12}
                              lg={12}
                              className="screenshot_columnContainer"
                              key={index}
                            >
                              <div className="screenshot_imageandbuttnContainer">
                                <img
                                  src={base64String}
                                  className="screenshot_images"
                                  alt="Base64 Image"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleScreenshot(item)}
                                />
                                <div className="screenshot_imageTimeContainer">
                                  <p>
                                    {moment(item.screenShotDate).format(
                                      "hh:mm A"
                                    )}
                                  </p>
                                </div>
                                <div className="screenshotimage_buttonContainer">
                                  <a
                                    href={base64String}
                                    download="Screenshot.png"
                                  >
                                    <MdOutlineFileDownload size={24} />
                                  </a>
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                    </>
                  ) : (
                    <p className="screenshots_nodatafound">No data found</p>
                  )}
                </>
              )}
            </Row>
          </div>
        </Col> */}
          {loading ? (
            <Loader />
          ) : (
            <>
              {screenshotData.length >= 1 ? (
                <>
                  {screenshotData &&
                    screenshotData.map((item, index) => {
                      const base64String = `data:image/jpeg;base64,${item.imageData}`;
                      return (
                        <>
                          <Col
                            xs={24}
                            sm={24}
                            md={6}
                            lg={6}
                            className="screenshot_columnContainer"
                            key={index}
                          >
                            <div className="screenshot_imageandbuttnContainer">
                              <img
                                src={base64String}
                                className="screenshot_images"
                                alt="Base64 Image"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleScreenshot(item)}
                              />
                              <div className="screenshot_imageTimeContainer">
                                <p>
                                  {moment(item.screenShotDate).format(
                                    "hh:mm A"
                                  )}
                                </p>
                              </div>
                              <div className="screenshotimage_buttonContainer">
                                <a
                                  href={base64String}
                                  download="Screenshot.png"
                                >
                                  <MdOutlineFileDownload size={24} />
                                </a>
                              </div>
                            </div>
                          </Col>
                        </>
                      );
                    })}
                </>
              ) : (
                <div style={{ padding: "12px" }}>
                  <p className="screenshots_nodatafound">No data found</p>
                </div>
              )}
            </>
          )}
        </Row>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        width={750}
        centered={true}
      >
        <p className="screenshotModal_date">
          {userName + " | " + moment(scrnShotDate).format("DD-MM-YYYY hh:mm A")}
        </p>
        <div
          className="prismazoom-container"
          style={{ overflow: "hidden", maxHeight: "80vh" }}
        >
          <PrismaZoom className="prismazoom">
            <img src={image} className="screenshot_modalImage" />
          </PrismaZoom>
        </div>
      </Modal>
    </div>
  );
};

export default Screenshots;
