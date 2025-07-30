import React, { useState, useRef, useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../../../components/Notification";

const EditIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.30597 2.72948H3.9558C2.51429 2.72948 1.3457 3.89806 1.3457 5.33958V14.04C1.3457 15.4815 2.51429 16.6501 3.9558 16.6501H12.6561C14.0977 16.6501 15.2662 15.4815 15.2662 14.04L15.2662 9.68978M5.69587 12.2998L8.86133 11.662C9.02938 11.6282 9.18367 11.5454 9.30485 11.4242L16.391 4.33409C16.7308 3.99416 16.7306 3.44315 16.3905 3.1035L14.8894 1.60409C14.5495 1.26458 13.9988 1.26481 13.6592 1.60461L6.57226 8.69542C6.45131 8.81643 6.36873 8.97041 6.33484 9.13811L5.69587 12.2998Z"
      stroke="#656565"
      strokeWidth="1.45006"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 16.25L4.5 3.75M8.5 8.70131C8.18882 9.04438 8 9.49503 8 9.98859C8 11.0634 8.89543 11.9347 10 11.9347C10.5093 11.9347 10.9741 11.7495 11.3272 11.4445M17.0323 11.9347C17.7209 10.904 18 10.0634 18 10.0634C18 10.0634 16.1795 4.25 10 4.25C9.65308 4.25 9.31989 4.26832 9 4.30291M14.5 14.4579C13.3521 15.1901 11.8744 15.7079 10 15.6773C3.89744 15.5775 2 10.0634 2 10.0634C2 10.0634 2.88155 7.2484 5.5 5.5361"
      stroke="#656565"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const EyeOnIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke="#656565"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="#656565"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Settings() {
  const [adminApiData, setAdminApiData] = useState();
  useEffect(() => {
    const getAdminData = async () => {
      try {
        Axios.get("admin/profile").then((data) => {
          setAdminApiData(data.data.data);
          const response = data.data.data;
          const nameParse = response.name.trim().split(" ");
          setProfileData({
            firstName: nameParse[0],
            lastName: nameParse?.slice(1).join(" ") || "",
            phoneNumber: response?.phone || "",
            email: response?.email || "",
            dateOfBirth: response?.birthday || "",
            location: response?.location || "",
            biography: response?.bio || "",
          });
          console.log(data);
        });
      } catch (err) {}
    };
    getAdminData();
  }, []);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    location: "",
    biography: "",
  });

  // State for password change form
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    reEnterPassword: "",
  });

  // State for UI controls
  const [isEditing, setIsEditing] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // Handler for profile data changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for password changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Handler for saving profile
  const handleSaveProfile = () => {
    const formData = new FormData();
    formData.append("name", profileData.firstName + profileData.lastName);
    formData.append("email", profileData.email);
    formData.append("phone", profileData.phoneNumber);
    formData.append("location", profileData.location);
    formData.append("birthday", profileData.dateOfBirth);
    formData.append("bio", profileData.bio);
    formData.append("avatar", profileImage);
    formData.append("_method", 'PUT');
    console.log(profileImage);
    try {
      Axios.post("admin/profile", formData).then((data) => {
        console.log(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Handler for saving password
  const handleSavePassword = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.reEnterPassword) {
      toast.warn("New passwords do not match!");
      return;
    }
    try {
      Axios.post("admin/profile/password", {
        current_password: passwords.currentPassword,
        password: passwords.newPassword,
        password_confirmation: passwords.reEnterPassword,
        _method: "PUT",
      }).then((data) => {
        console.log(data);
        if (data.status === 200) {
          toast.success("Updated Successfly");
        }else if(data.status === 422){
          toast.warn("some thing wrong !");
        }
      });
      setPasswords({
        currentPassword: "",
        newPassword: "",
        reEnterPassword: "",
      });
    } catch (err) {
      console.log(err);
      toast.error('Some Thing Wrong !');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Notifcation />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-black text-2xl font-semibold mb-8">
          About section
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-black text-lg font-semibold">Profile</h2>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full mb-4 bg-gray-200 flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                  )}
                </div>
                <h3 className="text-black text-lg font-semibold mb-2">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <span className="text-gray-500 text-sm">
                  {profileData.email}
                </span>
              </div>
            </div>

            {/* Change Password Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-black text-lg font-semibold mb-6">
                Change Password
              </h2>
              <form className="space-y-4" onSubmit={handleSavePassword}>
                {/* Current Password */}
                <div>
                  <label className="block text-black text-sm font-medium mb-3">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      min="8"
                      value={passwords.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? <EyeOnIcon /> : <EyeOffIcon />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-black text-sm font-medium mb-3">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      min="8"
                      placeholder="Enter new password"
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOnIcon /> : <EyeOffIcon />}
                    </button>
                  </div>
                </div>

                {/* Re-enter Password */}
                <div>
                  <label className="block text-black text-sm font-medium mb-3">
                    Re-enter Password
                  </label>
                  <div className="relative">
                    <input
                      type={showReEnterPassword ? "text" : "password"}
                      name="reEnterPassword"
                      value={passwords.reEnterPassword}
                      onChange={handlePasswordChange}
                      placeholder="Re-enter new password"
                      min="8"
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() =>
                        setShowReEnterPassword(!showReEnterPassword)
                      }
                    >
                      {showReEnterPassword ? <EyeOnIcon /> : <EyeOffIcon />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:bg-orange-600"
                >
                  Save Change
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Profile Update */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-black text-lg font-semibold">
                  Profile Update
                </h2>
                {isEditing ? (
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-gray-600 text-sm hover:bg-gray-50"
                  >
                    <EditIcon />
                    Edit
                  </button>
                )}
              </div>

              {/* Profile Image Upload */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                  )}
                </div>
                <div className="flex gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="bg-orange-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600"
                  >
                    Upload New
                  </button>
                  <button
                    onClick={() => setProfileImage(null)}
                    className="border border-gray-300 text-black px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-black text-sm font-medium mb-3">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm disabled:bg-gray-200 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-black text-sm font-medium mb-3">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm disabled:bg-gray-200 disabled:text-gray-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-black text-sm font-medium mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm disabled:bg-gray-200 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-black text-sm font-medium mb-3">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm disabled:bg-gray-200 disabled:text-gray-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-black text-sm font-medium mb-3">
                      Date of Birth
                    </label>
                    <input
                      type="text"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      placeholder="dd-mm-yyyy"
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm disabled:bg-gray-200 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-black text-sm font-medium mb-3">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm disabled:bg-gray-200 disabled:text-gray-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-black text-sm font-medium mb-3">
                    Biography
                  </label>
                  <textarea
                    rows="4"
                    name="biography"
                    value={profileData.biography}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    placeholder="Enter a biography about you"
                    className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm resize-none disabled:bg-gray-200 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
