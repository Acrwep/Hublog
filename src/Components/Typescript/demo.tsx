import React, { useState } from "react";
import moment from "moment";

export default function Demo() {
  //   const arr: {id:number, name:string}[] = [{id:1,name:"balaji"},{id:2,name:"Rubi"}]
  const DesignationList: any[] = [
    { id: 1, name: "balaji" },
    { id: 2, name: "Rubi" },
  ];

  //   const [data, setData] = useState<any[]>([
  //     { id: 1, name: "balaji" },
  //     { id: 2, name: "Rubi" },
  //   ]);

  const [data, setData] = useState<any[]>([]);

  const handleClick = (name: string) => {
    console.log("name", DesignationList);
  };

  return (
    <div>
      {DesignationList.map((item) => (
        <p onClick={() => handleClick(item.name)}>{item.name}</p>
      ))}
      {/* <p onClick={handleClick}>Click</p> */}
    </div>
  );
}
