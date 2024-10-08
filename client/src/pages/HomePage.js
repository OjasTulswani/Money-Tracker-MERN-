import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Select, message, Table, DatePicker } from "antd";
import Layout from "../components/Layouts/Layout";
import moment from "moment";
import axios from "axios";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Spinner from "../components/Spinner";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

// try to implement a category analysis
const commonExpenses = [
  { label: "Grocery", value: "grocery" },
  { label: "Fuel", value: "fuel" },
  { label: "Food", value: "food" },
  { label: "Transportation", value: "transportation" },
  { label: "Electricity Bill", value: "electricity_bill" },
  { label: "Gas Bill", value: "gas_bill" },
  { label: "Mobile Bill", value: "mobile_bill" },
  { label: "Health", value: "health" },
  { label: "EMI", value: "emi" },
  { label: "Salary", value: "salary" },
  { label: "Travel", value: "travel" },
  { label: "Miscellaneous", value: "miscellaneous" },
];

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("ALL");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredExpenses = commonExpenses.filter((expense) => 
    expense.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //table data
  const columns = [
    {
      title: "Date [YYYY-MM-DD]",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined className="mx-2" 
            onClick={() => {
              handleDelete(record);
            }}/>
        </div>
      ),
    },
  ];

  //useEffect Hook
  useEffect(() => {
    //getall transactions
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transactions/get-transaction", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setLoading(false);
        setAllTransection(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Ftech Issue With Tranction");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  //delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/transactions/delete-transaction",{
        transactionId: record._id,
      });
      setLoading(false);
      message.success("Transactions deleted successfully")
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Error deleting transaction")
    }
  }

  //form handling
  const handelSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/transactions/edit-transaction", {
          payload: {
            ...values,
            userid: user._id,
            date : moment(values.date).format("YYYY-MM-DD"),
          },
          transactionId: editable._id,
        });
        setLoading(false);
        message.success("Transactions updated successfully");
      } else {
        await axios.post("/transactions/add-transaction", {
          ...values,
          userid: user._id,
          date: moment(values.date).format("YYYY-MM-DD"),
        });
        setLoading(false);
        message.success("Transactions added successfully");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Error while adding transaction");
    }
  };
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div className="m-3">
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 WEEK</Select.Option>
            <Select.Option value="30">LAST 1 MONTH</Select.Option>
            <Select.Option value="365">LAST 1 YEAR</Select.Option>
            <Select.Option value="custom">CUSTOM</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select
            value={type}
            onChange={(values) => setType(values)}
            className="w-full max-w-3xl"
          >
            <Select.Option value="all">--ALL--</Select.Option>
            <Select.Option value="Income">INCOME</Select.Option>
            <Select.Option value="Expense">EXPENSE</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
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
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransection} />
        ) : (
          <Analytics allTransection={allTransection} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handelSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="Income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            {/* <Input type="text" /> */}
            <Select
              showSearch
              value={searchQuery}
              onChange={(value) => setSearchQuery(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {filteredExpenses.map((expense) => (
                <Select.Option value={expense.value}>{expense.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex text-sm  shadow-xl justify-end "
            >
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
