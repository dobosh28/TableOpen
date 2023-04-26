import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createReview } from "../../../store/reviews";
import { useParams, useHistory } from "react-router-dom";
import "./ReviewForm.css";

const ReviewForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { restaurantId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const [reviewData, setReviewData] = useState({
    nickname: "",
    body: "",
    overall: 0,
    food: 0,
    service: 0,
    ambience: 0,
    value: 0,
    user_id: sessionUser?.id,
    restaurant_id: parseInt(restaurantId),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: name === "body" || name === "nickname" ? value : parseInt(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const review = {
      ...reviewData
    };

    dispatch(createReview(review));
    history.push(`/restaurants/${restaurantId}`);
  };

  // debugger;

  return (
    <form onSubmit={handleSubmit}>
      <div className="review-form">
        <div className="review-form__header">
          <h2>Write a Review</h2>
        </div>
        <div className="review-form__body">
          <div className="review-form__body__nickname">
            <label htmlFor="nickname">Nickname</label>
            <input
              type="text"
              name="nickname"
              value={reviewData.nickname}
              onChange={handleChange}
            />
          </div>
          <div className="review-form__body__overall">
            <label htmlFor="overall">Overall</label>
            <input
              type="number"
              name="overall"
              min="1"
              max="5"
              value={reviewData.overall}
              onChange={handleChange}
            />
          </div>
          <div className="review-form__body__food">
            <label htmlFor="food">Food</label>
            <input
              type="number"
              name="food"
              min="1"
              max="5"
              value={reviewData.food}
              onChange={handleChange}
            />
          </div>
          <div className="review-form__body__service">
            <label htmlFor="service">Service</label>
            <input
              type="number"
              name="service"
              min="1"
              max="5"
              value={reviewData.service}
              onChange={handleChange}
            />
          </div>
          <div className="review-form__body__ambience">
            <label htmlFor="ambience">Ambience</label>
            <input
              type="number"
              name="ambience"
              min="1"
              max="5"
              value={reviewData.ambience}
              onChange={handleChange}
            />
          </div>
          <div className="review-form__body__value">
            <label htmlFor="value">Value</label>
            <input
              type="number"
              name="value"
              min="1"
              max="5"
              value={reviewData.value}
              onChange={handleChange}
            />
          </div>
          <div className="review-form__body__body">
            <label htmlFor="body">Review</label>
            <textarea
              name="body"
              value={reviewData.body}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="review-form__footer">
          <button type="submit">Submit Review</button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
