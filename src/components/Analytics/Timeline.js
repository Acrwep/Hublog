import React, { useState, useEffect } from "react";
import { Row, Col, Tooltip, Button } from "antd";
import CommonSelectField from "../Common/CommonSelectField";
import CommonDatePicker from "../Common/CommonDatePicker";
import { MdOutlineTimeline } from "react-icons/md";
import { RedoOutlined } from "@ant-design/icons";
import { getTeams, getUsers, getUsersByTeamId } from "../APIservice.js/action";
import CommonTable from "../Common/CommonTable";
import CommonAvatar from "../Common/CommonAvatar";
import { CommonToaster } from "../Common/CommonToaster";
import "./styles.css";
import { render } from "@testing-library/react";

const Timeline = () => {
  const [date, setDate] = useState(new Date());
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);

  const columns = [
    {
      title: <div style={{ marginLeft: "12px" }}>Employee</div>,
      width: 160,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (text, record) => {
        return (
          <div
            className="breakreport_employeenameContainer"
            style={{ padding: "0px 10px" }}
          >
            <CommonAvatar
              avatarSize={31}
              itemName={text}
              avatarfontSize="15px"
            />
            <p className="reports_avatarname">{text}</p>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>12:00 am</div>,
      width: 100,
      dataIndex: "time",
      key: "1",
      render: (text, record) => {
        const date = new Date(record.time);
        const hour = date.getHours();
        if (hour === 0) {
          return (
            <div className="flex">
              <div
                style={{
                  backgroundColor: "white",
                  width: `${50}px`,
                  height: "20px",
                  lineHeight: "32px",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "red",
                  width: `${70}px`,
                  height: "20px",
                  lineHeight: "32px",
                }}
              ></div>
            </div>
          );
        } else {
          return null;
        }
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>01:00 am</div>,
      width: 100,
      dataIndex: "time",
      key: "2",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>02:00 am</div>,
      width: 100,
      dataIndex: "time",
      key: "3",
      render: (text, record) => {
        return (
          <div className="flex" style={{ width: "100%" }}>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>03:00 am</div>,
      width: 100,
      dataIndex: "time",
      key: "4",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>04:00 am</div>,
      width: 100,
      dataIndex: "time",
      key: "5",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>05:00 am</div>,
      width: 100,
      dataIndex: "time",
      key: "6",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>06:00 am</div>,
      width: 100,
      dataIndex: "time",
      key: "7",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>07:00 am</div>,
      width: 100,
      dataIndex: "time",
      key: "8",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>08:00 am</div>,
      width: 100,
      dataIndex: "time",
      key: "9",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>09:00 am</div>,
      width: 100,
      dataIndex: "time",
      key: "10",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "#25a17d",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "#25a17d",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>10:00 am</div>,
      width: 100,
      dataIndex: "time",
      key: "11",
      render: (text, record) => {
        const date = new Date(record.time);
        const hour = date.getHours();
        if (hour === 10) {
          return (
            <div className="flex">
              <div
                className="timeline_bars"
                style={{
                  backgroundColor: "#25a17d",
                }}
              ></div>
              <div
                className="timeline_bars"
                style={{
                  backgroundColor: "#25a17d",
                }}
              ></div>
            </div>
          );
        } else {
          return null;
        }
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>11:00 am</div>,
      width: 100,
      dataIndex: "time",
      key: "4",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "rgba(255,185,0,0.79",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "rgba(255,185,0,0.79",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>12:00 am</div>,
      width: 100,
      dataIndex: "time",
      key: "4",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "#25a17d",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "#25a17d",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>01:00 pm</div>,
      width: 100,
      dataIndex: "time",
      key: "4",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "rgba(255,185,0,0.79",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "rgba(255,185,0,0.79",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>02:00 pm</div>,
      width: 100,
      dataIndex: "time",
      key: "4",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "rgba(255,185,0,0.79",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "rgba(255,185,0,0.79",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>03:00 pm</div>,
      width: 100,
      dataIndex: "time",
      key: "4",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "#ABB3B3",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "#ABB3B3",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>04:00 pm</div>,
      width: 100,
      dataIndex: "time",
      key: "4",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "#25a17d",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "rgba(255,185,0,0.79",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>05:00 pm</div>,
      width: 100,
      dataIndex: "time",
      key: "4",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "#25a17d",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "#25a17d",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>06:00 pm</div>,
      width: 100,
      dataIndex: "time",
      key: "4",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "#25a17d",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "#25a17d",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>07:00 pm</div>,
      width: 100,
      dataIndex: "time",
      key: "4",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      title: <div style={{ marginLeft: "12px" }}>08:00 pm</div>,
      width: 100,
      dataIndex: "time",
      key: "4",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
            <div
              className="timeline_bars"
              style={{
                backgroundColor: "transparent",
              }}
            ></div>
          </div>
        );
      },
    },
    // Add similar columns for other time slots
    // Remember to replace 'timer1', 'timer2', etc. with actual data keys
  ];

  const data = [
    {
      name: "Balaji R",
      time: "2024-10-01T10:42:32.000",
    },
  ];
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
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getUsers(orgId);
      const usersList = response?.data;

      setUserList(usersList);
      setNonChangeUserList(usersList);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
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
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    }
  };

  const handleUser = (value) => {
    setUserId(value);
  };

  const onDateChange = (value) => {
    setDate(value);
  };

  return (
    // <div className="p-8 max-sm:p-0">
    //   <div className="flex justify-start items-center">
    //     <VscGraphLine className="text-2xl text-blue-600" />
    //     <h2 className="text-xl font-bold ml-2">Timeline</h2>
    //   </div>
    //   <div className="flex justify-between items-center w-full mb-2 max-sm:flex-col max-sm:w-full">
    //     <div>
    //       <Dropdown />
    //     </div>
    //     <div className="flex justify-end items-center h-20 w-full max-sm:flex-col">
    //       <div>
    //         <DateRangePicker />
    //       </div>
    //       <div>
    //         <button className="text-blue-500 p-1 m-1 border border-black rounded-lg">
    //           <MdDownload />
    //         </button>
    //         <button className="text-blue-500 p-1 border border-black rounded-md">
    //           <MdRefresh />
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   <div>
    //     <TimelineTable />
    //   </div>
    // </div>

    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <MdOutlineTimeline size={20} />
        </div>
        <h2 className="allpage_mainheadings">Timeline</h2>
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
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="wellness_calendarContainer">
            <div>
              <CommonDatePicker onChange={onDateChange} value={date} />
            </div>
            <Tooltip placement="top" title="Refresh">
              <Button
                className="dashboard_refresh_button"
                style={{ marginLeft: "12px" }}
              >
                <RedoOutlined className="refresh_icon" />
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>

      <div className="breakreport_tableContainer" style={{ marginTop: "20px" }}>
        <CommonTable
          columns={columns}
          dataSource={data}
          scroll={{ x: 3400 }}
          dataPerPage={10}
          size="small"
          // loading={tableLoading}
          checkBox="false"
          bordered="false"
          className="no-gap-table"
        />
      </div>
    </div>
  );
};

export default Timeline;
