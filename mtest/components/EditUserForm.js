import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { useAuth } from "../context/Context";

function EditUserFunction({ isVisible, onClose, userEdit, updateUser }) {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthday: "",
    status: "",
  });

  useEffect(() => {
    if (userEdit) {
      setFormData({
        name: userEdit.name,
        email: userEdit.email,
        birthday: userEdit.birthday,
        status: userEdit.status,
      });
    } else {
      setFormData({
        name: user.name,
        email: user.email,
        birthday: user.birthday,
        status: user.status,
      });
    }
  }, [user, userEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let apiUrl;
      let updatedData;

      if (userEdit) {
        apiUrl = `http://localhost:8000/user/update/${userEdit._id}`;
        updatedData = { ...userEdit, ...formData };
      } else {
        apiUrl = `http://localhost:8000/user/update/${user.id}`;
        updatedData = { ...user, ...formData };
      }

      await axios.put(apiUrl, updatedData);
      console.log(updatedData);
      updateUser(updatedData);

      onClose();
    } catch (error) {
      console.log(error);
      handleCancel();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      open={isVisible}
      onClose={() => handleCancel()}
      onOk={handleSubmit}
      footer={null}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="input-type">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            name="name"
            placeholder="Name"
          />
        </div>
        <div className="input-type">
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            name="email"
            placeholder="E-Mail"
          />
        </div>
        <div className="input-type">
          <input
            type="date"
            value={formData.birthday}
            onChange={(e) =>
              setFormData({ ...formData, birthday: e.target.value })
            }
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            name="birthday"
            placeholder="Birth Date"
          />
        </div>
        <div className="flex gap-10 items-center">
          <div className="form-check">
            <input
              type="radio"
              checked={formData.status === "Active"}
              onChange={() => setFormData({ ...formData, status: "Active" })}
              value="Active"
              id="radioDefault1"
              name="status"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            />
            <label
              htmlFor="radioDefault1"
              className="inline-block tet-gray-800"
            >
              Active
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              checked={formData.status === "Inactive"}
              onChange={() => setFormData({ ...formData, status: "Inactive" })}
              value="Inactive"
              id="radioDefault2"
              name="status"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            />
            <label
              htmlFor="radioDefault2"
              className="inline-block tet-gray-800"
            >
              Inactive
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="text-md w-2/6 bg-green-800 text-white ml-36 py-2 px-4 border rounded-md hover:bg-green-600 hover:text-white"
          >
            Update
          </button>
          <button
            onClick={handleCancel}
            className="text-md w-2/6 bg-orange-600 text-white py-2 px-4 border rounded-md hover:bg-orange-400 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditUserFunction;
