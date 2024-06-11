import React from 'react';
// import { MdRefresh, MdDownload } from 'react-icons/md';
// import LineChart from './LineChart'; // Import the updated LineChart component
// import DropdownWithCheckboxes from './DropdownCheckbox';
import { Select } from 'antd';

// const { RangePicker } = DatePicker;
const { Option } = Select;

const Dashboard = ({ fromDate, toDate }) => {
 
  // const [selectedRange, setSelectedRange] = useState([]);
  // const [selectedOption, setSelectedOption] = useState(null);

  // const handleRangeChange = (dates) => {
  //   setSelectedRange(dates);
  // };

  // const handleDropdownChange = (value) => {
  //   setSelectedOption(value);
  // };

  // const handleSelectAll = () => {
  //   setSelectedRange([null, null]);
  // };

  // const handleClearAll = () => {
  //   setSelectedRange([]);
  // };

  return (
    <>
    <Select defaultValue="All Team" style={{ width: 180 }} >
      <Option value="option1">Option 1</Option>
      <Option value="option2">Option 2</Option>
      <Option value="option3">Option 3</Option>
    </Select>
    </>
  );
};

export default Dashboard;
