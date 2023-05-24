import { useState } from "react";
import StarRatings from "react-star-ratings";
import ReviewControls from "../ReviewControls";
import "./ReviewIndexItem.css";

const ReviewIndexItem = ({ review }) => {
  const colors = [
    "#bb6acd",
    "#5fb0b5",
    "#f68e5f",
    "#9c89b8",
    "#f2635f",
    "#a2d148",
    "#9b4dca",
    "#6f94d2",
    "#d6a83e",
    "#c34a5a",
    "#71986b",
    "#9b6d47",
  ];

  const [randomColor] = useState(
    colors[Math.floor(Math.random() * colors.length)]
  );

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="review-index-item">
      <section className="review-index-item-left">
        <div
          className="reviewer-nickname-initial"
          style={{ backgroundColor: randomColor }}
        >
          {review.nickname[0].toUpperCase()}
        </div>
        <span className="reviewer-nickname">{review.nickname}</span>
        <span className="reviewer-location">New York</span>
      </section>
      <section className="review-index-item-right">
        <section className="star-rat">
          <StarRatings
            rating={review.overall}
            starRatedColor="#da3743"
            starEmptyColor="rgb(225, 225, 225)"
            numberOfStars={5}
            starDimension="18px"
            starSpacing="1px"
          />
        </section>
        <div className="ofsa-div">
          <span className="ofsa">Food</span>
          <p className="rating-value">{review.food}</p>
          <span className="ofsa">&nbsp;•&nbsp;Service</span>
          <p className="rating-value">{review.service}</p>
          <span className="ofsa">&nbsp;•&nbsp;Ambience</span>
          <p className="rating-value">{review.ambience}</p>
          <span className="ofsa">&nbsp;•&nbsp;Overall</span>
          <p className="rating-value">{review.overall}</p>
        </div>
        <div className="review-body">
          <p className={showMore ? "full-review" : "short-review"}>
            {review.body}
          </p>
          {review.body.length > 200 && (
            <div onClick={() => setShowMore(!showMore)} className="read-more-less">
              {showMore ? "- Read less" : "+ Read more"}
            </div>
          )}
        </div>
        <ReviewControls review={review} />
      </section>
    </div>
  );
};

export default ReviewIndexItem;
