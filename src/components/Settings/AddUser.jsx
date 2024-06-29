import React, { useState } from 'react';
import { Drawer, Button, Input, DatePicker, Select } from 'antd';

const { Option } = Select;

function SidebarForm({ showAddUser, setShowAddUser }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: null,
        dateOfJoining: null,
        email: '',
        phone: '',
        gender: '',
        role: '',
        designation: '',
        team: ''
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct payload
        const payload = { ...formData };
        // Make API call or do further processing with the payload
        console.log(payload);
        // Reset form after submission
        setFormData({
            firstName: '',
            lastName: '',
            dob: null,
            dateOfJoining: null,
            email: '',
            phone: '',
            gender: '',
            role: '',
            designation: '',
            team: ''
        });
        // Close the sidebar
        setShowAddUser(false);
    };

    return (
        <Drawer
            title="Add User"
            placement="right"
            closable={true}
            onClose={() => setShowAddUser(false)}
            visible={showAddUser}
            width={600}
        >
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label htmlFor="firstName" className="block font-bold mb-1">First Name:</label>
                    <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="border-1 border-black-400"
                        value={formData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block font-bold mb-1">Last Name:</label>
                    <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="border-1 border-black-400"
                        value={formData.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dob" className="block font-bold mb-1">Date of Birth:</label>
                    <DatePicker
                        id="dob"
                        name="dob"
                        style={{ width: '100%' }}
                        className="border-1 border-black-400"
                        value={formData.dob}
                        onChange={(date) => handleChange('dob', date)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dateOfJoining" className="block font-bold mb-1">Date of Joining:</label>
                    <DatePicker
                        id="dateOfJoining"
                        name="dateOfJoining"
                        style={{ width: '100%' }}
                        className="border-1 border-black-400"
                        value={formData.dateOfJoining}
                        onChange={(date) => handleChange('dateOfJoining', date)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-bold mb-1">Email:</label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        className="border-1 border-black-400"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block font-bold mb-1">Phone:</label>
                    <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="border-1 border-black-400"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="gender" className="block font-bold mb-1">Gender:</label>
                    <Select
                        id="gender"
                        name="gender"
                        style={{ width: '100%' }}
                        className="border-1 border-black-400"
                        value={formData.gender}
                        onChange={(value) => handleChange('gender', value)}
                    >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block font-bold mb-1">Role:</label>
                    <Select
                        id="role"
                        name="role"
                        style={{ width: '100%' }}
                        className="border-1 border-black-400"
                        value={formData.role}
                        onChange={(value) => handleChange('role', value)}
                    >
                        <Option value="manager">Manager</Option>
                        <Option value="developer">Developer</Option>
                        <Option value="designer">Designer</Option>
                    </Select>
                </div>
                <div className="mb-4">
                    <label htmlFor="designation" className="block font-bold mb-1">Designation:</label>
                    <Select
                        id="designation"
                        name="designation"
                        style={{ width: '100%' }}
                        className="border-1 border-black-400"
                        value={formData.designation}
                        onChange={(value) => handleChange('designation', value)}
                    >
                        <Option value="senior">Senior</Option>
                        <Option value="junior">Junior</Option>
                    </Select>
                </div>
                <div className="mb-4">
                    <label htmlFor="team" className="block font-bold mb-1">Team:</label>
                    <Select
                        id="team"
                        name="team"
                        style={{ width: '100%' }}
                        className="border-1 border-black-400"
                        value={formData.team}
                        onChange={(value) => handleChange('team', value)}
                    >
                        <Option value="frontend">Frontend</Option>
                        <Option value="backend">Backend</Option>
                        <Option value="design">Design</Option>
                    </Select>
                </div>
                <Button type="primary" htmlType="submit" style={{ backgroundColor: "#4096ff" }} className="col-span-2 w-40">Submit</Button>
            </form>
        </Drawer>
    );
}

export default SidebarForm;
