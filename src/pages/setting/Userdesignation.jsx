import React, { useState, useEffect } from "react";
import { Tabs, Button, Table, Drawer, Row, Col, Input } from "antd";
import CommonInputField from "../../components/Common/CommonInputField";
import "./styles.css";
import CommonCalendar from "../../components/Common/CommonCalendar";
import CommonSelectField from "../../components/Common/CommonSelectField";
import {
  nameValidator,
  lastNameValidator,
  emailValidator,
  selectValidator,
  mobileValidator,
} from "../../components/Common/Validation";
import moment from "moment";
import CommonSearchField from "../../components/Common/CommonSearchbar";

const Userdesignation = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dateofBirth, setDateOfBirth] = useState(null);
  const [dateofBirthError, setDateOfBirthError] = useState("");
  const [dateofJoining, setDateOfJoining] = useState(null);
  const [dateofJoiningError, setDateOfJoiningError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");
  const [genderOptions, setGenderOptions] = useState([
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
  ]);
  const [designation, setDesignation] = useState("");
  const [designationOptions, setDesignationOptions] = useState([
    { id: 1, name: "Developer" },
    { id: 2, name: "Support" },
  ]);
  const [team, setTeam] = useState("");
  const [teamError, setTeamError] = useState("");
  const [teamOptions, setTeamOptions] = useState([
    { id: 1, name: "Frontend" },
    { id: 2, name: "Backend" },
  ]);
  const [employeeId, setEmployeeId] = useState("");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name", width: 150 },
    { title: "Email", dataIndex: "email", key: "email", width: 250 },
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
  const [dummydatas, setDummyDatas] = useState([
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
  ]);

  const [duplicateDummydatas, setDuplicateDummyDatas] = useState([
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
  ]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginationConfig = {
    current: currentPage,
    pageSize: 2,
    total: dummydatas.length,
    onChange: handlePageChange,
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

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleDateOfBirth = (date) => {
    if (date) {
      setDateOfBirth(date.toDate());
      setDateOfBirthError(selectValidator(date.toDate()));
    } else {
      setDateOfBirth(null);
    }
  };

  const handleDateOfJoining = (date) => {
    if (date) {
      setDateOfJoining(date.toDate());
      setDateOfJoiningError(selectValidator(date.toDate()));
    } else {
      setDateOfJoining(null);
    }
  };

  const handleSearch = (value) => {
    console.log("Search value:", value);
    if (value === "") {
      setDummyDatas(duplicateDummydatas);
      return;
    }
    const filterData = dummydatas.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    console.log("filter", filterData);
    setDummyDatas(filterData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dateofBirth);

    const firstnameValidate = nameValidator(firstName);
    const lastnameValidate = lastNameValidator(lastName);
    const emailValidate = emailValidator(email);
    const dateofbirthValidate = selectValidator(dateofBirth);
    const dateofjoiningValidate = selectValidator(dateofJoining);
    const phoneValidate = mobileValidator(phone);
    const genderValidate = selectValidator(gender);
    const teamValidate = selectValidator(team);

    setFirstNameError(firstnameValidate);
    setLastNameError(lastnameValidate);
    setEmailError(emailValidate);
    setDateOfBirthError(dateofbirthValidate);
    setDateOfJoiningError(dateofjoiningValidate);
    setPhoneError(phoneValidate);
    setGenderError(genderValidate);
    setTeamError(teamValidate);

    if (
      firstnameValidate ||
      lastnameValidate ||
      emailValidate ||
      dateofbirthValidate ||
      dateofjoiningValidate ||
      phoneValidate ||
      genderValidate ||
      teamValidate
    )
      return;

    const object = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dateOfBirsth: dateofBirth,
      dateOfJoining: dateofJoining,
      phone: phone,
      gender: gender,
      designation: designation,
      team: team,
      employeeId: employeeId,
    };
    console.log("response", object);
    // alert("Success");
  };

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
            {/* <Button type="primary" onClick={showDrawer}>
              Open
            </Button> */}
            {/* <div style={{ display: "flex" }}>
              <CommonSearchField />

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
              >
                <button className="users_submitbutton" onClick={showDrawer}>
                  Add User
                </button>
              </div>
            </div> */}

            <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
              <Col span={12}>
                <CommonSearchField
                  placeholder="Search user..."
                  onSearch={handleSearch}
                />
              </Col>
              <Col
                span={12}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "0px 9px",
                }}
              >
                <button className="users_submitbutton" onClick={showDrawer}>
                  Add User
                </button>
              </Col>
            </Row>

            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={dummydatas}
              scroll={{ x: 1200 }} // Enable horizontal scrolling
              pagination={paginationConfig}
              tableLayout="fixed" // Ensures the table layout is fixed
            />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Designation" key="2">
          <p>Content of Tab Pane 2</p>
        </Tabs.TabPane>
      </Tabs>

      {/* user creation drawer */}
      <Drawer title="Add user" onClose={onClose} open={open} width={600}>
        <Row gutter={16}>
          <Col span={12}>
            <CommonInputField
              label="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError(nameValidator(e.target.value));
              }}
              value={firstName}
              error={firstNameError}
              mandatory
            />
          </Col>
          <Col span={12}>
            <CommonInputField
              label="Last Name"
              mandatory
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError(lastNameValidator(e.target.value));
              }}
              value={lastName}
              error={lastNameError}
            />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col span={12}>
            <CommonInputField
              label="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(emailValidator(e.target.value));
              }}
              value={email}
              error={emailError}
              mandatory
            />
          </Col>
          <Col span={12}>
            <CommonCalendar
              label="Date of Birth"
              onChange={handleDateOfBirth}
              value={dateofBirth}
              error={dateofBirthError}
              mandatory
            />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col span={12}>
            <CommonCalendar
              label="Date of Joining"
              onChange={handleDateOfJoining}
              value={dateofJoining}
              error={dateofJoiningError}
              mandatory
            />
          </Col>
          <Col span={12}>
            <CommonInputField
              label="Phone"
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError(mobileValidator(e.target.value));
              }}
              value={phone}
              error={phoneError}
              maxLength={10}
              mandatory
            />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col span={12}>
            <CommonSelectField
              label="Gender"
              onChange={(value) => {
                setGender(value);
                setGenderError(selectValidator(value));
              }}
              options={genderOptions}
              value={gender}
              error={genderError}
              mandatory
            />
          </Col>
          <Col span={12}>
            <CommonSelectField
              label="Designation"
              onChange={(value) => setDesignation(value)}
              options={designationOptions}
              value={designation}
            />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col span={12}>
            <CommonSelectField
              label="Team"
              onChange={(value) => {
                setTeam(value);
                setTeamError(selectValidator(value));
              }}
              options={teamOptions}
              value={team}
              error={teamError}
              mandatory
            />
          </Col>
          <Col span={12}>
            <CommonInputField
              label="Employee Id"
              onChange={(e) => setEmployeeId(e.target.value)}
              value={employeeId}
            />
          </Col>
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <button className="users_submitbutton" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default Userdesignation;
