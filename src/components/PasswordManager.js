import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './PasswordManager.scss'; // Import your enhanced SCSS file

function PasswordManager() {
  const [website, setWebsite] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [selectedPassword, setSelectedPassword] = useState(null); // Track selected password
  const [showManagePassword, setShowManagePassword] = useState(false); // Track whether to show manage password options
  const [manualPassword, setManualPassword] = useState(''); // State to store manually entered password
  const [isManualMode, setIsManualMode] = useState(false); // Track whether manual mode is enabled
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Track password visibility

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3000/passwords', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedPasswords(response.data);
    } catch (error) {
      console.error('Error fetching passwords', error);
    }
  };

  const handleGeneratePassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:"<>?-=[];,./';
    const passwordLength = 12; // Change this to set your desired password length

    // Function to get a random character from a given set
    const getRandomChar = (charSet) => {
      return charSet.charAt(Math.floor(Math.random() * charSet.length));
    };

    // Start with a capital letter
    let newPassword = getRandomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

    // Fill the rest of the password with random characters
    for (let i = 1; i < passwordLength; i++) {
      newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Shuffle the generated password to make it more random
    newPassword = newPassword.split('').sort(() => Math.random() - 0.5).join('');

    setGeneratedPassword(newPassword);
  };

  const handleSavePassword = async () => {
    const token = localStorage.getItem('token');
    try {
      const passwordToSave = isManualMode ? manualPassword : generatedPassword;
      await axios.post('http://localhost:3000/save-password', {
        website,
        password: passwordToSave,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Password saved');
      fetchPasswords(); // Refresh the list of saved passwords
    } catch (error) {
      console.error('Error saving password', error);
    }
  };

  const handleRegeneratePassword = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:3000/regenerate-password', {
        website,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGeneratedPassword(response.data.password);
    } catch (error) {
      console.error('Error regenerating password', error);
    }
  };

  const handleDeletePassword = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/passwords/${selectedPassword._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPasswords(); // Refresh the list of saved passwords after deletion
      setSelectedPassword(null); // Clear selected password after deletion
    } catch (error) {
      console.error('Error deleting password', error);
    }
  };

  const handleAddItem = () => {
    setShowManagePassword(true);
  };

  const handlePasswordSelect = (password) => {
    setSelectedPassword(password);
    setShowManagePassword(false); // Hide manage password options when selecting a password
  };

  const toggleManualMode = () => {
    setIsManualMode(!isManualMode);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    
    <div className="password-manager-container">
      <div className="sidebar">
        <h2 className="sidebar-title">Websites</h2>
        <ul className="sidebar-list">
          {savedPasswords.map((item) => (
            <li
              key={item._id}
              className={`sidebar-list-item ${selectedPassword === item ? 'active' : ''}`}
              onClick={() => handlePasswordSelect(item)}
            >
              {item.website}
            </li>
          ))}
        </ul>
        <button className="add-item-button" onClick={handleAddItem}>
          Add Item
        </button>
      </div>
      <div className="main-content">
        {showManagePassword && (
          <>
            <h2 className="password-manager-title">Manage Passwords</h2>
            <div className="input-container">
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Website URL"
              />
              <button onClick={handleGeneratePassword}>Generate Password</button>
            </div>
            <div className="input-container">
              {isManualMode ? (
                <input
                  type="text"
                  value={manualPassword}
                  onChange={(e) => setManualPassword(e.target.value)}
                  placeholder="Enter Password Manually"
                />
              ) : (
                <input type="text" value={generatedPassword} readOnly />
              )}
            </div>
            <div className="button-container">
              <button onClick={toggleManualMode} className="manual-button">
                {isManualMode ? 'Use Generated Password' : 'Enter Manually'}
              </button>
              <button onClick={handleSavePassword} className="save-button">Save Password</button>
              <button onClick={handleRegeneratePassword} className="regenerate-button">Regenerate Password</button>
            </div>
          </>
        )}

        {selectedPassword && (
          <div className="selected-password">
            <h3>{selectedPassword.website}</h3>
            <div className="password-display">
              <p>Password: {isPasswordVisible ? selectedPassword.password : '********'}</p>
              <FontAwesomeIcon
                icon={isPasswordVisible ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                className="eye-icon"
              />
            </div>
            <button onClick={handleDeletePassword} className="delete-button">Delete Password</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordManager;
