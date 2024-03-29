import ReviewIndexItem from "./ReviewIndexItem/ReviewIndexItem";

const ReviewsShow = ({ reviews }) => {
  return (
    <ul>
      {reviews.map((review) => (
        <ReviewIndexItem key={review.id} review={review} />
      ))}
    </ul>
  );
};

export default ReviewsShow;
