import React, { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
// import { IoSearchSharp } from "react-icons/io5";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { Input, Space, Dropdown, Button } from "antd";
import "./styles.css";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const items = [
    {
      key: "1",
      label: (
        <a rel="noopener noreferrer" href="#">
          Explorer
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a rel="noopener noreferrer" href="#">
          User
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a rel="noopener noreferrer" href="#">
          Apps&URLs
        </a>
      ),
    },
  ];
  // const onSearch = (value, _e, info) => console.log(info?.source, value);
  const { Search } = Input;

  return (
    <nav className="bg-white w-full h-20 flex justify-between items-center px-4 py-2">
      <div className="searchbarandexplore_container">
        <div className="searchbar_container">
          <Space direction="vertical">
            <Input
              placeholder="Discover it all: feature, settings, report"
              className="navbar_discoversearchnbar"
              prefix={<SearchOutlined className="site-form-item-icon" />}
            />
          </Space>
        </div>
        <div className="explore_container">
          {/* <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>Explore</Space>
            </a>
          </Dropdown>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-4 w-4 fill-current text-gray-500 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div> */}

          <Space direction="vertical">
            <Space wrap>
              <Dropdown menu={{ items }} placement="bottomLeft">
                <Button className="explore_button">
                  <div style={{ display: "flex" }}>
                    <p>Explorer</p>
                    <DownOutlined className="navbar_explorericon" />
                  </div>
                </Button>
              </Dropdown>
            </Space>
          </Space>
        </div>
      </div>

      <div className="relative w-20">
        <div className="flex justify-center items-center w-17">
          <div className="rounded-full h-10 w-10 bg-gray-200 flex items-center justify-center cursor-pointer">
            {/* Insert your profile icon here */}P
          </div>
          <div className="m-3 cursor-pointer" onClick={toggleProfileMenu}>
            <TiArrowSortedDown />
          </div>
        </div>
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
            <div className="py-1">
              <a
                href="/"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Profile
              </a>
              <a
                href="/"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Settings
              </a>
              <a
                href="/ "
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Logout
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
