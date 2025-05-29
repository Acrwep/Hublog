import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip, Empty, Spin } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import { MdScreenshotMonitor } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import Screenshot1 from "../../assets/images/Screenshot 2024-07-05 125005.png";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import { MdOutlineFileDownload } from "react-icons/md";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import CommonAvatar from "../Common/CommonAvatar";
import { getTeams, getUsers, getUsersByTeamId } from "../APIservice.js/action";
import { CommonToaster } from "../Common/CommonToaster";
import { MdLocationOff } from "react-icons/md";
import CommonNodatafound from "../Common/CommonNodatafound";
import { getPunchInUsers } from "../APIservice.js/action";

const Field = () => {
  const [date, setDate] = useState(new Date());
  const [connection, setConnection] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [filterLoading, setFilterLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clickedUserId, setClickedUserId] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = async () => {
    setLoading(true);
    setFilterLoading(true);
    const container = document.getElementById("header_collapesbuttonContainer");
    container.scrollIntoView({ behavior: "smooth" });

    const orgId = localStorage.getItem("organizationId");
    const payload = {
      organizationId: orgId,
      date: new Date(),
    };
    try {
      const response = await getPunchInUsers(payload);
      const users = response?.data;

      if (users.length >= 1) {
        setUserId(users[0].id);
        setClickedUserId(users[0].id);
        setUserList(users);
        setNonChangeUserList(users);
      } else {
        setUserId(null);
        setClickedUserId(null);
        setUserList([]);
        setNonChangeUserList([]);
      }
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
      setUserId(null);
      setClickedUserId(null);
      setNonChangeUserList([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  // useEffect(() => {
  //   const subDomain = localStorage.getItem("subDomain");
  //   let APIURL = "";

  //   if (process.env.NODE_ENV === "production") {
  //     APIURL = `https://${
  //       subDomain !== "null" && subDomain !== null ? subDomain + "." : ""
  //     }workstatus.qubinex.com:8086`; // production
  //   } else {
  //     APIURL = `https://${
  //       subDomain !== "null" && subDomain !== null ? subDomain + "." : ""
  //     }localhost:7263`; //dev
  //   }

  //   const connection = new HubConnectionBuilder()
  //     .withUrl(`${APIURL}/livestreamHub`, {
  //       withCredentials: true,
  //     })
  //     .withAutomaticReconnect([0, 2000, 5000, 10000])
  //     .build();

  //   let dataReceived = false; // Track if data has been received

  //   setLatitude("");
  //   setLongitude("");
  //   setFilterLoading(true);
  //   // Start the connection
  //   connection
  //     .start()
  //     .then(() => {
  //       console.log("Connected to SignalR");
  //       // Now you can listen for events
  //       setTimeout(() => {
  //         if (!dataReceived) {
  //           console.warn("No data received from SignalR within 4 seconds.");
  //           setFilterLoading(false);
  //           setLatitude("");
  //           setLongitude("");
  //         }
  //       }, 4000);
  //       connection.on(
  //         "ReceiveLiveData",
  //         (
  //           userIdReceived,
  //           organizationIdReceived,
  //           activeApp,
  //           activeUrl,
  //           liveStreamStatus,
  //           activeAppLogo,
  //           activeScreenshot,
  //           latitudeReceived,
  //           longitudeReceived
  //         ) => {
  //           dataReceived = true;

  //           console.log(
  //             "latttttttttt",
  //             latitude,
  //             longitude,
  //             clickedUserId,
  //             userIdReceived
  //           );
  //           // if (clickedUserId !== userIdReceived) {
  //           //   setLatitude("");
  //           //   setFilterLoading(false);
  //           //   setLongitude("");
  //           //   return;
  //           // }

  //           if (clickedUserId === userIdReceived) {
  //             dataReceived = true; // Mark that data was received

  //             if (latitudeReceived && longitudeReceived) {
  //               console.log("Updating location for clicked user.");
  //               setLatitude(latitudeReceived);
  //               setLongitude(longitudeReceived);
  //             } else {
  //               console.warn("No location data available for this user.");
  //               setLatitude(""); // Reset if no lat/lng is available
  //               setLongitude("");
  //             }
  //           }

  //           setTimeout(() => setFilterLoading(false), 300);
  //         }
  //       );
  //     })
  //     .catch((err) => console.error("Error while starting connection: " + err));

  //   setConnection(connection);

  //   // Cleanup the connection when the component is unmounted
  //   return () => {
  //     connection.stop();
  //   };
  // }, [userList, clickedUserId]);

  const handleUser = (value) => {
    setFilterLoading(true);
    setUserId(value);
    setClickedUserId(value);
  };

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <GrMapLocation size={20} />
        </div>
        <h2 className="allpage_mainheadings">Field</h2>
      </div>

      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div
            className="field_selectfielsContainer"
            style={{ display: "flex" }}
          >
            {/* <div className="field_teamselectfieldContainer">
              <CommonSelectField
                options={teamList}
                placeholder="All Teams"
                onChange={handleTeam}
                value={teamId}
              />{" "}
            </div> */}
            <div style={{ width: "170px" }}>
              <CommonSelectField
                options={userList}
                placeholder="Select User"
                onChange={handleUser}
                value={userId}
              />{" "}
            </div>
          </div>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={7} lg={7} style={{ height: "75vh" }}>
          <div className="screenshots_usersmainContainer">
            <div className="screenshots_userlistheaderContainer">
              <p className="screenshots_userheading">Punched In Users</p>
            </div>

            <hr className="screenshot_userhrtag" />
            <div className="screenshots_usersnamemainContainer">
              {userList.length >= 1 ? (
                <>
                  {userList.map((item) => {
                    return (
                      <>
                        <div
                          className={
                            clickedUserId === item.id
                              ? "field_activeusersnameContainer"
                              : "field_usersnameContainer"
                          }
                          onClick={() => {
                            setClickedUserId(item.id);
                            setFilterLoading(true);
                          }}
                        >
                          <CommonAvatar itemName={item.full_Name} />
                          <p>{item.full_Name}</p>
                        </div>
                        <hr className="screenshot_users_hrtag" />
                      </>
                    );
                  })}
                </>
              ) : (
                <div>
                  <CommonNodatafound />
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={17} lg={17} style={{ height: "auto" }}>
          {filterLoading === false ? (
            <>
              {latitude != "" && latitude != "" ? (
                <iframe
                  src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                  className="w-full"
                  height="450"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  title="map"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="field_notfounddiv">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Location not found"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="field_notfounddiv">
              <Spin />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Field;
