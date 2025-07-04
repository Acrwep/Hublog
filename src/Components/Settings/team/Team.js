import React, { useState, useEffect } from "react";
import { Row, Col, Modal, Button, Space, Dropdown, Skeleton, Spin } from "antd";
import CommonInputField from "../../Common/CommonInputField";
import { descriptionValidator, selectValidator } from "../../Common/Validation";
import { storeActiveTeam, storeTeams } from "../../Redux/slice";
import { useDispatch, useSelector } from "react-redux";
import "../styles.css";
import CommonAddButton from "../../Common/CommonAddButton";
import CommonSelectField from "../../Common/CommonSelectField";
import CommonAvatar from "../../Common/CommonAvatar";
import {
  getTeams,
  createTeams,
  updateTeams,
  getUsersByTeamId,
  updateUser,
  getUsers,
  deleteTeam,
  getShifts,
} from "../../APIservice.js/action";
import { CommonToaster } from "../../Common/CommonToaster";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { storeUsers, storeUsersForTeamsTab } from "../../Redux/slice";
import CommonWarningModal from "../../Common/CommonWarningModal";
import { LoadingOutlined } from "@ant-design/icons";

const Team = ({ loading }) => {
  const dispatch = useDispatch();
  const teamList = useSelector((state) => state.teams);
  const allUsersforteamsTab = useSelector((state) => state.usersforteamstabs);
  const [shiftsList, setShiftList] = useState([]);
  //usestates
  const [teamId, setTeamId] = useState("");
  const [otherUsers, setOtherUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeTeamModal, setChangeTeamModal] = useState(false);
  const [addTeamModal, setAddTeamModal] = useState(false);
  const [managerModal, setManagerModal] = useState(false);
  const [removeManager, setRemoveManager] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamMembersList, setTeamMembersList] = useState([]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [shiftId, setShiftId] = useState(null);
  const [status, setStatus] = useState(true);
  const statusList = [
    { id: true, name: "Active" },
    { id: false, name: "In Active" },
  ];
  const [changeTeamId, setChangeTeamId] = useState("");
  const [changeTeamError, setChangeTeamError] = useState("");
  const [edit, setEdit] = useState(false);
  const [userDetails, setuserDetails] = useState("");
  const [teamMemberLoading, setTeamMemberLoading] = useState(true);
  const [triggerShiftApi, setTriggerShiftApi] = useState(true);
  const [submitLoader, setSubmitLoader] = useState(false);

  useEffect(() => {
    if (loading === false) {
      setTeamId(teamList.length >= 1 ? teamList[0].id : null);
      setTeamName(teamList.length >= 1 ? teamList[0].name : "");
      getUsersDataByTeamId(teamList.length >= 1 ? teamList[0].id : null);
      getUsersData(teamList.length >= 1 ? teamList[0].id : null, "notdispatch");
    }
  }, [loading]);

  //get team members by team id api function
  const getUsersDataByTeamId = async (teamid) => {
    try {
      const response = await getUsersByTeamId(teamid);
      const teamMembersList = response?.data?.team?.users;
      setTeamMembersList(teamMembersList);
    } catch (error) {
      console.log("getteamserror", error);
      const teamMembersList = [];
      setTeamMembersList(teamMembersList);
      if (
        error?.response?.data?.title ===
        "One or more validation errors occurred."
      ) {
        return;
      } else {
        CommonToaster(error?.message, "error");
      }
    } finally {
      setTimeout(() => {
        if (triggerShiftApi === true) {
          getShiftData();
        } else {
          setTeamMemberLoading(false);
          //call get user api function for get other team members list
          getUsersData(teamid, "nodispatch");
        }
      }, 350);
    }
  };

  //get shift
  const getShiftData = async () => {
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    try {
      const response = await getShifts(orgId);
      console.log("shift response", response);
      const allShiftDetails = response.data;
      const activeShiftDetails = allShiftDetails.filter(
        (f) => f.status === true
      );
      setShiftList(activeShiftDetails);
    } catch (error) {
      setShiftList([]);
      CommonToaster(error?.response?.data.message, "error");
    } finally {
      setTriggerShiftApi(false);
      setTeamMemberLoading(false);
    }
  };

  //get all teams api function
  const getTeamsData = async (comeFromDeleteButton) => {
    const check = comeFromDeleteButton;
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    try {
      const response = await getTeams(orgId);
      const allTeams = response.data;
      //store teamlist to redux
      dispatch(storeTeams(allTeams));
      //filter active teams
      const filterActiveteams = allTeams.filter((f) => f.active === true);
      dispatch(storeActiveTeam(filterActiveteams));

      const selectedTeam = allTeams.find((f) => f.id === teamId);
      setTeamName(selectedTeam?.name);

      if (check === "true") {
        setTeamId(allTeams[0].id);
        getUsersDataByTeamId(allTeams[0].id);
      }
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
    }
  };

  //team select onchange function
  const handleTeam = (item) => {
    setTeamMemberLoading(true);
    const selectedTeam = teamList.find((f) => f.id === item);
    setTeamName(selectedTeam.name);
    setTeamId(item);
    getUsersDataByTeamId(item);
  };

  //reset all useStates
  const formReset = () => {
    setName("");
    setNameError("");
    setDescription("");
    setDescriptionError("");
    setShiftId(null);
    setChangeTeamId("");
    setChangeTeamError("");
    setIsModalOpen(false);
    setChangeTeamModal(false);
    setManagerModal(false);
    setEdit(false);
    setAddTeamModal(false);
    setStatus(true);
  };

  const handleCancel = () => {
    formReset();
  };

  //create and update team api function
  const handleOk = async () => {
    const nameValidate = descriptionValidator(name);
    const descriptionValidate = descriptionValidator(description);

    setNameError(nameValidate);
    setDescriptionError(descriptionValidate);

    if (nameValidate || descriptionValidate) return;
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage

    const request = {
      name: name,
      description: description,
      active: status,
      organizationId: parseInt(orgId),
      shiftId: shiftId ? shiftId : null,
      parentid: 1,
    };
    console.log("payload", request);
    setSubmitLoader(true);
    if (edit) {
      try {
        const response = await updateTeams(teamId, request);
        CommonToaster("Team updated", "success");
        getTeamsData();
        formReset();
      } catch (error) {
        console.log("update team error", error);
        const Error = error?.response?.data;
        if (
          Error ===
          "User is already mapped to this team and cannot be updated to inactive"
        ) {
          CommonToaster("Unable to inactive. Mapped to user", "error", "error");
        } else {
          CommonToaster(Error, "error");
        }
      } finally {
        setTimeout(() => {
          setSubmitLoader(false);
        }, 300);
      }
    } else {
      try {
        const response = await createTeams(request);
        CommonToaster("Team created", "success");
        getTeamsData();
        formReset();
      } catch (error) {
        CommonToaster(error?.response?.data, "error");
      } finally {
        setTimeout(() => {
          setSubmitLoader(false);
        }, 300);
      }
    }
  };

  //handle team change function
  const handleChangeTeamSubmit = async () => {
    console.log(userDetails);
    if (addTeamModal === false) {
      const changeteamValidate = selectValidator(changeTeamId);
      setChangeTeamError(changeteamValidate);

      if (changeteamValidate) return;
    }
    setChangeTeamModal(false);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const request = {
      id: userDetails.id,
      first_Name: userDetails.first_Name,
      last_Name: userDetails.last_Name,
      email: userDetails.email,
      dob: userDetails.dob,
      doj: userDetails.doj,
      phone: userDetails.phone,
      usersName: userDetails.usersName,
      password: userDetails.password,
      gender: userDetails.gender,
      organizationId: parseInt(orgId),
      roleName: "",
      roleId: userDetails.roleId,
      designationName: userDetails.designationName,
      designationId: userDetails.designationId,
      teamId: addTeamModal ? teamId : changeTeamId,
      teamName: "",
      employeeID: userDetails.employeeID,
      active: userDetails.active,
      managerStatus: userDetails.managerStatus,
    };
    console.log("payloaddd", request);
    setTeamMemberLoading(true);
    try {
      const response = await updateUser(request);
      console.log("user update response", response);
      if (addTeamModal) {
        CommonToaster("User added", "success");
      } else {
        CommonToaster("Team changed", "success");
      }
      getUsersDataByTeamId(teamId);
      formReset();
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
    } finally {
      setTimeout(() => {
        getUsersData(teamId, "dispatch");
      }, 500);
    }
  };

  //get uer api function
  const getUsersData = async (teamid, dispatchStatus) => {
    const orgId = localStorage.getItem("organizationId");
    const others = allUsersforteamsTab.filter((f) => {
      // Return true if the user's teamId is different from currentTeamId
      return f.teamId !== teamid && f.active === true;
    });
    setOtherUsers(others);

    if (dispatchStatus === "dispatch") {
      try {
        const response = await getUsers(orgId);
        const allUsers = response?.data;
        //store user list to redux only when team create or update
        if (dispatchStatus === "dispatch") {
          dispatch(storeUsers(allUsers));
          dispatch(storeUsersForTeamsTab(allUsers));
        }

        //take other teammembers
        const others = allUsers.filter((f) => {
          // Return true if the user's teamId is different from currentTeamId
          return f.teamId !== teamid && f.active === true;
        });
        console.log("other team users", others);
        setOtherUsers(others);
      } catch (error) {
        CommonToaster(error?.response?.data, "error");
      } finally {
        setTimeout(() => {
          setTeamMemberLoading(false);
        }, 500);
      }
    }
  };

  //fetching clicked item data to the team form
  const handleEdit = () => {
    const selectedTeam = teamList.find((f) => f.id === teamId);
    setName(selectedTeam.name);
    setDescription(selectedTeam.description);
    setShiftId(selectedTeam.shiftId === 0 ? "" : selectedTeam.shiftId);
    setIsModalOpen(true);
    setEdit(true);
  };

  //team delete api function
  const handleDeleteTeam = async () => {
    try {
      const response = await deleteTeam(teamId);
      getTeamsData("true");
      CommonToaster("Team deleted", "success");
    } catch (error) {
      const Error = error?.response?.data;
      if (Error === "This team mapping some users") {
        CommonToaster("Unable to delete. Mapped to user", "error");
        return;
      }
    }
  };
  const items = [
    {
      key: "1",
      label: (
        <div style={{ display: "flex", width: "100%" }} onClick={handleEdit}>
          <AiOutlineEdit size={19} className="users_tableeditbutton" />
          <button>Edit</button>
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
                  {"Do you want to delete "}
                  <span style={{ fontWeight: "700", fontSize: "16px" }}>
                    {teamName}
                  </span>
                  {" team"}
                </p>
              ),
              onDelete: handleDeleteTeam,
            });
          }}
        >
          <RiDeleteBin7Line size={19} className="users_tableinactivebutton" />
          <button>Delete</button>
        </div>
      ),
    },
  ];

  //add team modal function
  const handleAddteam = (item) => {
    setuserDetails(item);
    setAddTeamModal(true);
  };

  //handle make manager
  const handleMakeManager = async () => {
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const request = {
      id: userDetails.id,
      first_Name: userDetails.first_Name,
      last_Name: userDetails.last_Name,
      email: userDetails.email,
      dob: userDetails.dob,
      doj: userDetails.doj,
      phone: userDetails.phone,
      usersName: userDetails.usersName,
      password: userDetails.password,
      gender: userDetails.gender,
      organizationId: parseInt(orgId),
      roleName: "",
      roleId: userDetails.roleId,
      designationName: userDetails.designationName,
      designationId: userDetails.designationId,
      teamId: userDetails.teamId,
      teamName: "",
      employeeID: userDetails.employeeID,
      active: userDetails.active,
      managerStatus: userDetails.managerStatus === false ? true : false,
    };
    console.log("payloaddd", request);
    setTeamMemberLoading(true);
    try {
      const response = await updateUser(request);
      console.log("user update response", response);
      if (userDetails.managerStatus === false) {
        CommonToaster("Manager added", "success");
      } else {
        CommonToaster("Manager removed", "success");
      }
      getUsersDataByTeamId(teamId);
      formReset();
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
    } finally {
      setTimeout(() => {
        getUsersData(teamId, "dispatch");
      }, 500);
    }
  };

  const handleDummy = () => {
    return;
  };
  return (
    // <>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    <div>
      <Row style={{ marginBottom: "12px" }}>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          style={{ display: "flex", alignItems: "center" }}
        >
          <p className="totalcreatedteam_text">
            Total Teams ({teamList.length})
          </p>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          className="users_adduserbuttonContainer"
        >
          <CommonAddButton
            name="Add Team"
            onClick={() => setIsModalOpen(true)}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CommonSelectField
            label="Select team"
            options={teamList}
            value={teamId}
            style={{ width: "170px" }}
            onChange={handleTeam}
          />
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* <Button type="primary" onClick={handleEdit}>
                <AiOutlineEdit size={17} style={{ marginRight: "6px" }} />
                {"  "} Edit
              </Button> */}
          <Space direction="vertical">
            <Space wrap>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomLeft"
                arrow
              >
                <button className="teams_actionbutton">
                  <BsThreeDotsVertical />
                </button>
              </Dropdown>
            </Space>
          </Space>
        </Col>
      </Row>

      {/* {teamMemberLoading ? (
        <Loader />
      ) : (
        <> */}
      <p className="teammembers_count">
        <span style={{ fontSize: "15px" }}>({teamMembersList.length})</span>{" "}
        Members
      </p>
      <Row
        gutter={16}
        className="teammembers_container"
        style={{ height: teamMembersList.length > 6 ? "52vh" : "auto" }}
      >
        {teamMembersList.length >= 1 &&
          teamMembersList.map((item, index) => (
            <React.Fragment key={index}>
              <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                style={{ marginBottom: "20px" }}
              >
                <div className="teammember_card">
                  {teamMemberLoading ? (
                    <Skeleton
                      avatar
                      active
                      paragraph={{
                        rows: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "42px",
                      }}
                    >
                      <div>
                        <CommonAvatar
                          itemName={item.full_Name}
                          avatarSize={37}
                          avatarfontSize="17px"
                        />
                      </div>
                      <div>
                        <p className="teammember_name">{item.full_Name}</p>
                        <p className="teammember_email">{item.email}</p>
                      </div>
                    </div>
                  )}

                  {teamMemberLoading ? (
                    <div className="teammember_skeletondiv">
                      <Skeleton
                        active
                        title={{ width: 140 }}
                        paragraph={{
                          rows: 0,
                        }}
                      />
                    </div>
                  ) : (
                    <Row gutter={16} className="teammember_changeteamrow">
                      <Col span={12}>
                        <Button
                          className={
                            item.managerStatus === true
                              ? "teammembercard_managerbuttons"
                              : "teammembercard_buttons"
                          }
                          onClick={() => {
                            if (item.managerStatus === true) {
                              setRemoveManager(true);
                            } else {
                              setRemoveManager(false);
                            }
                            setManagerModal(true);
                            setuserDetails(item);
                          }}
                        >
                          {item.managerStatus === false
                            ? "Make Manager"
                            : "Manager"}
                        </Button>
                      </Col>
                      <Col
                        span={12}
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          className="teammembercard_buttons"
                          onClick={() => {
                            setChangeTeamModal(true);
                            setuserDetails(item);
                          }}
                        >
                          Change team
                        </Button>
                      </Col>
                    </Row>
                  )}
                </div>
              </Col>
            </React.Fragment>
          ))}
      </Row>
      {teamMembersList.length <= 0 && (
        <p className="teammember_nodata">No data found</p>
      )}

      <p className="teammembers_out">Others</p>
      <Row
        gutter={16}
        className="teammembers_container"
        style={{ height: otherUsers.length > 6 ? "52vh" : "auto" }}
      >
        {otherUsers &&
          otherUsers.length >= 1 &&
          otherUsers.map((item, index) => (
            <React.Fragment key={index}>
              <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                style={{ marginBottom: "20px" }}
              >
                <div className="teammember_card">
                  {teamMemberLoading ? (
                    <Skeleton
                      avatar
                      active
                      paragraph={{
                        rows: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "42px",
                      }}
                    >
                      <div>
                        <CommonAvatar
                          itemName={item.full_Name}
                          avatarSize={37}
                          avatarfontSize="17px"
                        />
                      </div>
                      <div>
                        <p className="teammember_name">{item.full_Name}</p>
                        <p className="teammember_email">{item.email}</p>
                      </div>
                    </div>
                  )}

                  {teamMemberLoading ? (
                    <div className="teammember_skeletondiv">
                      <Skeleton
                        active
                        title={{ width: 140 }}
                        paragraph={{
                          rows: 0,
                        }}
                      />
                    </div>
                  ) : (
                    <Row gutter={16} className="teammember_changeteamrow">
                      <Col
                        span={24}
                        style={{
                          display: "flex",
                        }}
                      >
                        <Button
                          className="teammembercard_buttons"
                          onClick={() => handleAddteam(item)}
                        >
                          Add team
                        </Button>
                      </Col>
                    </Row>
                  )}
                </div>
              </Col>
            </React.Fragment>
          ))}
      </Row>

      {otherUsers.length <= 0 && (
        <p className="teammember_nodata">No data found</p>
      )}
      {/* </>
      )} */}
      {/* addteam modal */}
      <Modal
        title={edit ? "Update Team" : "Add Team"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button
            className={
              submitLoader
                ? "designation_loadingsubmitbutton"
                : "designation_submitbutton"
            }
            onClick={submitLoader === false ? handleOk : handleDummy}
          >
            {submitLoader ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    spin
                    style={{ marginRight: "9px", color: "#ffffff" }}
                  />
                }
                size="small"
              />
            ) : (
              ""
            )}{" "}
            {submitLoader ? "Loading..." : "Submit"}
          </button>,
        ]}
      >
        <CommonInputField
          label="Team Name"
          onChange={(e) => {
            setName(e.target.value);
            setNameError(descriptionValidator(e.target.value));
          }}
          value={name}
          error={nameError}
          style={{ marginTop: "22px" }}
          mandatory
        />
        <CommonInputField
          label="Description"
          onChange={(e) => {
            setDescription(e.target.value);
            setDescriptionError(descriptionValidator(e.target.value));
          }}
          value={description}
          error={descriptionError}
          mandatory
          style={{ marginTop: "22px" }}
        />
        <CommonSelectField
          label="Shift"
          options={shiftsList}
          onChange={(value) => {
            setShiftId(value);
          }}
          value={shiftId}
          allowClear
          style={{ marginTop: "22px", marginBottom: "22px" }}
          // allowClear
        />
        <CommonSelectField
          label="Status"
          options={statusList}
          onChange={(value) => {
            setStatus(value);
          }}
          value={status}
          mandatory
        />
      </Modal>

      {/* changeteam modal */}
      <Modal
        title="Change Team"
        open={changeTeamModal}
        onCancel={formReset}
        footer={[
          <button
            className="designation_submitbutton"
            onClick={handleChangeTeamSubmit}
          >
            Submit
          </button>,
        ]}
      >
        <CommonSelectField
          label="Select team"
          options={teamList}
          onChange={(selectedItem) => {
            setChangeTeamId(selectedItem);
            setChangeTeamError(selectValidator(selectedItem));
          }}
          value={changeTeamId}
          error={changeTeamError}
          mandatory
        />
      </Modal>

      {/* addteam modal */}
      <Modal
        open={addTeamModal}
        onCancel={formReset}
        style={{ top: "25%" }}
        footer={[
          <button
            className="designation_submitbutton"
            onClick={handleChangeTeamSubmit}
          >
            Yes
          </button>,
        ]}
      >
        <p className="addmodaltitle">
          {"Are you sure to add "}
          <span style={{ fontSize: "16px", fontWeight: 600 }}>
            {userDetails?.first_Name || userDetails?.firstName || ""}{" "}
            {userDetails?.last_Name || userDetails?.lastName || ""}
          </span>
          {" in this team"}
        </p>
      </Modal>

      {/* manager modal */}
      <Modal
        open={managerModal}
        onCancel={formReset}
        style={{ top: "25%" }}
        footer={[
          <button
            className="designation_submitbutton"
            onClick={handleMakeManager}
          >
            Yes
          </button>,
        ]}
      >
        <p className="addmodaltitle">
          {removeManager ? "Are you sure to remove " : "Are you sure to make "}
          <span style={{ fontSize: "16px", fontWeight: 600 }}>
            {userDetails?.first_Name || userDetails?.firstName || ""}{" "}
            {userDetails?.last_Name || userDetails?.lastName || ""}
          </span>
          {" as manager"}
        </p>
      </Modal>
    </div>
    //   )}
    // </>
  );
};

export default Team;
