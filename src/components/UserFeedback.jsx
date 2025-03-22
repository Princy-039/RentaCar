import React, { useState } from 'react';

const Contact = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0); // New state for star rating

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    const contactData = { name, email, message, rating }; // Include rating in the data

    try {
      const response = await fetch('http://localhost:3000/feedback/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Message sent successfully!');
        // Reset form
        setName('');
        setEmail('');
        setMessage('');
        setRating(0);
      } else {
        alert('Failed to send message: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Star component generator
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => setRating(i)} // Set rating on click
          style={{
            fontSize: '2rem',
            color: i <= rating ? '#ffc107' : '#e4e5e9', // Gold if selected, grey if not
            cursor: 'pointer',
            transition: 'color 0.2s',
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section id="contact" className="py-5 bg-white">
      <div className="container">
        <div className="row align-items-center">
          {/* Contact Form */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Have Your Say</h2>
            <p className="text-muted mb-4">
              Your experience matters to us! If you have any suggestions, concerns, or feedback regarding our services, please let us know. We are here to improve and provide the best experience for you.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="5"
                  placeholder="Write your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Star Rating Field */}
              <div className="mb-3">
                <label className="form-label">Rate Us</label>
                <div>{renderStars()}</div>
              </div>

              <button type="submit" className="btn btn-warning w-100">
                Send Message
              </button>
            </form>
          </div>

          {/* Image */}
          <div className="col-md-6">
            <img
              src="https://images.pexels.com/photos/8133853/pexels-photo-8133853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Contact Us"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
