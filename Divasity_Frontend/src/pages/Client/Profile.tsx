import React, { useState } from 'react';

const Profile = () => {
  // Get user data from session storage or context in a real app
  const [user, setUser] = useState({
    firstName: 'Timothy',
    lastName: 'Olajubu',
    email: 'olajubutimothy8@gmail.com'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user });

  const handleEdit = () => {
    setTempUser({ ...user });
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser({ ...tempUser });
    setIsEditing(false);
    // Here you would make an API PATCH request to update the user
    console.log('Saving user:', tempUser);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempUser({
      ...tempUser,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-5">Your Profile</h1>

      <div className="border border-blue-500 w-full rounded-lg p-5 shadow-sm rounded-lg shadow-sm">
        {/* First Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            First Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={tempUser.firstName}
              onChange={handleChange}
              className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          ) : (
            <div className="w-full px-3 py-2 text-gray-800">
              {user.firstName}
            </div>
          )}
        </div>

        {/* Last Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Last Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="lastName"
              value={tempUser.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          ) : (
            <div className="w-full px-3 py-2 text-gray-800">
              {user.lastName}
            </div>
          )}
        </div>

        {/* Email Field (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <div className="w-full px-3 py-2 text-gray-600 bg-gray-50 rounded-md">
            {user.email}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;