import React, { useState, useEffect } from "react";
// import Table from "../../components/table/Table";
import { IoSearchSharp } from "react-icons/io5";
import SidebarForm from "./AddUser";
import { Tabs, Button, Table, Drawer } from "antd";
import "./styles.css";

const Userdesignation = () => {
  const [activePage, setActivePage] = useState(1);
  const [data, setData] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const dummycolumns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Team", dataIndex: "teamName", key: "teamName" },
    { title: "Role", dataIndex: "roleName", key: "roleName" },
    { title: "DOB", dataIndex: "dob", key: "dob" },
    { title: "DOJ", dataIndex: "doj", key: "doj" },
    { title: "Status", dataIndex: "active", key: "active" },
    {
      title: "Action",
      dataIndex: "accessLevel",
      key: "accessLevel",
    },
  ];
  const dummydatas = [
    {
      key: "1",
      name: "John Brown",
      email: "john.brown@example.com",
      teamName: "Team A",
      roleName: "Developer",
      dob: "1990-01-01",
      doj: "2020-01-01",
      active: "Active",
      accessLevel: "Admin",
    },
    {
      key: "2",
      name: "Jim Green",
      email: "jim.green@example.com",
      teamName: "Team B",
      roleName: "Manager",
      dob: "1985-01-01",
      doj: "2018-01-01",
      active: "Inactive",
      accessLevel: "User",
    },
    {
      key: "3",
      name: "Joe Black",
      email: "joe.black@example.com",
      teamName: "Team C",
      roleName: "Tester",
      dob: "1992-01-01",
      doj: "2019-01-01",
      active: "Active",
      accessLevel: "User",
    },
    {
      key: "4",
      name: "Disabled User",
      email: "disabled.user@example.com",
      teamName: "Team D",
      roleName: "Support",
      dob: "1980-01-01",
      doj: "2010-01-01",
      active: "Inactive",
      accessLevel: "Admin",
    },
  ];

  const [selectionType, setSelectionType] = useState("checkbox");

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  useEffect(() => {
    const token =
      "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQEh1YmxvZy5jb20iLCJ1c2VySWQiOjEsInJvbGUiOiJBRE1JTiIsInN1YiI6MSwibmJmIjoxNzEzMTg4ODY0LjAsImlhdCI6MTcxMzE4ODg2NC4wLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ0MzAwLyIsImF1ZCI6InNlY3VyZWFwaXVzZXIiLCJleHAiOjE3MTMxOTYwNjQuMH0.VbXKnhK0SB1viG2bmWXuPCOBt6UwU2WfOlt2wYVLZhg";

    fetch("http://65.1.247.242:8002/api/Admin/GetUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        setData(data?.user);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const DesignationData = [
    { name: "OPERATION", description: "", createdat: "2023-11-02", action: "" },
    {
      name: "EXTERNAL HR",
      description: "",
      createdat: "2023-11-02",
      action: "",
    },
    {
      name: "Sales Executive",
      description: "sales",
      createdat: "2023-11-02",
      action: "",
    },
    {
      name: "INTERNAL HR",
      description: "",
      createdat: "2023-11-02",
      action: "",
    },
    { name: "QUALITY", description: "", createdat: "2023-11-02", action: "" },
    { name: "SEO", description: "", createdat: "2023-11-02", action: "" },
    { name: "BOE", description: "", createdat: "2023-11-02", action: "" },
  ];

  const deginationcolumns = [
    { title: "Name", key: "name", width: "150px" },
    { title: "Description", key: "description", width: "150px" },
    { title: "Created At", key: "createdat", width: "150px" },
    { title: "Action", key: "action", width: "150px" },
  ];
  return (
    <div className="settings_usersContainer">
      {/* {showAddUser && <SidebarForm showAddUser={showAddUser} setShowAddUser={setShowAddUser} />}
      <div>
        <h2>Users & Designations</h2>
        <ul className=" flex p-2 text-gray-600">
          <li
            onClick={() => handlePageChange(1)}
            className={`mx-3 cursor-pointer ${
              activePage === 1 ? "border-b border-blue-600" : ""
            }`}
          >
            Users
          </li>
          <li
            onClick={() => handlePageChange(2)}
            className={`mx-3 cursor-pointer ${
              activePage === 2 ? "border-b border-blue-600" : ""
            }`}
          >
            Designation
          </li>
        </ul>
        <hr />
      </div>

      <div>
        {activePage === 1 && (
          <div>
            <div className="flex">
              <input
                type="search"
                className=" w-2/7 h-8 border border-gray-500 rounded-tl-lg rounded-bl-lg mt-5 ml-5"
              />
              <div className="w-12 border border-gray-500 p-1 mt-5 h-8 rounded-tr-lg rounded-br-lg text-2xl">
                <IoSearchSharp />
              </div>
              <button
                className={`m-2 p-1 cursor-pointer bg-blue-500 text-white rounded-tl-lg`}
                onClick={()=>{setShowAddUser(!showAddUser)}}
              >
                Add User
              </button>
            </div>
            {data?.length > 0 && <Table data={data} columns={columns} />}
          </div>
        )}
        {activePage === 2 && (
          <div>
            <div className="flex">
              <input
                type="search"
                className=" w-2/7 h-8 border border-gray-500 rounded-tl-lg rounded-bl-lg mt-5 ml-5"
              />
              <div className="w-12 border border-gray-500 p-1 mt-5 h-8 rounded-tr-lg rounded-br-lg text-2xl">
                <IoSearchSharp />
              </div>
            </div>
            <Table data={DesignationData} columns={deginationcolumns} />
          </div>
        )}
      </div> */}

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Users" key="1">
          <div>
            <Button type="primary" onClick={showDrawer}>
              Open
            </Button>
            <Drawer title="Basic Drawer" onClose={onClose} open={open}>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Drawer>

            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={dummydatas}
              scroll={{ x: "300px" }} // Enable horizontal scrolling
            />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Designation" key="2">
          <p>Content of Tab Pane 2</p>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Userdesignation;
