import React, { useState, useEffect } from "react";
import { Row, Col, Tabs, Modal, Button } from "antd";
import CommonInputField from "../../Common/CommonInputField";
import { descriptionValidator, selectValidator } from "../../Common/Validation";
import { storeTeams } from "../../Redux/slice";
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
} from "../../APIservice.js/action";
import { CommonToaster } from "../../Common/CommonToaster";
import Loader from "../../Common/Loader";
import { AiOutlineEdit } from "react-icons/ai";
import { storeUsers } from "../../Redux/slice";
import moment from "moment";

const Team = ({ loading }) => {
  const dispatch = useDispatch();
  const teamList = useSelector((state) => state.teams);
  const allUsers = useSelector((state) => state.users);
  const [teamId, setTeamId] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeTeamModal, setChangeTeamModal] = useState(false);
  const [addTeamModal, setAddTeamModal] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [changeTeamId, setChangeTeamId] = useState("");
  const [changeTeamError, setChangeTeamError] = useState("");
  const [edit, setEdit] = useState(false);
  const [userDetails, setuserDetails] = useState("");
  const [teamMemberLoading, setTeamMemberLoading] = useState(false);
  const [organizationId, setOrganizationId] = useState(null);

  useEffect(() => {
    setTeamId(teamList[0].id);
    getUsersDataByTeamId();
    getUsersData();
  }, []);

  const getUsersDataByTeamId = async (teamId) => {
    setTeamMemberLoading(true);
    try {
      const response = await getUsersByTeamId(
        teamId != undefined ? teamId : teamList[0].id
      );
      console.log("user by teamId response", response?.data);
      const teamMembersList = response?.data?.team?.users;
      setTeamMembers(teamMembersList);

      //filter other team members
      if (teamId != undefined) {
        const others = allUsers.filter((f) => {
          return f.teamId !== teamId;
        });
        setOtherUsers(others);
      }
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setTeamMembers([]);
    } finally {
      setTimeout(() => {
        setTeamMemberLoading(false);
      }, 1000);
    }
  };

  const getTeamsData = async () => {
    try {
      const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
      const response = await getTeams(orgId);
      const allTeams = response.data;
      dispatch(storeTeams(allTeams));
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    }
  };

  const handleTeam = (item) => {
    setTeamId(item);
    getUsersDataByTeamId(item);
  };

  const formReset = () => {
    setName("");
    setNameError("");
    setDescription("");
    setDescriptionError("");
    setChangeTeamId("");
    setChangeTeamError("");
    setIsModalOpen(false);
    setChangeTeamModal(false);
    setEdit(false);
    setAddTeamModal(false);
  };

  const handleCancel = () => {
    formReset();
  };

  const handleOk = async () => {
    const nameValidate = descriptionValidator(name);
    const descriptionValidate = descriptionValidator(description);

    setNameError(nameValidate);
    setDescriptionError(descriptionValidate);

    if (nameValidate || descriptionValidate) return;
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage

    const request = {
      Name: name,
      Description: description,
      Active: true,
      OrganizationId: orgId,
      ...(edit && { id: teamId }),
      Parentid: 1,
    };
    console.log("payload", request);
    if (edit) {
      try {
        const response = await updateTeams(teamId, request);
        CommonToaster("Team updated successfully", "success");
        getTeamsData();
        formReset();
      } catch (error) {
        console.log("update team error", error);
        CommonToaster(error.response.data.message, "error");
      }
    } else {
      try {
        const response = await createTeams(request);
        CommonToaster("Team created successfully", "success");
        getTeamsData();
        formReset();
      } catch (error) {
        console.log("team error", error);
        CommonToaster(error.response.data.message, "error");
      }
    }
  };

  const handleChangeTeamSubmit = async () => {
    console.log("userdetailssssss", userDetails);
    if (addTeamModal === false) {
      const changeteamValidate = selectValidator(changeTeamId);
      setChangeTeamError(changeteamValidate);

      if (changeteamValidate) return;
    }
    setChangeTeamModal(false);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage

    const request = {
      id: addTeamModal ? userDetails.id : userDetails.userId,
      First_Name: addTeamModal ? userDetails.first_Name : userDetails.firstName,
      Last_Name: addTeamModal ? userDetails.last_Name : userDetails.lastName,
      Email: userDetails.email,
      DOB: moment(userDetails.dob).format("MM/DD/YYYY"),
      DOJ: moment(userDetails.doj).format("MM/DD/YYYY"),
      Phone: userDetails.phone,
      UsersName: userDetails.usersName,
      Password: "Hublog",
      Gender: userDetails.gender,
      OrganizationId: orgId,
      RoleName: "Employee",
      RoleId: userDetails.roleId,
      DesignationName: "",
      DesignationId: userDetails.designationId,
      TeamId: addTeamModal ? teamId : changeTeamId,
      TeamName: "",
      EmployeeID: userDetails.employeeID,
      Active: userDetails.active,
    };

    setTeamMemberLoading(true);
    try {
      const response = await updateUser(request);
      console.log("user update response", response);
      if (addTeamModal) {
        CommonToaster("user added successfully", "success");
      } else {
        CommonToaster("Team changed successfully", "success");
      }
      getUsersDataByTeamId(teamId);
      formReset();
    } catch (error) {
      console.log("update user error", error);
      CommonToaster(error?.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        getUsersData();
      }, 1000);
    }
  };

  const getUsersData = async () => {
    try {
      const response = await getUsers();
      console.log("users response", response?.data);
      const allUsers = response?.data;
      dispatch(storeUsers(allUsers));
      //take other teammembers
      console.log("currrrrr", teamId);
      const others = allUsers.filter((f) => {
        const currentTeamId = teamId !== "" ? teamId : teamList[0].id;
        // Return true if the user's teamId is different from currentTeamId
        return f.teamId !== currentTeamId;
      });
      console.log("otherssssssssss from users", others);
      setOtherUsers(others);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        setTeamMemberLoading(false);
      }, 1000);
    }
  };

  const handleEdit = () => {
    const selectedTeam = teamList.find((f) => f.id === teamId);
    console.log("selectedteam", selectedTeam);
    setName(selectedTeam.name);
    setDescription(selectedTeam.description);
    setIsModalOpen(true);
    setEdit(true);
  };

  const handleAddteam = (item) => {
    setuserDetails(item);
    setAddTeamModal(true);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              style={{ display: "flex", alignItems: "center" }}
            >
              <p className="totalcreatedteam_text">
                Total Created Teams - {teamList.length}
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
                showSearch={true}
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
              <Button type="primary" onClick={handleEdit}>
                <AiOutlineEdit size={17} style={{ marginRight: "6px" }} />
                {"  "} Edit
              </Button>
            </Col>
          </Row>

          {teamMemberLoading ? (
            <Loader />
          ) : (
            <>
              <p className="teammembers_count">
                <span style={{ fontSize: "15px" }}>({teamMembers.length})</span>{" "}
                Members
              </p>
              <Row gutter={16} style={{ marginTop: "12px" }}>
                {teamMembers.length >= 1 &&
                  teamMembers.map((item) => (
                    <Col
                      xs={24}
                      sm={24}
                      md={8}
                      lg={8}
                      style={{ marginBottom: "20px" }}
                    >
                      <div className="teammember_card">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "42px",
                          }}
                        >
                          <div>
                            <CommonAvatar
                              itemName={item.firstName}
                              avatarSize={37}
                              avatarfontSize="17px"
                            />
                          </div>
                          <div>
                            <p className="teammember_name">
                              {item.firstName + " " + item.lastName}
                            </p>
                            <p className="teammember_email">{item.email}</p>
                          </div>
                        </div>

                        <Row gutter={16}>
                          <Col span={12}>
                            <Button className="teammembercard_buttons">
                              Make Manager
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
                      </div>
                    </Col>
                  ))}
              </Row>
              {teamMembers.length <= 0 && (
                <p className="teammember_nodata">No data found</p>
              )}

              <p className="teammembers_out">Others</p>
              <Row gutter={16} style={{ marginTop: "12px" }}>
                {otherUsers &&
                  otherUsers.length >= 1 &&
                  otherUsers.map((item) => (
                    <Col
                      xs={24}
                      sm={24}
                      md={8}
                      lg={8}
                      style={{ marginBottom: "20px" }}
                    >
                      <div className="teammember_card">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "42px",
                          }}
                        >
                          <div>
                            <CommonAvatar
                              itemName={item.first_Name}
                              avatarSize={37}
                              avatarfontSize="17px"
                            />
                          </div>
                          <div>
                            <p className="teammember_name">
                              {item.first_Name + " " + item.last_Name}
                            </p>
                            <p className="teammember_email">{item.email}</p>
                          </div>
                        </div>

                        <Row gutter={16}>
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
                      </div>
                    </Col>
                  ))}
              </Row>
            </>
          )}
          {/* addteam modal */}
          <Modal
            title="Add Team"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <button className="designation_submitbutton" onClick={handleOk}>
                Submit
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
              style={{ marginTop: "20px", marginBottom: "20px" }}
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
        </div>
      )}
    </>
  );
};

export default Team;
