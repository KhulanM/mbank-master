import { Button, Modal, Space } from "antd";
import { useState } from "react";
import axios from "axios";

export default function DeleteUserFunction({ isVisible, onClose, user }) {
  const id = user._id;
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/user/delete/${id}`);
      console.log("User deleted");

      handleCancel();
    } catch (error) {
      console.log(error);
      handleCancel();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal open={isVisible} onCancel={handleCancel} footer={null}>
      <p>Are you sure you want to delete {user.name}?</p>
      <div className="mt-3">
        <Space>
          <Button
            type="primary"
            style={{ background: "green", borderColor: "green" }}
            onClick={handleDelete}
          >
            Yes
          </Button>
          <Button style={{ borderColor: "green" }} onClick={handleCancel}>
            No
          </Button>
        </Space>
      </div>
    </Modal>
  );
}
