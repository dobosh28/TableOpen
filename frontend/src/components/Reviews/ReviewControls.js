import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/reviews";

const ReviewControls = ({ review }) => {
  const dispatch = useDispatch();
  const sessionUserId = useSelector((state) => state.session?.user?.id);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview(review.id));
  };

  if (review.userId === sessionUserId) {
    return (
      <div className="review-controls">
        <div className="edit-delete-review">
          <Link
            to={`/restaurants/${review.restaurantId}/reviews/${review.id}/form`}
            className="edit-review-link"
          >
            <button>Modify review</button>
          </Link>
          <button className="delete-review-button" onClick={handleDelete}>
            Delete review
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ReviewControls;
