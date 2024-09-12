import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Include Bootstrap for styling

const App = () => {
  const [emails, setEmails] = useState(['']); // Array of email addresses
  const [subject, setSubject] = useState('');
  const [link, setLink] = useState(''); // Optional field
  const [name, setName] = useState('');
  const [message, setMessage] = useState(''); // Optional field
  const [imageUrls, setImageUrls] = useState(['']); // Array to hold image URLs
  const [feedback, setFeedback] = useState('');

  // Clear feedback message after a few seconds
  const clearFeedback = () => {
    setTimeout(() => {
      setFeedback('');
    }, 3000);
  };

  // Handle adding new email input fields
  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  // Handle change in email input fields
  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  // Handle changes to image URLs
  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  // Handle adding a new image URL field
  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: emails, 
      subject, 
      link, 
      name, 
      message, 
      imageUrls
    };

    try {
      const response = await axios.post('http://localhost:8080/send-welcome-email', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setFeedback('Email sent successfully!');
      clearFeedback();
    } catch (error) {
      setFeedback(`Failed to send email: ${error.message}`);
      clearFeedback();
    }
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-center">Welcome to Fakad Infotech</h1>
        <p className="text-center text-muted">Send emails to multiple recipients with personalized messages.</p>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
        <div className="form-group">
          <label style={{ fontSize: '1.1rem', fontFamily: 'Helvetica, Arial, sans-serif' }}>Recipients' Email Addresses</label>
          {emails.map((email, index) => (
            <div key={index} className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                style={{ fontSize: '1rem', fontSize: '1rem', fontFamily: 'Helvetica, Arial, sans-serif', height: '4rem' }}
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                placeholder={`Recipient's Email ${index + 1}`}
                required
              />
              {emails.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setEmails(emails.filter((_, i) => i !== index))}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary mb-3"
            onClick={handleAddEmail}
          >
            Add Another Email
          </button>
        </div>

        <div className="form-group">
          <label style={{ fontSize: '1.1rem', fontFamily: 'Helvetica, Arial, sans-serif' }}>Your Name</label>
          <input
            type="text"
            className="form-control"
            style={{ fontSize: '1rem', fontSize: '1rem', fontFamily: 'Helvetica, Arial, sans-serif', height: '4rem' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label style={{ fontSize: '1.1rem', fontFamily: 'Helvetica, Arial, sans-serif' }}>Email Subject</label>
          <input
            type="text"
            className="form-control"
            style={{ fontSize: '1rem', fontSize: '1rem', fontFamily: 'Helvetica, Arial, sans-serif', height: '4rem' }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
            required
          />
        </div>

        <div className="form-group">
          <label style={{ fontSize: '1.1rem', fontFamily: 'Helvetica, Arial, sans-serif' }}>Optional Link</label>
          <input
            type="url"
            className="form-control"
            style={{ fontSize: '1rem', fontSize: '1rem', fontFamily: 'Helvetica, Arial, sans-serif', height: '4rem' }}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Include a link (optional)"
          />
        </div>

        <div className="form-group">
          <label style={{ fontSize: '1.1rem', fontFamily: 'Helvetica, Arial, sans-serif' }}>Message Body (Optional)</label>
          <textarea
            className="form-control"
            style={{ fontSize: '1rem', fontSize: '1rem', fontFamily: 'Helvetica, Arial, sans-serif', height: '200px' }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a personalized message"
          />
        </div>

        <div className="form-group">
          <label style={{ fontSize: '1.1rem', fontFamily: 'Helvetica, Arial, sans-serif' }}>Image URLs (Optional)</label>
          {imageUrls.map((url, index) => (
            <div key={index} className="input-group mb-3">
              <input
                type="url"
                className="form-control"
                style={{ fontSize: '1rem', fontSize: '1rem', fontFamily: 'Helvetica, Arial, sans-serif', height: '4rem' }}
                value={url}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                placeholder={`Image URL ${index + 1}`}
              />
              {imageUrls.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setImageUrls(imageUrls.filter((_, i) => i !== index))}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary mb-3"
            onClick={handleAddImageUrl}
          >
            Add Another Image URL
          </button>
        </div>

        <button type="submit" className="btn btn-primary w-100" style={{ fontSize: '1.1rem', fontFamily: 'Helvetica, Arial, sans-serif', padding: '10px 20px' }}>
          Send Email
        </button>

        {feedback && (
          <div className="mt-3 alert alert-success" role="alert" style={{ fontSize: '1rem', fontSize: '1rem', fontFamily: 'Helvetica, Arial, sans-serif' }}>
            {feedback}
          </div>
        )}
      </form>

      {/* Footer */}
      <footer className="mt-5 text-center">
        <p className="text-muted">&copy; 2024 All rights reserved. Fakad Infotech Centre</p>
      </footer>
    </div>
  );
};

export default App;
