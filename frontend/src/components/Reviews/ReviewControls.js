import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { useSelector } from "react-redux";

const ReviewControls = ({ review }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.session?.user?.id);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview(review.id));
  };

  if (id && review.userId === id) {
    return (
      <div className="review-controls">
        <div className="edit-delete-review">
          <Link
            to={`/restaurants/${review.restaurantId}/reviews/${review.id}/form`}
            className="edit-review-link"
          >
            <button>Edit Review</button>
          </Link>
          <button className="delete-review-button" onClick={handleDelete}>
            Delete Review
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ReviewControls;
