/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Modal } from "antd";

const Model = ({ title = null, isOpen, onClose, childern, data }) => {
  // const [open, setOpen] = useState(false);

  return (
    <>
      <Modal
        title={title}
        centered
        visible={isOpen}
        onOk={onClose}
        onCancel={onClose}
        width={1400}
        footer={null}
        style={{ top: 50 }}
      >
        <>
          <div className="flex w-full p-1">
            <div className="w-[70%] p-2">
              <img
                src={data.filePath}
                class="relative z-1"
                style={{ "max-width": "100%" }}
              ></img>
              <div class="bg-white border  rounded-[5px] mt-4  overflow-hidden">
                <div class="flex items-center justify-between p-4">
                  <h3 class="font-semibold text-[16px] text-slate-500">
                    Activity Detail
                  </h3>
                  <div class="flex items-center  text-md text-slate-400">
                    Activity Level :
                    <span class="font-semibold ml-2 text-md text-slate-500">
                      81.33%
                    </span>
                  </div>
                </div>
                <div class="w-full bg-neutral-200 ">
                  <div
                    class="bg-[#4A2DDA] p-0.5 h-2 text-center text-xs font-medium leading-none text-slate-100"
                    style={{ width: "81.33%" }}
                  ></div>
                </div>
                <div class="flex items-center justify-between w-full p-3">
                  <div class="flex flex-col text-center basis-[33.3%]">
                    <div class="text-md text-slate-500"> Duration </div>
                    <div class=" text-md text-red-400">05m:00s</div>
                  </div>
                  <div class="flex flex-col text-center basis-[33.3%]">
                    <div class="text-md text-slate-500"> Key Presses </div>
                    <div class=" text-md text-red-400">260</div>
                  </div>
                  <div class="flex flex-col text-center basis-[33.3%]">
                    <div class="text-md text-slate-500"> Mouse Clicks </div>
                    <div class="  text-md text-red-400">65</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[30%] p-2">
              <div class="app-header">
                <h3>Application Logs</h3>
              </div>
              <div class="flex items-center gap-4">
                <img
                  class="w-10 h-10 rounded-full"
                  src="https://v1prod002.blob.core.windows.net/assets/app_icons/chrome.svg"
                  alt=""
                />
                <div class="font-medium dark:text-white">
                  <div>Chrome</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    https://web.whatsapp.com/
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    duration : 00m:03s
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default Model;
