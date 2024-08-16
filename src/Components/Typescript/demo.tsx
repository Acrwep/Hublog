import React, { useState, useEffect } from "react";
import moment from "moment";
import CommonInputField from "../Common/CommonInputField.js";
import { Input } from "antd";

export default function Demo() {
  //   const arr: {id:number, name:string}[] = [{id:1,name:"balaji"},{id:2,name:"Rubi"}]

  interface Users {
    id: number;
    name: string;
    active: boolean;
  }

  const UserList: Users[] = [{ id: 1, name: "j7u", active: true }];

  const DesignationList: any[] = [
    { id: 1, name: "balaji" },
    { id: 2, name: "Rubi" },
  ];

  //   const [data, setData] = useState<any[]>([
  //     { id: 1, name: "balaji" },
  //   ]);

  const [data, setData] = useState<any[]>([]);

  const handleClick = (name: string) => {
    console.log("name", DesignationList);
  };

  useEffect(() => {
    const Id: string = "1";

    const convertNum = parseInt(Id as string);
    console.log("nummmmmmm", convertNum, typeof convertNum);
  }, []);
  return (
    <div>
      {DesignationList.map((item) => (
        <p onClick={() => handleClick(item.name)}>{item.name}</p>
      ))}
      {/* <p onClick={handleClick}>Click</p> */}
      <CommonInputField label="aas" />
      <Input placeholder="jiuiuij" />
    </div>
  );
}
