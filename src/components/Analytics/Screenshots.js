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
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CommonNodatafound from "../Common/CommonNodatafound";

const Screenshots = () => {
  const [date, setDate] = useState(new Date());
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [defaultUserId, setDefaultUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [userName, setUserName] = useState("");
  const [screenshotData, setScreenshotData] = useState([]);
  const [image, setImage] = useState("");
  const [scrnShotDate, setScrnShotDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(true);
  const [downloadButtonLoader, setDownloadButtonLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // New state for the current image index
  const [hidePreviousbutton, setHidePreviousbutton] = useState(false);
  const [hideNextbutton, setHideNextbutton] = useState(false);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    const managerTeamId = localStorage.getItem("managerTeamId");
    if (managerTeamId) {
      setIsManager(true);
    } else {
      setIsManager(false);
    }
    getTeamData();
  }, []);

  const getTeamData = async () => {
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const managerTeamId = localStorage.getItem("managerTeamId");
    try {
      setOrganizationId(orgId);
      const response = await getTeams(orgId);
      const teamList = response.data;
      setTeamList(teamList);
      if (managerTeamId) {
        setTeamId(parseInt(managerTeamId));
      } else {
        setTeamId(null);
      }
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        if (managerTeamId) {
          getUsersDataByTeamId();
        } else {
          getUsersData();
        }
      }, 500);
    }
  };

  const getUsersData = async () => {
    let defalutUserId = null;
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getUsers(orgId);
      const usersList = response?.data;

      setUserList(usersList);
      setNonChangeUserList(usersList);
      setUserId(usersList[0].id);
      defalutUserId = usersList[0].id;
      setDefaultUserId(defalutUserId);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    } finally {
      setTimeout(() => {
        getScreenShotsData(defalutUserId, orgId, date);
      }, 500);
    }
  };

  const getUsersDataByTeamId = async () => {
    const orgId = localStorage.getItem("organizationId");
    const managerTeamId = localStorage.getItem("managerTeamId");
    let defalutUserId = null;
    const currentDate = new Date();
    try {
      const response = await getUsersByTeamId(managerTeamId);
      const teamMembersList = response?.data?.team?.users;
      setUserList(teamMembersList);
      setNonChangeUserList(teamMembersList);

      const loginUserData = localStorage.getItem("LoginUserInfo");
      const convertAsJson = JSON.parse(loginUserData);
      console.log("loginuser", convertAsJson);
      const loginUserId = convertAsJson.id;

      if (teamMembersList.length >= 1) {
        setUserId(loginUserId);
        defalutUserId = loginUserId;
        setDefaultUserId(loginUserId);
      } else {
        setUserId(null);
      }
    } catch (error) {
      CommonToaster(error?.message, "error");
    } finally {
      setTimeout(() => {
        getScreenShotsData(defalutUserId, orgId, date);
      }, 350);
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
      console.log("screenshot response", response);
      const reveseData = ScreenShotsData.reverse();
      setScreenshotData(reveseData);
    } catch (error) {
      console.log("screenshot errorr", error);
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

  const handleScreenshot = (item, index) => {
    setIsModalOpen(true);
    setCurrentIndex(index); // Set the current index when the modal opens
    if (index === 0) {
      setHidePreviousbutton(true);
    } else {
      setHidePreviousbutton(false);
    }
    const lastIndex = screenshotData.length - 1;
    if (index === lastIndex) {
      setHideNextbutton(true);
    } else {
      setHideNextbutton(false);
    }
    updateModalContent(index); // Update modal content
  };

  const updateModalContent = (index) => {
    const selectedItem = screenshotData[index];
    const base64String = `data:image/jpeg;base64,${selectedItem.base64String}`;
    setImage(base64String);
    setScrnShotDate(selectedItem.screenShotDate);
    const filterUser = userList.find((f) => f.id === selectedItem.userId);
    setUserName(filterUser.first_Name + " " + filterUser.last_Name);
  };

  const handleNextSlide = () => {
    setHidePreviousbutton(false);
    const lastIndex = screenshotData.length - 1;
    if (currentIndex + 1 === lastIndex) {
      setHideNextbutton(true);
    } else {
      setHideNextbutton(false);
    }
    if (currentIndex < screenshotData.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      updateModalContent(newIndex);
    }
  };

  const handlePreviousSlide = () => {
    setHideNextbutton(false);
    if (currentIndex === 1) {
      setHidePreviousbutton(true);
    } else {
      setHidePreviousbutton(false);
    }
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      updateModalContent(newIndex);
    }
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
      const base64String = item.base64String.replace(
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
    const managerTeamId = localStorage.getItem("managerTeamId");
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

    if (teamId === null && userId === defaultUserId && isCurrentDate === true) {
      return;
    }

    if (managerTeamId && userId === defaultUserId && isCurrentDate === true) {
      return;
    }

    setTeamId(managerTeamId ? parseInt(managerTeamId) : null);
    setUserList(nonChangeUserList);
    setUserId(defaultUserId);
    setDate(today);
    getScreenShotsData(defaultUserId, organizationId, today);
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
                disabled={isManager}
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
                      // const base64String = `data:image/jpeg;base64,${item.imageData}`;
                      return (
                        <React.Fragment key={index}>
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
                                src={`data:image/jpeg;base64,${item.base64String}`}
                                className="screenshot_images"
                                alt="Base64 Image"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleScreenshot(item, index)}
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
                                  href={`data:image/jpeg;base64,${item.base64String}`}
                                  download="Screenshot.png"
                                >
                                  <MdOutlineFileDownload size={24} />
                                </a>
                              </div>
                            </div>
                          </Col>
                        </React.Fragment>
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

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        width={750}
        centered={true}
      >
        <div style={{ position: "relative" }}>
          <p className="screenshotModal_date">
            {userName +
              " | " +
              moment(scrnShotDate).format("DD-MM-YYYY hh:mm A")}
          </p>
          <div
            className="prismazoom-container"
            style={{ overflow: "hidden", maxHeight: "80vh" }}
          >
            <PrismaZoom className="prismazoom">
              <img
                src={image}
                className="screenshot_modalImage"
                alt="Screenshot"
                tabindex="-1"
              />
            </PrismaZoom>
          </div>
          {hidePreviousbutton === false ? (
            <button
              className="screenshot_previousslidebutton"
              onClick={handlePreviousSlide}
            >
              <FaChevronLeft size={30} />
            </button>
          ) : (
            ""
          )}
          {hideNextbutton === false ? (
            <button
              className="screenshot_nextslidebutton"
              onClick={handleNextSlide}
            >
              <FaChevronRight size={17} />
            </button>
          ) : (
            ""
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Screenshots;
