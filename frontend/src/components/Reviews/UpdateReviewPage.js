import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getReview, fetchReview } from "../../store/reviews";
import ReviewForm from "./ReviewForm/ReviewForm";

const UpdateReviewPage = () => {
  const { reviewId } = useParams();
  const dispatch = useDispatch();
  const review = useSelector(getReview(reviewId));

  useEffect(() => {
    if (!review) {
      dispatch(fetchReview(reviewId));
    }
  }, [dispatch, review, reviewId]);

  return (
    <div>
      {review ? <ReviewForm review={review} /> : <h1>Review not found</h1>}
    </div>
  );
};

export default UpdateReviewPage;
