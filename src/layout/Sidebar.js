import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarContext } from "../context/sidebarContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { SideMenuConfig } from "../config/sideBarConfig";
import LogoImg from "../assets/images/logo-re-3.png";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import "./sidebarstyles.css";

const Sidebar = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);
  const location = useLocation();

  useEffect(() => {
    setSidebarClass(isSidebarOpen ? "ml-[-165px]" : "");
  }, [isSidebarOpen]);

  const { toggleSidebar } = useContext(SidebarContext);

  const handleAccordionClick = (index) => {
    setActiveAccordion(index === activeAccordion ? null : index);
  };

  const determineBackgroundColor = (path) => {
    // console.log( location.pathname ==`/we360/${path}`);
    return location.pathname === `/${path}`
      ? "bg-gradient-to-l from-blue-700 via-blue-700 to-green-500 px-2 py-2 rounded-[10px]"
      : "";
  };

  return (
    <div className={`my-custom-sidebar ${sidebarClass}`}>
      <div className={"overflow-y-auto h-full py-4 px-4 sidebarContainer"}>
        <div className="flex justify-start items-center ">
          <div>
            <img
              src={LogoImg}
              alt="profile_image"
              className={`${sidebarClass ? "hidden" : ""} w-36`}
            />
          </div>
          <span
            className=" font-medium text-gray-300 text-2xl ml-auto"
            onClick={toggleSidebar}
          >
            <RxHamburgerMenu />
          </span>
        </div>
        <div
          className="h-600 overflow-auto scrollbar-thin scrollbar-thumb-pumpkin scrollbar-track-pumpkin"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <nav className="mt-10 h-600 scrollbar-thin scrollbar-thumb-pumpkin scrollbar-track-pumpkin">
            <ul className="nav-list">
              {Object.values(SideMenuConfig).map((item, index) => (
                <div key={index}>
                  {item.submenu ? (
                    <>
                      <div
                        className={`p-3 flex cursor-pointer hover:rounded-l-lg${
                          sidebarClass ? "justify-end" : "justify-start"
                        } text-gray-300 hover:text-white sidebar_menuitems`}
                        onClick={() => handleAccordionClick(index)}
                      >
                        <div>
                          <div />
                        </div>
                        <div
                          className={`w-32 flex ${
                            sidebarClass ? "justify-end" : "justify-start"
                          } items-center`}
                        >
                          <span className="ml-7 flex justify-end items-center text-xl">
                            {item.icon}
                          </span>
                          {sidebarClass ? (
                            ""
                          ) : (
                            <span className="ml-2 w-28 text-[0.9rem]">
                              {item.title}
                            </span>
                          )}
                        </div>
                        <div>
                          {activeAccordion === index ? (
                            <MdExpandLess />
                          ) : (
                            <MdExpandMore />
                          )}
                        </div>
                      </div>
                      {activeAccordion === index && (
                        <div
                          className={`pl-6 flex flex-col items-end overflow-hidden transition-height duration-300 ${
                            activeAccordion === index ? "h-auto" : "h-0"
                          }`}
                        >
                          {item.submenu.map((submenuItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={submenuItem.path}
                              className={`sidebar_menuitems p-3 px-5 cursor-pointer text-gray-300 hover:text-white transition-all duration-300 ${determineBackgroundColor(
                                submenuItem.path
                              )}`}
                            >
                              <div
                                className={`w-32 flex ${
                                  sidebarClass ? "justify-end" : "justify-start"
                                } items-center`}
                              >
                                <span className="flex justify-end items-center text-xl">
                                  {submenuItem.icon}
                                </span>
                                {sidebarClass ? (
                                  ""
                                ) : (
                                  <span className="ml-2 w-28 text-[0.9rem]">
                                    {submenuItem.title}
                                  </span>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div
                      key={index}
                      className={`p-3 px-5 flex ${
                        sidebarClass ? "justify-end" : "justify-start"
                      } cursor-pointer hover:rounded-l-lg text-gray-300 hover:text-white overflow-hidden`}
                    >
                      <Link
                        to={item.path}
                        className={` flex ${
                          sidebarClass
                            ? "justify-end pl-[7.23rem]"
                            : "justify-start px-5"
                        } cursor-pointer hover:rounded-l-lg text-gray-300 hover:text-white overflow-hidden transition-all duration-300 ${determineBackgroundColor(
                          item.path
                        )}`}
                      >
                        <div>
                          <div />
                        </div>
                        <div
                          className={`w-32 flex sidebar_menuitems ${
                            sidebarClass ? "justify-end" : "justify-start"
                          } items-center`}
                        >
                          <span className="flex justify-end items-center text-xl">
                            {item.icon}
                          </span>
                          {sidebarClass ? (
                            ""
                          ) : (
                            <span className="ml-2 w-28 font-900 text-[0.9rem]">
                              {item.title}
                            </span>
                          )}
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
