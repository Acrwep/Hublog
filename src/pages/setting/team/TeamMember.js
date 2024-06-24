import React, { useEffect, useState } from "react";
import CommonSearchField from "../../../components/Common/CommonSearchbar";
import { Col, Row, Avatar, Space, Dropdown } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { searchteamMembers } from "../../../components/Redux/slice";
import { useDispatch, useSelector } from "react-redux";
import "../styles.css";

export default function TeamMember() {
  const dispatch = useDispatch();
  const memberList = useSelector((state) => state.teamMembers);
  const items = [
    {
      key: "1",
      label: "Make Manager",
    },
    {
      key: "2",
      label: "Change Team",
    },
  ];

  useEffect(() => {
    console.log("memberlist", memberList);
  }, []);
  const handleSearch = (value) => {
    console.log("Search value:", value);
    dispatch(searchteamMembers(value.toLowerCase()));
  };
  return (
    <div>
      <CommonSearchField placeholder="Search user..." onSearch={handleSearch} />

      {memberList.length >= 1 &&
        memberList.map((item) => {
          const getInitials = (fullName) => {
            const nameArray = fullName.split(" ");
            if (nameArray.length >= 2) {
              const firstLetter = nameArray[0].charAt(0);
              const secondLetter = nameArray[1].charAt(0);
              return `${firstLetter}${secondLetter}`;
            } else {
              return fullName.charAt(0); // Use the first letter if no space is found
            }
          };

          const getColorForName = (name) => {
            // You can implement your own logic here to generate colors based on the name.
            // For simplicity, we'll use a random color for demonstration purposes.
            const colors = [
              "#DBA6D1",
              "#A6DBC1",
              "#A6AADB",
              "#D6DBA6",
              "#8ED1FC",
              "#EEB39C",
            ];
            const nameHash = name
              .split("")
              .reduce((acc, char) => acc + char.charCodeAt(0), 0);
            return colors[nameHash % colors.length];
          };
          const nameColors = getColorForName(item.name);

          // Function to calculate a contrasting text color
          const getVeryDarkTextColor = (backgroundColor) => {
            // You can adjust the subtraction value to make the text color darker or lighter.
            const subtractionValue = 120; // Adjust as needed
            const HEX_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
            const match = backgroundColor.match(HEX_REGEX);
            if (match) {
              const r = Math.max(0, parseInt(match[1], 16) - subtractionValue);
              const g = Math.max(0, parseInt(match[2], 16) - subtractionValue);
              const b = Math.max(0, parseInt(match[3], 16) - subtractionValue);
              return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
            }
            return backgroundColor;
          };

          const veryDarkTextColor = getVeryDarkTextColor(nameColors);
          return (
            <div style={{ marginTop: "20px" }}>
              <Row className="team_memberrowContainer">
                <Col span={18}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      size={32}
                      style={{
                        backgroundColor: nameColors,
                        marginRight: "16px",
                        color: veryDarkTextColor,
                        fontWeight: "600",
                      }}
                    >
                      {getInitials(item.name)}
                    </Avatar>
                    <div>
                      <p style={{ fontWeight: "500" }}>{item.name}</p>
                      <p style={{ marginBottom: "0px" }}>{item.email}</p>
                    </div>
                  </div>
                </Col>
                <Col
                  span={6}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Space direction="vertical">
                    <Space wrap>
                      <Dropdown
                        menu={{
                          items,
                        }}
                        placement="bottomLeft"
                        arrow
                      >
                        <button style={{ marginTop: "4px" }}>
                          <BsThreeDotsVertical size={19} />
                        </button>
                      </Dropdown>
                    </Space>
                  </Space>
                </Col>
              </Row>
            </div>
          );
        })}

      {memberList.length <= 0 && (
        <p className="teams_nodatafound">No data found</p>
      )}
    </div>
  );
}
