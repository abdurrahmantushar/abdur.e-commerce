import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import UserAvatarEdit from "./userAvatarEdit";
import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';
import { toast } from "react-toastify";
import { AxiosToastError } from '../common config/axiosToastEross';
import { setUserDetails } from "../store/userSlice";

function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [openPhotoEdit, setOpenPhotoEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name || "",
    email: user.email || "",
    mobile: user.mobile || "",
  });

  useEffect(() => {
    setUserData({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {};
      if (userData.name && userData.name !== user.name) payload.name = userData.name;
      if (userData.email && userData.email !== user.email) payload.email = userData.email.trim();
      if (userData.mobile && userData.mobile !== user.mobile) payload.mobile = userData.mobile;

      if (Object.keys(payload).length === 0) {
        toast.info("No changes to update");
        setLoading(false);
        return;
      }

      const res = await Axios({ ...SummaryApi.update_userDetails, data: payload });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUserDetails({ ...user, ...payload }));
        setEditMode(false);
      } else if (res.data.error) {
        toast.error(res.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 min-h-screen bg-gray-50">
      {/* Avatar Section */}
      <div className="relative group w-40 h-40">
        <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden shadow-lg flex items-center justify-center">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <FaUser className="text-gray-400 text-6xl" />
          )}
        </div>

        {/* Change Avatar Button */}
        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => setOpenPhotoEdit(true)}
            className="bg-red-600 text-white px-4 py-1 text-sm rounded-md font-semibold hover:bg-red-700"
          >
            Change
          </button>
        </div>

        {openPhotoEdit && <UserAvatarEdit close={() => setOpenPhotoEdit(false)} />}
      </div>

      {/* User Info Form */}
      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Profile Information</h2>

        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Name"
          className={`border p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition ${
            !editMode ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          disabled={!editMode}
        />

        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          className={`border p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition ${
            !editMode ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          disabled={!editMode}
        />

        <input
          type="text"
          name="mobile"
          value={userData.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          className={`border p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition ${
            !editMode ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          disabled={!editMode}
        />

        {/* Buttons */}
        {editMode ? (
          <div className="flex gap-3 mt-2 justify-center">
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition mx-auto"
          >
            Edit Profile
          </button>
        )}
      </form>
    </div>
  );
}

export default UserProfile;
