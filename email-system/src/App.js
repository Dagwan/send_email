import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [email, setEmail] = useState(''); // Single email address
  const [name, setName] = useState('');
  const [link, setLink] = useState(''); // Link to include in the email
  const [attachments, setAttachments] = useState([]); // Array of attachment files
  const [feedback, setFeedback] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const formattedAttachments = files.map((file) => ({
      filename: file.name,
      path: URL.createObjectURL(file), // Temporary URL for local reference
      embed: false, // Adjust based on requirement
    }));
    setAttachments(formattedAttachments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      email,
      name,
      link,
      attachments,
    };

    try {
      const response = await axios.post('http://localhost:8080/send-welcome-email', requestData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setFeedback('Email sent successfully!');
    } catch (error) {
      setFeedback(`Failed to send email: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Send Welcome Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
          <label>Attachments (Optional)</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            multiple
          />
          {attachments.length > 0 && (
            <div className="mt-3">
              <h5>Attachment Previews</h5>
              <ul>
                {attachments.map((file, index) => (
                  <li key={index}>{file.filename}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Send Email
        </button>
      </form>
      {feedback && <p className="mt-3">{feedback}</p>}
    </div>
  );
};

export default App;
