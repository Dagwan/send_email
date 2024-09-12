import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Include Bootstrap for styling

const App = () => {
  const [emails, setEmails] = useState(['']); // Array of email addresses
  const [subject, setSubject] = useState('');
  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrls, setImageUrls] = useState(['']); // Array to hold image URLs
  const [feedback, setFeedback] = useState('');

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
    } catch (error) {
      setFeedback(`Failed to send email: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-center">Welcome Email Sender</h1>
        <p className="text-center text-muted">Send welcome emails to multiple recipients with personalized messages.</p>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
        <div className="form-group">
          <label>Recipient Emails</label>
          {emails.map((email, index) => (
            <div key={index} className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                placeholder={`Email ${index + 1}`}
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
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Link</label>
          <input
            type="url"
            className="form-control"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Message Body</label>
          <textarea
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label>Image URLs (Optional)</label>
          {imageUrls.map((url, index) => (
            <div key={index} className="input-group mb-3">
              <input
                type="url"
                className="form-control"
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

        <button type="submit" className="btn btn-primary w-100">Send Email</button>

        {feedback && <div className="alert alert-info mt-4">{feedback}</div>}
      </form>

      {/* Footer */}
      <footer className="mt-5 text-center">
        <p className="text-muted">&copy; 2024 Fakad Infotech</p>
      </footer>
    </div>
  );
};

export default App;
