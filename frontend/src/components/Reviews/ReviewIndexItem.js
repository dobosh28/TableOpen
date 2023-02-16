import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { useHistory } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ReviewIndexItem = ({ review }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

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

  let reviewControls =
    sessionUser === review.user_id ? (
      <div className="edit-delete-review">
        <Link
          to={`/restaurants/${review.restaurant_id}/reviews/${review.id}/form`}
          className="edit-review-link"
        >
          <button>Edit Review</button>
        </Link>
        <button className="delete-review-button" onClick={handleDelete}>
          Delete Review
        </button>
      </div>
    ) : null;

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
        <div className="review-controls">{reviewControls}</div>
      </div>
    </div>
  );
};

export default ReviewIndexItem;
