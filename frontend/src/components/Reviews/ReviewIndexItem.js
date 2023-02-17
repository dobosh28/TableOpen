import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/reviews";
import StarRatings from "react-star-ratings";
import ReviewControls from "./ReviewControls";

const ReviewIndexItem = ({ review }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.session.user.id);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview(review.id));
  };

  let avg = (...args) => args.reduce((a, b) => a + b) / args.length;
  let avgRating = avg(
    review.overall,
    review.food,
    review.ambience,
    review.value,
    review.service
  );

  return (
    <div className="review-index-item">
      <div className="review-index-item-left">
        <span className="reviewer-avatar">
          <p className="reviewer-nickname-initial">
            {review.nickname[0].toUpperCase()}
          </p>
        </span>
        <span className="reviewer-nickname">{review.nickname}</span>
        <span className="reviewer-location">New York</span>
      </div>
      <div className="review-index-item-right">
        <StarRatings
          rating={avgRating}
          starRatedColor="#red"
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="1px"
        />
        <div className="review-categories">
          <span>Overall</span>
          <p>{review.overall} &nbsp;•&nbsp;</p>
          <span>Food</span>
          <p>{review.food} &nbsp;•&nbsp;</p>
          <span>Service</span>
          <p>{review.service} &nbsp;•&nbsp;</p>
          <span>Ambience</span>
          <p>{review.ambience}</p>
        </div>
        <div className="review-body">
          <p>{review.body}</p>
        </div>
        <ReviewControls review={review} handleDelete={handleDelete} id={id}/>
      </div>
    </div>
  );
};

export default ReviewIndexItem;
