import React, { useState, useEffect } from "react";
import { MdSettings } from "react-icons/md";
import UserandDesignation from "./usersandDesignation/UsersandDesignation";
import { FiUser, FiCoffee } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { SiWorkplace } from "react-icons/si";
import { IoRocketOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { LuGoal, LuUsers } from "react-icons/lu";
import { VscShield } from "react-icons/vsc";
import { IoMdSettings } from "react-icons/io";
import { Row, Col } from "antd";
import Team from "./team/Team";
import Workplace from "./Workplace";
import "./styles.css";

const Setting = () => {
  const settingsList = [
    {
      id: 1,
      name: "Users & Designations",
      icon: <FiUser size={21} />,
    },
    { id: 2, name: "Teams", icon: <LuUsers size={21} /> },
    { id: 3, name: "Roles", icon: <MdAccessTime size={21} /> },
    { id: 4, name: "Workplace", icon: <SiWorkplace size={21} /> },
    { id: 5, name: "Shifts", icon: <MdAccessTime size={21} /> },
    { id: 6, name: "Breaks", icon: <FiCoffee size={21} /> },
    { id: 7, name: "Productivity Rules", icon: <IoRocketOutline size={21} /> },
    { id: 8, name: "Alert Rules", icon: <HiOutlineBellAlert size={21} /> },
    { id: 9, name: "Email Reports", icon: <HiOutlineMail size={21} /> },
    { id: 10, name: "Goals", icon: <LuGoal size={21} /> },
    { id: 11, name: "Compliance", icon: <VscShield size={21} /> },
  ];
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (id) => {
    setActivePage(id === activePage ? activePage : id);
  };

  return (
    // <div className="p-8 max-sm:p-0">
    //   <div className="flex justify-start items-center">
    //     <MdSettings className="text-2xl text-orange-600" />
    //     <h2 className="text-xl font-bold ml-2">Setting</h2>
    //   </div>

    //   <div className="grid grid-cols-4 shadow-md gap-3 ">
    //     <div className=" col-span-1 shadow-lg p-4 h-auto">
    //       <div className="settings_sidebarContainer">
    //         {settingsList.map((item) => (
    //           <div
    //             className={
    //               item.id === activePage
    //                 ? "settings_activelistContainer"
    //                 : "settings_inactivelistContainer"
    //             }
    //             onClick={() => handlePageChange(item.id)}
    //           >
    //             {item.icon}
    //             <p
    //               className={
    //                 item.id === activePage ? "" : "settings_inactivelisttext"
    //               }
    //             >
    //               {item.name}
    //             </p>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //     <div className="col-span-3 shadow-lg">
    //       {activePage === 1 && (
    //         <div>
    //           <Userdesignation />
    //         </div>
    //       )}
    //       {activePage === 2 && (
    //         <div>
    //           <Team />
    //         </div>
    //       )}
    //       {activePage === 3 && (
    //         <div>
    //           <Workplace />
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <IoMdSettings size={20} />
        </div>
        <h2 className="text-xl font-bold ml-4" style={{ fontSize: "22px" }}>
          Settings{" "}
          {activePage === 1
            ? "> Users & Designation"
            : activePage === 2
            ? "> Teams"
            : activePage === 2
            ? "> Teams"
            : activePage === 3
            ? "> Roles"
            : activePage === 4
            ? "> Workplace"
            : activePage === 5
            ? "> Shifts"
            : activePage === 6
            ? "> Breaks"
            : activePage === 7
            ? "> Productivity Rules"
            : activePage === 8
            ? "> Alert Rules"
            : activePage === 9
            ? "> Email Reports"
            : activePage === 10
            ? "> Goals"
            : activePage === 11
            ? "> Compliance"
            : ""}
        </h2>
      </div>
      <Row className="settings_rowcontainer">
        <Col span={6} className="settinglist_columnOneContainer">
          <div className="settings_sidebarContainer">
            {settingsList.map((item) => (
              <div
                className={
                  item.id === activePage
                    ? "settings_activelistContainer"
                    : "settings_inactivelistContainer"
                }
                onClick={() => handlePageChange(item.id)}
              >
                {item.icon}
                <p
                  className={
                    item.id === activePage ? "" : "settings_inactivelisttext"
                  }
                >
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </Col>

        <Col span={18} className="settinglist_columnContainer">
          {activePage === 1 && (
            <div>
              <UserandDesignation />
            </div>
          )}
          {activePage === 2 && (
            <div>
              <Team />
            </div>
          )}
          {activePage === 3 && (
            <div>
              <Workplace />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Setting;
