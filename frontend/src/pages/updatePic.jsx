import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import dummy from "../assests/dummyPP.png";

const UpdatePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePic: "",
  });
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Generate a temporary preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a profile picture to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const response = await axios.put("/api/auth/updateDP", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);
      loadData(); // Reload user data to reflect the updated profile picture
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "An error occurred while uploading."
      );
    }
  };

  const loadData = async () => {
    try {
      const response = await axios.get("/api/auth/check");
      setUser({
        name: response.data.fullName,
        email: response.data.email,
        profilePic: response.data.profilePic || dummy, // Use dummy image if profilePic is empty
      });
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "An error occurred while fetching user data."
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Update Profile Picture
        </h2>
        <div className="flex flex-col items-center mb-4">
          <img
            src={preview || user.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-2 border-2 border-gray-300 object-cover"
          />
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose a new profile picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none"
          >
            Upload Profile Picture
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePage;
