import React, { useState, useEffect, useRef, useCallback } from "react";
import { Row, Col, Button, Tooltip, Spin, Modal } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { CiStreamOn } from "react-icons/ci";
import { MdOutlineDesktopAccessDisabled } from "react-icons/md";
import CommonSelectField from "../Common/CommonSelectField";
import CommonAvatar from "../Common/CommonAvatar";
import PrismaZoom from "react-prismazoom";
import { FaEye } from "react-icons/fa";
import CommonNodatafound from "../Common/CommonNodatafound";
import { CommonToaster } from "../Common/CommonToaster";
import {
  getProjects,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import UnknownApp from "../../assets/images/unknownapp.png";
import "./styles.css";

const LiveStream = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [liveData, setLiveData] = useState([]);
  const [connection, setConnection] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [particularUserList, setParticularUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [clickedUserList, setClickedUserList] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [isManager, setIsManager] = useState(false);
  const [organizationId, setOrganizationId] = useState(null);
  const [modalUserName, setModalUserName] = useState("");
  const [modalTeamName, setModalTeamName] = useState("");
  const [screenShot, setScreenShot] = useState("");
  const [filterLoading, setFilterLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const reconnectAttempts = useRef(0);

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
    setLoading(true);
    setFilterLoading(true);
    setParticularUserList([]);
    setClickedUserList([]);
    const container = document.getElementById("header_collapesbuttonContainer");
    container.scrollIntoView({ behavior: "smooth" });
    const managerTeamId = localStorage.getItem("managerTeamId");
    try {
      const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage

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
      }, 350);
    }
  };

  const getUsersData = async () => {
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getUsers(orgId);
      const users = response?.data;

      setUserId(null);
      setUserList(users);
      setNonChangeUserList(users);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const getUsersDataByTeamId = async () => {
    const managerTeamId = localStorage.getItem("managerTeamId");

    try {
      const response = await getUsersByTeamId(managerTeamId);
      const teamMembersList = response?.data?.team?.users;
      setUserList(teamMembersList);
      setNonChangeUserList(teamMembersList);
    } catch (error) {
      CommonToaster(error?.message, "error");
      const teamMembersList = [];
      setNonChangeUserList(teamMembersList);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (particularUserList.length >= 1) {
      setLiveData(particularUserList);
    } else {
      setLiveData(userList);
    }

    let APIURL = "";

    if (process.env.NODE_ENV === "production") {
      APIURL = "https://workstatus.qubinex.com:8086";
    } else {
      APIURL = "https://localhost:7263";
    }

    const ws = new WebSocket(APIURL);
    let dataReceived = false;

    const reconnect = () => {
      if (reconnectAttempts.current < 5) {
        setTimeout(() => {
          reconnectAttempts.current++;
          setConnection(null); // Reset
        }, 2000 * reconnectAttempts.current); // Exponential backoff
      }
    };

    // 👇 Buffered logic
    let buffer = [];
    let flushTimeout = null;

    const flushBuffer = () => {
      if (buffer.length > 0) {
        setLiveData((prevData) => {
          const updated = [...prevData];
          buffer.forEach((incoming) => {
            const index = updated.findIndex((u) => u.id === incoming.userId);
            if (index !== -1) {
              updated[index] = {
                ...updated[index],
                activeApp: incoming.activeApp,
                activeUrl: incoming.activeUrl,
                liveStreamStatus: incoming.liveStreamStatus,
                activeAppLogo: incoming.activeAppLogo,
                activeScreenshot: incoming.activeScreenshot,
              };
            }
          });
          return updated;
        });

        // Handle screenshot updates for clicked users
        buffer.forEach((incoming) => {
          const clickedUser = clickedUserList.find(
            (c) => c.id === incoming.userId
          );
          if (clickedUser) {
            setScreenShot(incoming.activeScreenshot);
          }
        });

        setTimeout(() => setFilterLoading(false), 300);
        buffer = [];
      }
    };

    ws.onopen = () => {
      console.log("WebSocket connected");
      reconnectAttempts.current = 0;

      setTimeout(() => {
        if (!dataReceived) {
          console.log("No data received from WebSocket within 4 seconds.");
          setFilterLoading(false);
        }
      }, 4000);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("data:", data);
        buffer.push(data);
        dataReceived = true;

        if (!flushTimeout) {
          flushTimeout = setTimeout(() => {
            flushBuffer();
            flushTimeout = null;
          }, 100); // debounce time — can be tweaked
        }
      } catch (err) {
        console.error("WebSocket message parsing error:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      reconnect();
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      flushBuffer();
      reconnect();
    };

    setConnection(ws);

    return () => {
      console.log("Cleaning up WebSocket...");
      if (flushTimeout) clearTimeout(flushTimeout);

      // Flush buffer before closing
      flushBuffer();

      // Close WebSocket gracefully
      if (ws.readyState === WebSocket.OPEN) {
        ws.close(1000, "Client closing");
      }
    };
  }, [userList, particularUserList, clickedUserList]);

  //onchange functions
  const handleTeam = async (value) => {
    setFilterLoading(true);
    setTeamId(value);
    console.log(liveData);
    try {
      const response = await getUsersByTeamId(value);
      const teamMembersList = response?.data?.team?.users;
      if (teamMembersList.length <= 0) {
        setUserList([]);
        setUserId(null);
        return;
      }
      setParticularUserList([]);
      setUserList(teamMembersList);
      const userIdd = null;
      setUserId(userIdd);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setParticularUserList([]);
      setUserList([]);
    }
  };

  const handleUser = (value) => {
    setFilterLoading(true);
    setUserId(value);
    const filterParticularUser = userList.filter((f) => f.id === value);
    setParticularUserList(filterParticularUser);
  };

  const handleRefresh = () => {
    const managerTeamId = localStorage.getItem("managerTeamId");

    if (teamId === null && userId === null) {
      return;
    }
    if (managerTeamId && userId === null) {
      return;
    }
    setFilterLoading(true);
    setTeamId(managerTeamId ? parseInt(managerTeamId) : null);
    setUserId(null);
    setParticularUserList([]);
    setUserList(nonChangeUserList);
  };

  const handleScreenShot = (item) => {
    if (item.liveStreamStatus === true) {
      let clickedItem = [];
      clickedItem.push(item);
      setClickedUserList(clickedItem);
      setScreenShot(item.activeScreenshot);
      const clickedUser = nonChangeUserList.find((f) => f.id === item.id);
      console.log(clickedUser);
      setModalUserName(clickedUser?.full_Name || "Unknown");
      setModalTeamName(clickedUser?.teamName || "Unknown");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <CiStreamOn size={20} />
        </div>
        <h2
          className="allpage_mainheadings"
          onClick={() => console.log("liveeee", liveData)}
        >
          Livestream
        </h2>
      </div>

      {/* <p>Live Data</p>
      {liveData.map((data, index) => (
        <li key={index}>
          <strong>App:</strong> {data.activeApp} <br />
          <strong>URL:</strong> {data.activeUrl}
        </li>
      ))} */}

      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div
            className="field_selectfielsContainer"
            style={{ display: "flex" }}
          >
            <div className="field_teamselectfieldContainer">
              <CommonSelectField
                options={teamList}
                placeholder="All Teams"
                onChange={handleTeam}
                value={teamId}
                disabled={isManager}
              />
            </div>
            <div style={{ width: "170px" }}>
              <CommonSelectField
                options={userList}
                placeholder="Select User"
                onChange={handleUser}
                value={userId}
              />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="field_calendarContainer">
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

      {loading ? (
        <div className="liveStream_spinContainer">
          <Spin />
        </div>
      ) : (
        <>
          {liveData.length >= 1 ? (
            <div className="livestream_cardsmainContainer">
              <Row gutter={16} style={{ opacity: filterLoading ? 0.7 : 1 }}>
                {liveData.map((item, index) => (
                  <React.Fragment key={index}>
                    <Col
                      xs={24}
                      sm={24}
                      md={8}
                      lg={8}
                      style={{ marginBottom: "20px" }}
                    >
                      <div
                        className={
                          item.liveStreamStatus &&
                          item.liveStreamStatus === true
                            ? "livestream_cards"
                            : "livestream_offlinecards"
                        }
                      >
                        <div
                          className="livestreamcard_contentContainer"
                          style={{
                            opacity:
                              item.liveStreamStatus &&
                              item.liveStreamStatus === true
                                ? 1
                                : 0.7,
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <CommonAvatar
                              itemName={item.full_Name}
                              avatarSize={39}
                              avatarfontSize="17px"
                            />
                            <div>
                              <p className="livestream_username">
                                {item.full_Name}
                              </p>
                              <p className="livestream_useremail">
                                {item.email}
                              </p>
                            </div>
                          </div>

                          <div style={{ display: "flex", marginTop: "17px" }}>
                            {item.liveStreamStatus === true &&
                            item.activeAppLogo &&
                            item.activeAppLogo != "" ? (
                              <img
                                src={`data:image/png;base64,${item.activeAppLogo}`}
                                alt="Base64"
                                className="livestream_logos"
                              />
                            ) : item.liveStreamStatus === true &&
                              item.activeAppLogo === "" ? (
                              <img
                                src={UnknownApp}
                                alt="Unknown App"
                                className="livestream_logos"
                              />
                            ) : (
                              ""
                            )}

                            <div>
                              <p className="livestream_websitename">
                                {item.liveStreamStatus === true &&
                                item.activeApp &&
                                item.activeApp != ""
                                  ? item.activeApp
                                  : item.liveStreamStatus === true &&
                                    item.activeApp === ""
                                  ? "Unknown"
                                  : ""}
                              </p>
                              <p className="livestream_websiteurl">
                                {item.activeUrl && item.activeUrl.includes(":")
                                  ? item.activeUrl.split(":")[1]
                                  : item.activeUrl}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div
                          className={
                            item.liveStreamStatus &&
                            item.liveStreamStatus === true
                              ? "livestream_viewContainer"
                              : "livestream_offlineviewContainer"
                          }
                          style={{ display: filterLoading ? "none" : "block" }}
                          onClick={() => handleScreenShot(item)}
                        >
                          {item.liveStreamStatus &&
                          item.liveStreamStatus === true &&
                          filterLoading === false ? (
                            <FaEye
                              color="#000000"
                              size={27}
                              className="download_icon"
                            />
                          ) : item.liveStreamStatus === false &&
                            filterLoading === false ? (
                            <MdOutlineDesktopAccessDisabled
                              color="#000000"
                              size={27}
                              className="download_icon"
                            />
                          ) : (
                            <MdOutlineDesktopAccessDisabled
                              color="#000000"
                              size={27}
                              className="download_icon"
                            />
                          )}
                        </div>
                      </div>
                      <div
                        className="liveStream_filterspinContainer"
                        style={{ display: filterLoading ? "block" : "none" }}
                      >
                        <Spin />
                      </div>
                    </Col>
                  </React.Fragment>
                ))}
              </Row>
            </div>
          ) : (
            <CommonNodatafound />
          )}
        </>
      )}

      <Modal
        open={isModalOpen}
        onCancel={() => {
          // setClickedUserList([]);
          setIsModalOpen(false);
        }}
        footer={false}
        width={750}
        centered={true}
      >
        <div style={{ position: "relative" }}>
          <p className="livestreamModal_username">
            {modalUserName + " | " + modalTeamName}
          </p>
          <div style={{ overflow: "hidden", maxHeight: "80vh", width: "100%" }}>
            <PrismaZoom className="livestream_prismazoom">
              <img
                src={`data:image/png;base64,${screenShot}`}
                className="screenshot_modalImage"
                alt="Screenshot"
                tabindex="-1"
              />
            </PrismaZoom>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LiveStream;
