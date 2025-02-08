import React, { useState, useEffect } from "react";
import { Row, Col, Space, Dropdown, Input, Modal, Drawer } from "antd";
import CommonTable from "../../../Components/Common/CommonTable";
import CommonInputField from "../../../Components/Common/CommonInputField";
import "../styles.css";
import CommonCalendar from "../../../Components/Common/CommonCalendar";
import CommonSelectField from "../../../Components/Common/CommonSelectField";
import "../../Common/commonstyles.css";
import {
  nameValidator,
  lastNameValidator,
  emailValidator,
  selectValidator,
  mobileValidator,
} from "../../../Components/Common/Validation";
import moment from "moment";
import CommonSearchField from "../../../Components/Common/CommonSearchbar";
import { AiOutlineEdit } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import Loader from "../../../Components/Common/Loader";
import CommonAddButton from "../../Common/CommonAddButton";
import { CommonToaster } from "../../Common/CommonToaster";
import { MdOutlineFileDownload } from "react-icons/md";
import {
  createUser,
  getAllUsers,
  updateUser,
} from "../../APIservice.js/action";
import { useDispatch, useSelector } from "react-redux";
import {
  storeUsers,
  storeUsersCount,
  storeUserSearchValue,
  storeUsersForTeamsTab,
} from "../../Redux/slice";
import CommonWarningModal from "../../Common/CommonWarningModal";

const Users = ({ loading }) => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users);
  const usersCount = useSelector((state) => state.userscount);
  const userSearchValue = useSelector((state) => state.usersearchvalue);
  const designationList = useSelector((state) => state.designation);
  const activeDesignationList = useSelector((state) => state.activedesignation);
  const teamList = useSelector((state) => state.teams);
  const activeTeamList = useSelector((state) => state.activeteams);
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [dateofBirth, setDateOfBirth] = useState(null);
  const [dateofBirthError, setDateOfBirthError] = useState("");
  const [dateofJoining, setDateOfJoining] = useState(null);
  const [dateofJoiningError, setDateOfJoiningError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");
  const genderOptions = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
  ];
  const [role, setRole] = useState("");
  const roleOptions = [
    { id: 2, name: "Administrator" },
    { id: 3, name: "User" },
  ];
  const [roleError, setRoleError] = useState("");
  const [designation, setDesignation] = useState("");
  const [team, setTeam] = useState("");
  const [teamError, setTeamError] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [validationTrigger, setValidationTrigger] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 190,
      fixed: "left",
      render: (text, record) => {
        return <p>{record.first_Name + " " + record.last_Name} </p>;
      },
    },
    { title: "Email", dataIndex: "email", key: "email", width: 340 },
    {
      title: "Designation",
      dataIndex: "designationId",
      key: "designationId",
      width: 260,
      render: (text, record) => {
        const findDesign = activeDesignationList.find((f) => f.id === text);
        return <p>{findDesign.name} </p>;
      },
    },
    {
      title: "Team",
      dataIndex: "teamId",
      key: "teamId",
      width: 220,
      render: (text, record) => {
        const findTeam = teamList.find((f) => f.id === text);
        return <p>{findTeam.name} </p>;
      },
    },
    {
      title: "Role",
      dataIndex: "roleId",
      key: "roleId",
      render: (text, record) => {
        if (text === 1) {
          return <p>Admin</p>;
        } else if (text === 2) {
          return <p>Admin </p>;
        } else {
          return <p>User</p>;
        }
      },
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      render: (text, record) => {
        return <p>{moment(text).format("DD/MM/YYYY")} </p>;
      },
    },
    {
      title: "DOJ",
      dataIndex: "doj",
      key: "doj",
      render: (text, record) => {
        return <p>{moment(text).format("DD/MM/YYYY")} </p>;
      },
    },
    { title: "Employee Id", dataIndex: "employeeID", key: "employeeID" },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      width: 110,
      render: (text, record) => {
        if (text === true) {
          return (
            <div className="logsreport_mappingActivetextContainer">
              <p>Active</p>
            </div>
          );
        } else {
          return (
            <div className="logsreport_statusInActivetextContainer">
              <p>Inactive</p>
            </div>
          );
        }
      },
    },
    {
      title: "Action",
      dataIndex: "accessLevel",
      key: "accessLevel",
      fixed: "right",
      align: "center",
      width: 90,
      render: (text, record) => {
        const items = [
          {
            key: "1",
            label: (
              <div
                style={{ display: "flex" }}
                onClick={() => handleEdit(record)}
              >
                <AiOutlineEdit size={19} className="users_tableeditbutton" />
                <button onClick={() => console.log(record)}>Edit</button>
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <div
                style={{ display: "flex" }}
                onClick={() => {
                  CommonWarningModal({
                    title: (
                      <p style={{ fontWeight: "500", fontSize: "14px" }}>
                        {`Do you want to ${
                          record.active === false ? "active" : "Inactive"
                        }`}
                        <span style={{ fontWeight: "700", fontSize: "16px" }}>
                          {" " + record.full_Name}
                        </span>
                      </p>
                    ),
                    onDelete: () => handleDeactivate(record),
                  });
                }}
              >
                {record.active === false ? (
                  <IoMdCheckmark
                    size={19}
                    className="users_tableactivebutton"
                  />
                ) : (
                  <RxCross2 size={19} className="users_tableinactivebutton" />
                )}
                <button>
                  {record.active === true ? "Inactive" : "Active"}
                </button>
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
        // return (
        //   <button onClick={() => handleEdit(record)}>
        //     <AiOutlineEdit size={20} className="alertrules_tableeditbutton" />
        //   </button>
        // );
      },
    },
  ];

  useEffect(() => {
    if (loading === false) {
      setSearch(userSearchValue);
      //check searchvalue, because of if its not empty call the user search api with the already stored searchvalue
      if (
        userSearchValue === "" ||
        userSearchValue === null ||
        usersList.length < 1
      ) {
        return;
      } else {
        handleSearchfromUseEffect(userSearchValue);
      }
    }
  }, []);

  //getuser api function
  const getUsersData = async () => {
    setTableLoading(true);
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getAllUsers(orgId);
      console.log("users response", response?.data);
      const allUsers = response?.data;
      dispatch(storeUsersCount(allUsers.length));
      dispatch(storeUsers(allUsers));
      dispatch(storeUsersForTeamsTab(allUsers));
      //null the search value
      const searchValue = "";
      dispatch(storeUserSearchValue(searchValue));
      setSearch(searchValue);
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
    } finally {
      setTimeout(() => {
        setTableLoading(false);
      }, 350);
    }
  };

  //reset all useStates
  const formReset = () => {
    setOpen(false);
    setFirstName("");
    setFirstNameError("");
    setLastName("");
    setLastNameError("");
    setEmail("");
    setEmailError("");
    setPassword("");
    setPasswordError("");
    setPasswordVisible(false);
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
    setEdit(false);
    setValidationTrigger(false);
  };

  const onClose = () => {
    formReset();
  };

  const handleDateOfBirth = (date) => {
    console.log("date of birth", date);
    if (date) {
      setDateOfBirth(date.toDate());
      if (validationTrigger) {
        setDateOfBirthError(selectValidator(date.toDate()));
      }
    } else {
      setDateOfBirth(null);
    }
  };

  const handleDateOfJoining = (date) => {
    if (date) {
      setDateOfJoining(date.toDate());
      if (validationTrigger) {
        setDateOfJoiningError(selectValidator(date.toDate()));
      }
    } else {
      setDateOfJoining(null);
    }
  };

  //user search function
  const handleSearchfromUseEffect = async (value) => {
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getAllUsers(orgId, value);
      const allUsers = response?.data;
      dispatch(storeUsers(allUsers));
    } catch (error) {
      const allUsers = [];
      dispatch(storeUsers(allUsers));
    }
  };

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearch(value);
    dispatch(storeUserSearchValue(value));
    setTableLoading(true);

    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getAllUsers(orgId, value);
      const allUsers = response?.data;
      dispatch(storeUsers(allUsers));
    } catch (error) {
      const allUsers = [];
      dispatch(storeUsers(allUsers));
    } finally {
      setTimeout(() => {
        setTableLoading(false);
      }, 350);
    }
  };

  //fetching clicked item data to the user form
  const handleEdit = (record) => {
    setEdit(true);
    setOpen(true);
    setUserId(record.id);
    setFirstName(record.first_Name);
    setLastName(record.last_Name);
    setEmail(record.email);
    setPassword(record.password);
    setDateOfBirth(record.dob);
    setDateOfJoining(record.doj);
    setPhone(record.phone);
    setDesignation(record.designationId);
    setTeam(record.teamId);
    setGender(record.gender === "Male" ? 1 : 2);
    setRole(record.roleId);
    setEmployeeId(record.employeeID);
  };

  //user create and update api function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationTrigger(true);
    console.log(
      "Date of birth",
      dateofBirth,
      "date of joinging",
      dateofJoining
    );
    const firstnameValidate = nameValidator(firstName);
    const lastnameValidate = lastNameValidator(lastName);
    const emailValidate = emailValidator(email);
    let passwordValidate = "";

    if (password === "") {
      passwordValidate = " Password is required";
    } else if (password < 3) {
      passwordValidate = " Password is not valid";
    } else {
      passwordValidate = "";
    }
    const dateofbirthValidate = selectValidator(dateofBirth);
    const dateofjoiningValidate = selectValidator(dateofJoining);
    const phoneValidate = mobileValidator(phone);
    const genderValidate = selectValidator(gender);
    const roleValidate = selectValidator(role);
    const teamValidate = selectValidator(team);

    setFirstNameError(firstnameValidate);
    setLastNameError(lastnameValidate);
    setEmailError(emailValidate);
    setPasswordError(passwordValidate);
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
      passwordValidate ||
      dateofbirthValidate ||
      dateofjoiningValidate ||
      phoneValidate ||
      genderValidate ||
      roleValidate ||
      teamValidate
    )
      return;

    const selectedDesignation = designationList.find(
      (design) => design.id === designation
    );
    const designationName = selectedDesignation.name;

    const selectedTeam = teamList.find((t) => t.id === team);
    const teamName = selectedTeam.name;

    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage

    const request = {
      first_Name: firstName,
      last_Name: lastName,
      email: email,
      dob: moment(dateofBirth).format("YYYY-MM-DD"),
      doj: moment(dateofJoining).format("YYYY-MM-DD"),
      phone: phone,
      usersName: firstName + lastName,
      password: password,
      gender: gender === 1 ? "Male" : "Female",
      organizationId: parseInt(orgId),
      roleName: "",
      roleId: role,
      designationName: designationName,
      designationId: designation,
      teamId: team,
      teamName: teamName,
      employeeID: employeeId,
      active: true,
      ...(edit && { id: userId }),
    };
    console.log("user payload", request);
    if (edit) {
      setTableLoading(true);
      try {
        const response = await updateUser(request);
        CommonToaster("User updated", "success");
        getUsersData();
        formReset();
      } catch (error) {
        CommonToaster(error?.response?.data, "error");
      } finally {
        setTimeout(() => {
          setTableLoading(false);
        }, 350);
      }
    } else {
      try {
        setTableLoading(true);
        const response = await createUser(request);
        CommonToaster("User created", "success");
        getUsersData();
        formReset();
      } catch (error) {
        CommonToaster(error?.response?.data, "error");
      } finally {
        setTimeout(() => {
          setTableLoading(false);
        }, 350);
      }
    }
  };

  const handleDeactivate = async (record) => {
    console.log("deactiveee", record);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    setTableLoading(true);
    const request = {
      id: record.id,
      first_Name: record.first_Name,
      last_Name: record.last_Name,
      email: record.email,
      dob: moment(record.dob).format("YYYY-MM-DD"),
      doj: moment(record.doj).format("YYYY-MM-DD"),
      phone: record.phone,
      usersName: record.first_Name + record.last_Name,
      password: record.password,
      gender: record.gender,
      organizationId: parseInt(orgId),
      roleId: record.roleId,
      designationId: record.designationId,
      teamId: record.teamId,
      employeeID: record.employeeID,
      active: record.active === true ? false : true,
    };
    try {
      await updateUser(request);
      CommonToaster("User updated", "success");
      getUsersData();
      formReset();
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
    } finally {
      setTimeout(() => {
        setTableLoading(false);
      }, 350);
    }
  };

  return (
    <div>
      {loading === true ? (
        <Loader />
      ) : (
        <div>
          <p className="users_totoalusersheading">Total Users ({usersCount})</p>
          <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <CommonSearchField
                placeholder="Search user..."
                // onSearch={handleSearch}
                onChange={handleSearch}
                value={search}
              />
              {/* <a href="http://hublog.org:8085/hublogsetup.exe" download>
                <MdOutlineFileDownload size={24} />
              </a> */}
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              className="users_adduserbuttonContainer"
            >
              <CommonAddButton
                name="Add User"
                onClick={() => {
                  setOpen(true);
                  setEdit(false);
                }}
              />
            </Col>
          </Row>

          <CommonTable
            columns={columns}
            dataSource={usersList}
            scroll={{ x: 1820 }}
            dataPerPage={10}
            loading={tableLoading}
            checkBox="false"
            size="middle"
          />
        </div>
      )}
      {/* user creation drawer */}
      <Drawer
        title={edit ? "Update User" : "Add User"}
        open={open}
        width="45%"
        onOk={handleSubmit}
        onClose={onClose}
      >
        <Row gutter={16}>
          <Col span={12}>
            <CommonInputField
              label="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
                if (validationTrigger) {
                  setFirstNameError(nameValidator(e.target.value));
                }
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
                if (validationTrigger) {
                  setLastNameError(lastNameValidator(e.target.value));
                }
              }}
              value={lastName}
              error={lastNameError}
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "22px" }}>
          <Col span={12}>
            <CommonInputField
              label="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                if (validationTrigger) {
                  setEmailError(emailValidator(e.target.value));
                }
              }}
              value={email}
              error={emailError}
              mandatory
            />
          </Col>
          <Col span={12}>
            <label style={{ fontWeight: "500", marginBottom: "6px" }}>
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <Input.Password
              className={
                passwordError
                  ? "users_passwordinputfielderror"
                  : "users_passwordinputfield"
              }
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (validationTrigger) {
                  if (e.target.value === "") {
                    setPasswordError(" Password is required");
                  } else if (e.target.value.length < 3) {
                    setPasswordError(" Password is not valid");
                  } else {
                    setPasswordError("");
                  }
                }
              }}
              status={passwordError ? "error" : ""}
            />
            <div
              className={
                passwordError
                  ? "commoninput_errormessage_activediv"
                  : "commoninput_errormessagediv"
              }
            >
              <p style={{ color: "#ff4d4f", marginTop: "2px" }}>
                {passwordError}
              </p>
            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "22px" }}>
          <Col span={12}>
            <CommonCalendar
              label="Date of Birth"
              onChange={handleDateOfBirth}
              value={dateofBirth}
              error={dateofBirthError}
              mandatory
            />
          </Col>
          <Col span={12}>
            <CommonCalendar
              label="Date of Joining"
              onChange={handleDateOfJoining}
              value={dateofJoining}
              error={dateofJoiningError}
              mandatory
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "22px" }}>
          <Col span={12}>
            <CommonInputField
              label="Phone"
              onChange={(e) => {
                setPhone(e.target.value);
                if (validationTrigger) {
                  setPhoneError(mobileValidator(e.target.value));
                }
              }}
              value={phone}
              error={phoneError}
              maxLength={10}
              mandatory
            />
          </Col>
          <Col span={12}>
            <CommonSelectField
              label="Gender"
              onChange={(value) => {
                setGender(value);
                if (validationTrigger) {
                  setGenderError(selectValidator(value));
                }
              }}
              options={genderOptions}
              value={gender}
              error={genderError}
              mandatory
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "22px" }}>
          <Col span={12}>
            <CommonSelectField
              label="Role"
              onChange={(value) => {
                setRole(value);
                if (validationTrigger) {
                  setRoleError(selectValidator(value));
                }
              }}
              options={roleOptions}
              value={role}
              error={roleError}
              mandatory
            />
          </Col>
          <Col span={12}>
            <CommonSelectField
              label="Designation"
              onChange={(value) => setDesignation(value)}
              options={activeDesignationList}
              value={designation}
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "22px" }}>
          <Col span={12}>
            <CommonSelectField
              label="Team"
              onChange={(value) => {
                setTeam(value);
                if (validationTrigger) {
                  setTeamError(selectValidator(value));
                }
              }}
              options={activeTeamList}
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="org_createbutton"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default Users;
