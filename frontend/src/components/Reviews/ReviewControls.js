import { Link } from "react-router-dom";

const ReviewControls = ({ review, handleDelete, id }) => {
  if (review.userId !== id) {
    return null;
  }

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
};

export default ReviewControls;
