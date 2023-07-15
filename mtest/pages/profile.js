import { useState } from "react";
import EditUserFunction from "../components/EditUserForm";
import { useAuth } from "../context/Context";
import Head from "next/head";

export default function UserProfile() {
  const { user, setUser, isLoggedIn } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setIsModalVisible(false);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="py-3 px-10">
        {user ? (
          <h2 className="text-l text-center font-bold py-10">
            {isLoggedIn ? `Hi! ${user.name}` : "Hi! Guest"}
          </h2>
        ) : (
          <h2>loading....</h2>
        )}
        <div className="flex bg-center w-19 items-center justify-center mt-3">
          <button
            className="shadow bg-green-800 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            onClick={handleEditProfileClick}
          >
            Edit Profile
          </button>
        </div>
        <div className="mt-10">
          {isEditing ? (
            <EditUserFunction
              onClose={handleCloseModal}
              isVisible={isModalVisible}
              updateUser={updateUser}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
