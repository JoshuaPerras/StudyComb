import React from 'react';
import './Review.css';

const ReviewPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      // TODO: Implement form submission stuff to, feah
    console.log('Form submitted');
  };

  return (
    <>
      {/* Header */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src="logo.png" alt="App Logo" className="logo" />
          <ul className="nav-menu">
            <li><a href="#">Home</a></li>
            <li><a href="#">Filter</a></li>
            <li><a href="#">Maps</a></li>
            <li><a href="#">Profile</a></li>
          </ul>
        </div>
        <div className="navbar-right">
          <span className="user-greeting">Hello, BeeUser123!</span>
          <button className="btn-logout">Log out</button>
        </div>
      </nav>

      {/* Review Section */}
      <div className="review-container">
        <h1 className="review-title">Leave a Review</h1>

        <form className="review-form" onSubmit={handleSubmit}>
          <label htmlFor="location">Location</label>
          <select id="location" required>
            <option value="">Select a location</option>
            <option value="mlc">Miller Learning Center</option>
            <option value="scilib">Science Library</option>
            <option value="tate">Tate Center</option>
          </select>

          <label htmlFor="rating">Rating</label>
          <div className="rating-stars">
            {[5, 4, 3, 2, 1].map((star) => (
              <React.Fragment key={star}>
                <input type="radio" id={`star${star}`} name="rating" value={star} />
                <label htmlFor={`star${star}`}>⭐</label>
              </React.Fragment>
            ))}
          </div>

          <label htmlFor="comment">Your Thoughts</label>
          <textarea
            id="comment"
            rows={5}
            placeholder="Tell other students what you liked or didn't like..."
            required
          ></textarea>

          <button type="submit">Submit Review</button>
        </form>

        {/* Bee :))) */}
        <img src="bee-right.png" className="bee-deco" alt="bee" />
      </div>
    </>
  );
};

export default ReviewPage;
