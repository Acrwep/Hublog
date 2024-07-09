import React, { useState, useEffect } from "react";
import { Row, Col, Tabs, Modal } from "antd";
import CommonSearchField from "../../../Components/Common/CommonSearchbar";
import CommonInputField from "../../../Components/Common/CommonInputField";
import { nameValidator } from "../../../Components/Common/Validation";
import TeamInfo from "./TeamInfo";
import TeamMember from "./TeamMember";
import { addteamMembers } from "../../../Components/Redux/slice";
import { useDispatch } from "react-redux";
import "../styles.css";
import CommonAddButton from "../../Common/CommonAddButton";

const Team = () => {
  const dispatch = useDispatch();
  const [memberList, setMemberList] = useState([
    { id: 1, name: "Karthi" },
    { id: 2, name: "Vicky" },
  ]);
  const tabItems = [
    {
      key: "1",
      label: "Team Info",
      children: <TeamInfo />,
    },
    {
      key: "2",
      label: "Members",
      children: <TeamMember />,
    },
  ];

  const teamList = [
    { id: 1, name: "Operation" },
    { id: 2, name: "Branch Operation" },
    { id: 3, name: "Quality" },
    { id: 4, name: "SEO" },
    { id: 5, name: "Sales" },
    { id: 6, name: "Developers" },
  ];
  const [activeTeam, setActiveTeam] = useState(1);
  const [activeTeamName, setActiveTeamName] = useState("Operation");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    const teamMembers = [
      { id: 1, name: "Karthi", email: "karthi@gmail.com" },
      { id: 2, name: "Vicky", email: "vicky@gmail.com" },
    ];
    dispatch(addteamMembers(teamMembers));
  }, []);

  const handleSearch = (value) => {
    console.log("Search value:", value);
  };

  const handleTeam = (item) => {
    setActiveTeamName(item.name);
    setActiveTeam(item.id === activeTeam ? activeTeam : item.id);

    if (item.name === "Operation") {
      const teamMembers = [
        { id: 1, name: "Karthi", email: "karthi@gmail.com" },
        { id: 2, name: "Vicky", email: "vicky@gmail.com" },
      ];
      dispatch(addteamMembers(teamMembers));
    } else if (item.name === "Branch Operation") {
      const teamMembers = [
        { id: 3, name: "Naresh", email: "naresh@gmail.com" },
        { id: 4, name: "Deepika", email: "deepika@gmail.com" },
      ];
      dispatch(addteamMembers(teamMembers));
    } else if (item.name === "Quality") {
      const teamMembers = [
        { id: 5, name: "Vaishali", email: "vaishali@gmail.com" },
        { id: 6, name: "Nivetha", email: "nivetha@gmail.com" },
      ];
      dispatch(addteamMembers(teamMembers));
    } else if (item.name === "SEO") {
      const teamMembers = [{ id: 7, name: "Divya", email: "divya@gmail.com" }];
      dispatch(addteamMembers(teamMembers));
    } else if (item.name === "Sales") {
      const teamMembers = [];
      dispatch(addteamMembers(teamMembers));
    } else {
      const teamMembers = [
        { id: 8, name: "Balaji", email: "balaji@gmail.com" },
        { id: 9, name: "Rubi", email: "rubi@gmail.com" },
      ];
      dispatch(addteamMembers(teamMembers));
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    const nameValidate = nameValidator(name);
    const descriptionValidate = nameValidator(description);

    setNameError(nameValidate);
    setDescriptionError(descriptionValidate);

    if (nameValidate || descriptionValidate) return;

    setIsModalOpen(false);
  };

  return (
    // <div className='p-2'>
    //     <div className='flex justify-between'>
    //         <p className='text-[22px] text-gray-700'>Team</p>
    //         <button className='bg-blue-500 px-5 py-2 rounded-lg'>+ AddTeam</button>
    //     </div>
    //     <hr className='my-4' />
    //     <div className='grid grid-cols-3 gap-4'>
    //         <div className='cols-span-1 shadow-md rounded-md'>
    //             <div className='flex'>
    //                 <input type='search' className=' w-2/7 h-8 border border-gray-500 rounded-tl-lg rounded-bl-lg mt-5 ml-5' />
    //                 <div className='w-12 border border-gray-500 p-1 mt-5 h-8 rounded-tr-lg rounded-br-lg text-2xl'><IoSearchSharp /></div>
    //             </div>

    //             <div className='p-4'>
    //                 <ul className='text-gray-600'>
    //                     <li className='p-2'>OPERATION</li>
    //                     <li className='p-2'>EXTERNAL HR</li>
    //                     <li className='p-2'>Sales Executive</li>
    //                     <li className='p-2'>INTERNAL HR</li>
    //                     <li className='p-2'>QUALITY</li>
    //                     <li className='p-2'>SEO</li>
    //                     <li className='p-2'>BOE</li>
    //                 </ul>
    //             </div>
    //         </div>
    //         <div className=' col-span-2 shadow-md rounded-md'>

    //         </div>
    //     </div>
    // </div>

    <div>
      <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <p className="totalcreatedteam_text">Total Created Teams</p>
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

      <Row gutter={12}>
        <Col xs={24} sm={24} md={24} lg={10} className="teamslist_card">
          <div className="team_searchbarcontainer">
            <CommonSearchField
              placeholder="Search user..."
              onSearch={handleSearch}
              className="settings_teamsearchbar"
              style={{ marginBottom: "20px" }}
            />

            {teamList.map((item) => (
              <li
                className={
                  item.id === activeTeam
                    ? "team_list_activelitag"
                    : "team_list_litag"
                }
                onClick={() => handleTeam(item)}
              >
                {item.name}
              </li>
            ))}
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={14}>
          <div className="team_tabmain_container">
            <div className="team_operationheader">
              <p style={{ fontWeight: "600", fontSize: "17px" }}>
                {activeTeamName}
              </p>
            </div>

            <div className="team_tabContainer">
              <Tabs
                defaultActiveKey="1"
                items={tabItems}
                tabBarStyle={{ borderColor: "red" }}
              />
            </div>
          </div>
        </Col>
      </Row>

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
            setNameError(nameValidator(e.target.value));
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
            setDescriptionError(nameValidator(e.target.value));
          }}
          value={description}
          error={descriptionError}
          mandatory
        />
      </Modal>
    </div>
  );
};

export default Team;
