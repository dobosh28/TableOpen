import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../store/reviews";
import { useParams } from "react-router-dom";
import { getReviews } from "../../store/reviews";
import ReviewIndexItem from "./ReviewIndexItem";

const ReviewsShow = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const reviews = useSelector(getReviews(parseInt(restaurantId)));

    useEffect(() => {
        dispatch(fetchReviews(restaurantId));
    }, [dispatch, restaurantId]);

  return (
    <ul>
       {reviews.map((review) => (
          <ReviewIndexItem key={review.id} review={review} />
        ))}
    </ul>
  );
};

export default ReviewsShow;
