import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { useParams } from "react-router-dom";

const ReviewControls = ({ review }) => {
  const { restaurantId } = useParams();
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
          <NavLink
            to={`/restaurants/${restaurantId}/review/${review.id}`}
            className="edit-review-link"
          >
            <button>Modify review</button>
          </NavLink>
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
