import React, { useState, useEffect } from 'react'
import Table from '../../components/table/Table'
import { IoSearchSharp } from "react-icons/io5";
import SidebarForm from './AddUser';

const Userdesignation = () => {
  const [activePage, setActivePage] = useState(1);
  const [data,setData] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(()=>{
    const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQEh1YmxvZy5jb20iLCJ1c2VySWQiOjEsInJvbGUiOiJBRE1JTiIsInN1YiI6MSwibmJmIjoxNzEzMTg4ODY0LjAsImlhdCI6MTcxMzE4ODg2NC4wLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ0MzAwLyIsImF1ZCI6InNlY3VyZWFwaXVzZXIiLCJleHAiOjE3MTMxOTYwNjQuMH0.VbXKnhK0SB1viG2bmWXuPCOBt6UwU2WfOlt2wYVLZhg';
  
  fetch('http://65.1.247.242:8002/api/Admin/GetUsers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("data",data);
      setData(data?.user);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  },[])

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };



  const DesignationData= [
    {name:'OPERATION',description:'', createdat:'2023-11-02',action:''},
    {name:'EXTERNAL HR',description:'', createdat:'2023-11-02',action:''},
    {name:'Sales Executive',description:'sales', createdat:'2023-11-02',action:''},
    {name:'INTERNAL HR',description:'', createdat:'2023-11-02',action:''},
    {name:'QUALITY',description:'', createdat:'2023-11-02',action:''},
    {name:'SEO',description:'', createdat:'2023-11-02',action:''},
    {name:'BOE',description:'', createdat:'2023-11-02',action:''},
  ]
  const columns = [
    { title: 'Name', key: 'first_Name', width: '150px' },
    { title: 'Email', key: 'email', width: '150px' },
    { title: 'Team', key: 'teamName', width: '150px' },
    { title: 'Role', key: 'roleName', width: '150px' },
    { title: 'DOB', key: 'dob', width: '150px' },
    { title: 'DOJ', key: 'doj', width: '150px' },
    { title: 'Status', key: 'active', width: '150px' },
    { title: 'Action', key: 'accessLevel', width: '150px' },
  ];

  const deginationcolumns = [
    { title: 'Name', key: 'name', width: '150px' },
    { title: 'Description', key: 'description', width: '150px' },
    { title: 'Created At', key: 'createdat', width: '150px' },
    { title: 'Action', key: 'action', width: '150px' },
  ];
  return (
    <div>
      {showAddUser && <SidebarForm showAddUser={showAddUser} setShowAddUser={setShowAddUser} />}
      <div>
        <h2>Users & Designations</h2>
        <ul className=" flex p-2 text-gray-600">
          <li
            onClick={() => handlePageChange(1)}
            className={`mx-3 cursor-pointer ${
              activePage === 1 ? "border-b border-blue-600" : ""
            }`}
          >
            Users
          </li>
          <li
            onClick={() => handlePageChange(2)}
            className={`mx-3 cursor-pointer ${
              activePage === 2 ? "border-b border-blue-600" : ""
            }`}
          >
            Designation
          </li>
        </ul>
        <hr />
      </div>

      <div>
        {activePage === 1 && (
          <div>
            <div className="flex">
              <input
                type="search"
                className=" w-2/7 h-8 border border-gray-500 rounded-tl-lg rounded-bl-lg mt-5 ml-5"
              />
              <div className="w-12 border border-gray-500 p-1 mt-5 h-8 rounded-tr-lg rounded-br-lg text-2xl">
                <IoSearchSharp />
              </div>
              <button
                className={`m-2 p-1 cursor-pointer bg-blue-500 text-white rounded-tl-lg`}
                onClick={()=>{setShowAddUser(!showAddUser)}}
              >
                Add User
              </button>
            </div>
            {data?.length > 0 && <Table data={data} columns={columns} />}
          </div>
        )}
        {activePage === 2 && (
          <div>
            <div className="flex">
              <input
                type="search"
                className=" w-2/7 h-8 border border-gray-500 rounded-tl-lg rounded-bl-lg mt-5 ml-5"
              />
              <div className="w-12 border border-gray-500 p-1 mt-5 h-8 rounded-tr-lg rounded-br-lg text-2xl">
                <IoSearchSharp />
              </div>
            </div>
            <Table data={DesignationData} columns={deginationcolumns} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Userdesignation;