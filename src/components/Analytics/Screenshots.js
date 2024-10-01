import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip, Modal, Spin } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import { MdScreenshotMonitor } from "react-icons/md";
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
import JSZip from "jszip";
import { saveAs } from "file-saver";
import moment from "moment";
import Loader from "../Common/Loader";
import PrismaZoom from "react-prismazoom";
import CommonNodatafound from "../Common/CommonNodatafound";

const Screenshots = () => {
  const [date, setDate] = useState(new Date());
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [userName, setUserName] = useState("");
  const [screenshotData, setScreenshotData] = useState([]);
  const [image, setImage] = useState("");
  const [scrnShotDate, setScrnShotDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [downloadButtonLoader, setDownloadButtonLoader] = useState(false);

  useEffect(() => {
    getTeamData();
  }, []);

  const getTeamData = async () => {
    try {
      const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
      setOrganizationId(orgId);
      const response = await getTeams(orgId);
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
      const usersList = response?.data;

      setUserList(usersList);
      setNonChangeUserList(usersList);
      userIdd = usersList[0].id;
      setUserId(usersList[0].id);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    } finally {
      setTimeout(() => {
        getScreenShotsData(userIdd, orgId, date);
      }, 500);
    }
  };

  const getScreenShotsData = async (user, orgId, selectedDate) => {
    setFilterLoading(true);
    try {
      const response = await getScreenShots(
        user,
        orgId,
        moment(selectedDate).format("YYYY-MM-DD")
      );
      const ScreenShotsData = response.data;
      const reveseData = ScreenShotsData.reverse();

      setScreenshotData(reveseData);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        setFilterLoading(false);
        setLoading(false);
      }, 500);
    }
  };

  const handleTeam = async (value) => {
    setTeamId(value);
    try {
      const response = await getUsersByTeamId(value);
      const teamMembersList = response?.data?.team?.users;
      if (teamMembersList.length <= 0) {
        setUserList([]);
        setUserId(null);
        return;
      }

      setUserList(teamMembersList);
      setUserId(teamMembersList[0].id);
      getScreenShotsData(teamMembersList[0].id, organizationId, date);
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
    setUserId(value);
    getScreenShotsData(value, organizationId, date);
  };

  const handleScreenshot = (item) => {
    setIsModalOpen(true);
    const base64String = `data:image/jpeg;base64,${item.imageData}`;
    setImage(base64String);
    setScrnShotDate(item.screenShotDate);
    const filterUser = userList.find((f) => f.id === item.userId);
    setUserName(filterUser.first_Name + " " + filterUser.last_Name);
  };

  const handleDownloadAllScreenshots = async () => {
    if (screenshotData.length <= 0) {
      CommonToaster("No data found", "error");
      return;
    }
    setDownloadButtonLoader(true);
    const getSelectedUser = nonChangeUserList.find((f) => f.id === userId);
    const UserName = getSelectedUser.full_Name;
    const zip = new JSZip();
    const screenshotFolder = zip.folder("Screenshots");

    screenshotData.forEach((item, index) => {
      // Only take the Base64 content, remove the "data:image/jpeg;base64," prefix
      const base64String = item.imageData.replace(
        /^data:image\/(png|jpeg);base64,/,
        ""
      );

      // Decode base64 string to binary data
      const binaryString = atob(base64String);

      // Convert binary string to Uint8Array
      const buffer = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        buffer[i] = binaryString.charCodeAt(i);
      }

      const fileName = `Screenshot_${moment(item.screenShotDate).format(
        "YYYYMMDD_HHmmss"
      )}.png`;
      screenshotFolder.file(fileName, buffer, { binary: true });
    });
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(
      content,
      `${UserName}-${moment(date).format("DD-MM-YYYY")}-Screenshots.zip`
    );
    setTimeout(() => {
      setDownloadButtonLoader(false);
    }, 350);
  };

  const handleRefresh = () => {
    const today = new Date();
    const givenDate = new Date(date);
    let isCurrentDate = false;

    if (
      givenDate.getFullYear() === today.getFullYear() &&
      givenDate.getMonth() === today.getMonth() &&
      givenDate.getDate() === today.getDate()
    ) {
      isCurrentDate = true;
    } else {
      isCurrentDate = false;
    }

    const defaultUser = nonChangeUserList.find((f, index) => index === 0);
    console.log("defaultuser", defaultUser);

    if (
      teamId === null &&
      userId === defaultUser.id &&
      isCurrentDate === true
    ) {
      return;
    }
    setTeamId(null);
    setUserList(nonChangeUserList);
    setUserId(defaultUser.id);
    setDate(today);
    getScreenShotsData(defaultUser.id, organizationId, today);
  };

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <MdScreenshotMonitor size={20} />
        </div>
        <h2 className="allpage_mainheadings">Screenshots</h2>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
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
                    onClick={handleDownloadAllScreenshots}
                    disabled={downloadButtonLoader ? true : false}
                  >
                    <DownloadOutlined className="download_icon" />
                  </Button>
                </Tooltip>
                <Tooltip placement="top" title="Refresh">
                  <Button
                    className="dashboard_refresh_button"
                    onClick={handleRefresh}
                  >
                    <RedoOutlined className="refresh_icon" />
                  </Button>
                </Tooltip>
              </div>
            </Col>
          </Row>

          <div>
            <Row
              gutter={16}
              className="screenshots_imagesOuterContainer"
              style={{
                height: filterLoading ? "24.7vh" : "100%",
              }}
            >
              {filterLoading ? (
                <div className="screenshots_spinContainer">
                  <Spin />
                </div>
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
                    <CommonNodatafound />
                  )}
                </>
              )}
            </Row>
          </div>
        </>
      )}
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
