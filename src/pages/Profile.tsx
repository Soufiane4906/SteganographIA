import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('http://localhost:5000/upload-profile', formData, {
        withCredentials: true, // Ensure cookies are sent for authentication
      });
      window.location.reload(); // Reload to show updated picture
    } catch (error) {
      console.error('Error uploading profile picture', error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <img src={`http://localhost:5000/uploads/${user.profile_picture}`} alt="Profile" width={100} />
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload Profile Picture</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
