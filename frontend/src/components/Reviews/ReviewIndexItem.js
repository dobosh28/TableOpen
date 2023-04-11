import { useState } from "react";
import StarRatings from "react-star-ratings";
import ReviewControls from "./ReviewControls";
import "./ReviewIndexItem.css";

const ReviewIndexItem = ({ review }) => {
  let avg = (...args) => args.reduce((a, b) => a + b) / args.length;
  let avgRating = avg(
    review.overall,
    review.food,
    review.ambience,
    review.value,
    review.service
  );

  const colors = ['#bb6acd', '#5fb0b5', '#f68e5f', '#9c89b8', '#f2635f', '#a2d148', '#9b4dca', '#6f94d2', '#d6a83e', '#c34a5a', '#71986b', '#9b6d47'];
  const [randomColor] = useState(colors[Math.floor(Math.random() * colors.length)]);

  return (
    <div className="review-index-item">
      <section className="review-index-item-left">
        <div className="reviewer-nickname-initial" style={{backgroundColor: randomColor}}>
          {review.nickname[0].toUpperCase()}
        </div>
        <span className="reviewer-nickname">{review.nickname}</span>
        <span className="reviewer-location">New York</span>
      </section>
      <section className="review-index-item-right">
        <section className="star-ratings">
          <StarRatings
            className="stars"
            rating={avgRating}
            starRatedColor="#da3743"
            numberOfStars={5}
            name="rating"
            starDimension="18px"
            starSpacing="1px"
          />
        </section>
        <div className="ofsa-div">
          <span className="ofsa">Overall</span>
          <p className="rating-value">{review.overall}</p>
          <span className="ofsa">&nbsp;•&nbsp;Food</span>
          <p className="rating-value">{review.food}</p>
          <span className="ofsa">&nbsp;•&nbsp;Service</span>
          <p className="rating-value">{review.service}</p>
          <span className="ofsa">&nbsp;•&nbsp;Ambience</span>
          <p className="rating-value">{review.ambience}</p>
        </div>
        <div className="review-body">
          <p className="review-description">{review.body}</p>
        </div>
        <ReviewControls review={review} />
      </section>
    </div>
  );
};

export default ReviewIndexItem;
