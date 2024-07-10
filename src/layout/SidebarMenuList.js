import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { SideMenuConfig } from "./SideMenuItems";

const { SubMenu } = Menu;

const SidebarMenuList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    const pathName = location.pathname.split("/")[1];
    console.log("pathnameee", pathName);
    if (pathName === "") {
      setSelectedKey("dashboard");
      return;
    }
    setSelectedKey(pathName);
  }, [location.pathname]);

  const handleMenuClick = (e) => {
    navigate(`/${e.key}`);
  };

  const renderMenuItems = (menuConfig) => {
    return Object.entries(menuConfig).map(([key, item]) => {
      if (item.submenu) {
        return (
          <SubMenu
            key={key}
            icon={item.icon}
            title={item.title}
            style={{ marginBottom: "12px" }}
          >
            {item.submenu.map((subItem) => (
              <Menu.Item key={subItem.path} icon={subItem.icon}>
                <Link to={`/${subItem.path}`}>{subItem.title}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        );
      }
      return (
        <Menu.Item
          key={item.path}
          icon={item.icon}
          style={{ marginBottom: "12px", padding: "0px 24px" }}
        >
          <Link to={`/${item.path}`}>{item.title}</Link>
        </Menu.Item>
      );
    });
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
    >
      {renderMenuItems(SideMenuConfig)}
    </Menu>
  );
};

export default SidebarMenuList;
