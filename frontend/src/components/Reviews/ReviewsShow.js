import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, fetchReviews} from "../../store/reviews";

const ReviewsShow = () => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => Object.values(state.reviews));

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    return (
        <ul>
            {reviews.map((review, i) => {
                return (
                    <>
                        <li key={i}>
                            <h2>{review.body}</h2>
                        </li>
                    </>
                );
            })}
        </ul>
    );
}

export default ReviewsShow;