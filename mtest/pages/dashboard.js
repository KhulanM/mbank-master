import { useEffect, useState } from "react";
import { Space, Table } from "antd";
import axios from "axios";
import Navbar from "../components/Navbar";
import { green } from "@ant-design/colors";
import EditUserFunction from "../components/EditUserForm";
import DeleteUserFunction from "../components/DeleteUserForm";

const { Column } = Table;

const App = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [userEdit, setUserEdit] = useState(null);

  const handleEdit = (user) => {
    axios
      .get(`http://localhost:8000/user/${user.id}`)
      .then((response) => {
        setUserEdit(response?.data);
        setIsFormVisible(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleEditUser = (rowData) => {
    setUserEdit({ ...rowData });
  };
  const handleDelete = (rowData) => {
    setUser({ ...rowData });
    setIsDeleteModalVisible(true);
  };

  const handleCloseModal = () => {
    setRefreshTable(true);
    setIsFormVisible(false);
  };

  const handleDeleteCloseModal = () => {
    setUserEdit(null);
    setIsDeleteModalVisible(false);
    setRefreshTable(true);
  };
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/user/")
      .then((response) => {
        setData(response.data.data);
        setRefreshTable(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refreshTable]);

  return (
    <div>
      <EditUserFunction
        // isVisible ={isFormVisible}
        isVisible={Boolean(userEdit)}
        onClose={handleCloseModal}
        userEdit={userEdit}
        updateUser={updateUser}
      />
      <DeleteUserFunction
        isVisible={isDeleteModalVisible}
        onClose={handleDeleteCloseModal}
        user={user}
      />
      <div>
        <div style={{ marginTop: "20px" }}>
          <Table dataSource={data} style={{ margin: "50px" }}>
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="E-mail" dataIndex="email" key="email" />
            <Column title="Birthday" dataIndex="birthday" key="birthday" />
            <Column title="Status" dataIndex="status" key="status" />
            <Column
              title="Action"
              key="action"
              render={(_, user) => (
                <Space size="middle">
                  <a onClick={() => handleEditUser(user)}>Edit</a>
                  <a onClick={() => handleDelete(user)}>Delete</a>
                </Space>
              )}
            />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default App;
