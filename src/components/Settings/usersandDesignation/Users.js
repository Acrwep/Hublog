import React, { useState, useEffect } from "react";
import { Drawer, Row, Col, Space, Dropdown } from "antd";
import CommonTable from "../../../Components/Common/CommonTable";
import CommonInputField from "../../../Components/Common/CommonInputField";
import "../styles.css";
import CommonCalendar from "../../../Components/Common/CommonCalendar";
import CommonSelectField from "../../../Components/Common/CommonSelectField";
import {
  nameValidator,
  lastNameValidator,
  emailValidator,
  selectValidator,
  mobileValidator,
} from "../../../Components/Common/Validation";
import moment from "moment";
import { IoIosAdd } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import CommonSearchField from "../../../Components/Common/CommonSearchbar";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";
import Loader from "../../../Components/Common/Loader";

const Users = () => {
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
  const [role, setRole] = useState("");
  const [roleOptions, setRoleOptions] = useState([
    { id: 1, name: "Frontend Developer" },
    { id: 2, name: "Backend Developer" },
  ]);
  const [roleError, setRoleError] = useState("");
  const [designation, setDesignation] = useState("");
  const [designationOptions, setDesignationOptions] = useState([
    { id: 1, name: "Software Developer" },
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
  const [loading, setLoading] = useState(true);

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
      fixed: "right",
      width: 90,
      render: (text, record) => {
        const items = [
          {
            key: "1",
            label: (
              <div style={{ display: "flex" }}>
                <AiOutlineEdit size={19} className="users_tableeditbutton" />
                <button onClick={() => console.log(record)}>Edit</button>
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <div style={{ display: "flex" }}>
                <RiDeleteBin7Line
                  size={19}
                  className="users_tabledeletebutton"
                />
                <button onClick={() => console.log(record)}>Delete</button>
              </div>
            ),
          },
        ];
        return (
          <Space direction="vertical">
            <Space wrap>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomLeft"
                arrow
              >
                <button className="usertable_actionbutton">
                  <BsThreeDotsVertical />
                </button>
              </Dropdown>
            </Space>
          </Space>
        );
      },
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

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setFirstName("");
    setFirstNameError("");
    setLastName("");
    setLastNameError("");
    setEmail("");
    setEmailError("");
    setDateOfBirth("");
    setDateOfBirthError("");
    setDateOfJoining("");
    setDateOfJoiningError("");
    setPhone("");
    setPhoneError("");
    setGender("");
    setGenderError("");
    setRole("");
    setRoleError("");
    setDesignation("");
    setTeam("");
    setTeamError("");
    setEmployeeId("");
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
    const roleValidate = selectValidator(role);
    const teamValidate = selectValidator(team);

    setFirstNameError(firstnameValidate);
    setLastNameError(lastnameValidate);
    setEmailError(emailValidate);
    setDateOfBirthError(dateofbirthValidate);
    setDateOfJoiningError(dateofjoiningValidate);
    setPhoneError(phoneValidate);
    setGenderError(genderValidate);
    setRoleError(roleValidate);
    setTeamError(teamValidate);

    if (
      firstnameValidate ||
      lastnameValidate ||
      emailValidate ||
      dateofbirthValidate ||
      dateofjoiningValidate ||
      phoneValidate ||
      genderValidate ||
      roleValidate ||
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
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
            <Col xs={24} sm={24} md={24} lg={12}>
              <CommonSearchField
                placeholder="Search user..."
                onSearch={handleSearch}
              />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              className="users_adduserbuttonContainer"
            >
              <button className="users_addbutton" onClick={showDrawer}>
                <IoIosAdd size={24} style={{ marginRight: "4px" }} /> Add User
              </button>
            </Col>
          </Row>

          <CommonTable
            columns={columns}
            dataSource={dummydatas}
            scroll={{ x: 1200 }}
            dataPerPage={4}
          />
        </div>
      )}
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
              label="Role"
              onChange={(value) => {
                setRole(value);
                setRoleError(selectValidator(value));
              }}
              options={roleOptions}
              value={role}
              error={roleError}
              mandatory
            />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col span={12}>
            <CommonSelectField
              label="Designation"
              onChange={(value) => setDesignation(value)}
              options={designationOptions}
              value={designation}
            />
          </Col>
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
        </Row>

        <Row style={{ marginTop: "20px" }}>
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

export default Users;
