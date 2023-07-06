import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import { green } from "@ant-design/colors";
import EditUserFunction from "./EditUserForm";
import DeleteUserFunction from "./DeleteUserForm";

const { Column } = Table;

const App = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const userInfo = (_id) => {
    axios
      .get(`http://localhost:8000/user/${_id}`)
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (rowData) => {
    setUser({ ...rowData });
    setIsModalVisible(true);
  };

  function handleDelete(_id) {
    setUserId(_id);
    setIsDeleteModalVisible(true);
  }

  const handleOpenModal = (_id) => {
    setUserId(_id);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleDeleteCloseModal = () => {
    setIsDeleteModalVisible(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const dataSource = data.map((user) => ({
    key: user._id,
    name: user.name,
    age: user.age,
    address: user.address,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, user) => (
        <Space size="middle">
          <a onClick={() => handleEdit(user)}>Edit</a>
          <a onClick={() => handleDelete(user._id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <EditUserFunction
        id={userId}
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        user={user}
      />
      <DeleteUserFunction
        _id={userId}
        isVisible={isDeleteModalVisible}
        onClose={handleDeleteCloseModal}
        user={user}
      />
      <div>
        <div style={{ marginTop: "20px" }}>
          <Table
            dataSource={dataSource}
            columns={columns}
            style={{ margin: "50px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
