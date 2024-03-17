import React, { useState } from "react";
import { Form, Input, Modal, Select } from "antd";
import Layout from "../components/Layouts/Layout";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  //form handling
  const handelSubmit = (values) => {
    console.log(values)
  }
  return (
    <Layout>
      <div className="filters">
        <div className="m-3">Range Filter</div>
        <div>
          <button
            type="button"
            class="text-gray-900 bg-white  font-medium  text-sm px-5 py-2.5 me-2 mb-2 shadow-lg "
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content"></div>
      <Modal title = "Add Transaction" 
      open = {showModal} 
      onCancel={() => setShowModal(false)}
      footer={false}
      >
        
        <Form layout="vertical" onFinish={handelSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="text"/>
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select>
            <Select.Option value="Income">Income</Select.Option>
            <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Input type="text"/>
          </Form.Item>
          
          <Form.Item label="Description" name="description">
            <Input type="text"/>
          </Form.Item>
          
          <Form.Item label="Reference" name="reference">
            <Input type="text"/>
          </Form.Item>
          
          <Form.Item label="Date" name="date">
            <Input type="date"/>
          </Form.Item>

          <div className="flex justify-end">
            <button type="submit" className="flex text-sm  shadow-xl justify-end "> 
                SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
