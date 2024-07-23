import React, { useState, useEffect } from "react";
import { Row, Col, Tabs, Modal, Button } from "antd";
import CommonSearchField from "../../Common/CommonSearchbar";
import CommonInputField from "../../Common/CommonInputField";
import { descriptionValidator, selectValidator } from "../../Common/Validation";
import TeamInfo from "./TeamInfo";
import TeamMember from "./TeamMember";
import { addteamMembers, storeTeams } from "../../Redux/slice";
import { useDispatch, useSelector } from "react-redux";
import "../styles.css";
import CommonAddButton from "../../Common/CommonAddButton";
import CommonSelectField from "../../Common/CommonSelectField";
import CommonAvatar from "../../Common/CommonAvatar";
import { getTeams, createTeams, updateTeams } from "../../APIservice.js/action";
import { CommonToaster } from "../../Common/CommonToaster";
import Loader from "../../Common/Loader";
import { AiOutlineEdit } from "react-icons/ai";

const Team = ({ loading }) => {
  const dispatch = useDispatch();
  const teamList = useSelector((state) => state.teams);
  const memberList = useSelector((state) => state.teamMembers);
  const [teamId, setTeamId] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeTeamModal, setChangeTeamModal] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [changeTeam, setChangeTeam] = useState("");
  const [changeTeamError, setChangeTeamError] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setTeamId(teamList[0].id);
  }, []);

  const getTeamsData = async () => {
    try {
      const response = await getTeams(1);
      console.log("teams response", response.data);
      const allTeams = response.data;
      dispatch(storeTeams(allTeams));
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    }
  };

  const handleTeam = (item) => {
    setTeamId(item);
    const filterItem = teamList.find((f) => f.id === item);
    console.log("filterItem", filterItem);

    if (filterItem.name === "Operation") {
      const teamMembers = [
        { id: 1, name: "Karthi", email: "karthi@gmail.com" },
        { id: 2, name: "Vicky", email: "vicky@gmail.com" },
      ];
      dispatch(addteamMembers(teamMembers));
    } else if (filterItem.name === "Branch Operation") {
      const teamMembers = [
        { id: 3, name: "Naresh", email: "naresh@gmail.com" },
        { id: 4, name: "Deepika", email: "deepika@gmail.com" },
      ];
      dispatch(addteamMembers(teamMembers));
    } else if (filterItem.name === "Quality") {
      const teamMembers = [
        { id: 5, name: "Vaishali", email: "vaishali@gmail.com" },
        { id: 6, name: "Nivetha", email: "nivetha@gmail.com" },
      ];
      dispatch(addteamMembers(teamMembers));
    } else if (filterItem.name === "SEO") {
      const teamMembers = [{ id: 7, name: "Divya", email: "divya@gmail.com" }];
      dispatch(addteamMembers(teamMembers));
    } else if (filterItem.name === "Sales") {
      const teamMembers = [];
      dispatch(addteamMembers(teamMembers));
    } else if (filterItem.name === "HR") {
      const teamMembers = [
        { id: 8, name: "Pavithra", email: "pavi@gmail.com" },
        { id: 8, name: "Praveen", email: "praveen@gmail.com" },
      ];
      dispatch(addteamMembers(teamMembers));
    } else {
      const teamMembers = [
        { id: 8, name: "Balaji", email: "balaji@gmail.com" },
        { id: 9, name: "Rubi", email: "rubi@gmail.com" },
      ];
      dispatch(addteamMembers(teamMembers));
    }
  };

  const formReset = () => {
    setName("");
    setNameError("");
    setDescription("");
    setDescriptionError("");
    setChangeTeam("");
    setChangeTeamError("");
    setIsModalOpen(false);
    setChangeTeamModal(false);
    setEdit(false);
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

    const request = {
      Name: name,
      Description: description,
      Active: true,
      OrganizationId: 1,
      ...(edit && { id: teamId }),
      Parentid: 1,
    };
    console.log("payload", request);
    if (edit) {
      try {
        const response = await updateTeams(teamId, request);
        console.log("team update response", response);
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
        console.log("team create response", response);
        CommonToaster("Team created successfully", "success");
        getTeamsData();
        formReset();
      } catch (error) {
        console.log("team error", error);
        CommonToaster(error.response.data.message, "error");
      }
    }
  };

  const handleChangeTeamSubmit = () => {
    const changeteamValidate = selectValidator(changeTeam);
    setChangeTeamError(changeteamValidate);

    if (changeteamValidate) return;

    setChangeTeamModal(false);
  };

  const handleEdit = () => {
    const selectedTeam = teamList.find((f) => f.id === teamId);
    console.log("selectedteam", selectedTeam);
    setName(selectedTeam.name);
    setDescription(selectedTeam.description);
    setIsModalOpen(true);
    setEdit(true);
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
                allowClear="false"
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

          <Row gutter={16} style={{ marginTop: "20px" }}>
            {memberList.length >= 1 &&
              memberList.map((item) => (
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
                          itemName={item.name}
                          avatarSize={37}
                          avatarfontSize="17px"
                        />
                      </div>
                      <div>
                        <p className="teammember_name">{item.name}</p>
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
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button
                          className="teammembercard_buttons"
                          onClick={() => setChangeTeamModal(true)}
                        >
                          Change team
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))}
          </Row>

          {memberList.length <= 0 && (
            <p className="teammember_nodata">No data found</p>
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
            onOk={handleOk}
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
                setChangeTeam(selectedItem);
                setChangeTeamError(selectValidator(selectedItem));
              }}
              value={changeTeam}
              error={changeTeamError}
              mandatory
            />
          </Modal>
        </div>
      )}
    </>
  );
};

export default Team;
