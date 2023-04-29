// PageOne.js
import { useContext, useEffect } from "react";
import { FormContext } from "./FormContext";
import StarRatings from "react-star-ratings";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getRestaurant, fetchRestaurant } from "../../../store/restaurants";
import "./PageOne.css";

const PageOne = () => {
  const dispatch = useDispatch();
  const restaurantId = parseInt(useParams().restaurantId);
  const restaurant = useSelector(getRestaurant(restaurantId));
  const sessionUser = useSelector((state) => state.session.user);

  const { formState, onStarRatingChange } = useContext(FormContext);

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
  }, [dispatch, restaurantId]);

  const ratingToString = (rating) => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very good";
      case 5:
        return "Outstanding";
      default:
        return "";
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "48px" }}>
        <h1 className="page-one-header">
          {sessionUser.firstName}, how was your experience at {restaurant?.name}
          ?
        </h1>
        <p className="page-one-subheader">Rate your experience (required)</p>
      </div>
      <div
        style={{
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          minHeight: "20.3125rem",
        }}
      >
        <div className="rating-div">
          <p className="which-rating">Overall</p>

          <StarRatings
            rating={formState.overall}
            starRatedColor="#da3743"
            starHoverColor="#da3743"
            starEmptyColor="rgb(225, 225, 225)"
            changeRating={(newRating) =>
              onStarRatingChange(newRating, "overall")
            }
            numberOfStars={5}
            name="overall"
            starDimension="40px"
            starSpacing="1px"
          />
          <p className="rating-text">{ratingToString(formState.overall)}</p>
        </div>
        <div className="rating-div">
          <p className="which-rating">Food</p>
          <StarRatings
            rating={formState.food}
            starRatedColor="#da3743"
            starHoverColor="#da3743"
            starEmptyColor="rgb(225, 225, 225)"
            changeRating={(newRating) => onStarRatingChange(newRating, "food")}
            numberOfStars={5}
            name="food"
            starDimension="40px"
            starSpacing="1px"
          />
          <p className="rating-text">{ratingToString(formState.food)}</p>
        </div>
        <div className="rating-div">
          <p className="which-rating">Service</p>
          <StarRatings
            rating={formState.service}
            starRatedColor="#da3743"
            starHoverColor="#da3743"
            starEmptyColor="rgb(225, 225, 225)"
            changeRating={(newRating) =>
              onStarRatingChange(newRating, "service")
            }
            numberOfStars={5}
            name="service"
            starDimension="40px"
            starSpacing="1px"
          />
          <p className="rating-text">{ratingToString(formState.service)}</p>
        </div>
        <div className="rating-div">
          <p className="which-rating">Ambience</p>
          <StarRatings
            rating={formState.ambience}
            starRatedColor="#da3743"
            starHoverColor="#da3743"
            starEmptyColor="rgb(225, 225, 225)"
            changeRating={(newRating) =>
              onStarRatingChange(newRating, "ambience")
            }
            numberOfStars={5}
            name="ambience"
            starDimension="40px"
            starSpacing="1px"
          />
          <p className="rating-text">{ratingToString(formState.ambience)}</p>
        </div>
        <div className="rating-div">
          <p className="which-rating">Value</p>
          <StarRatings
            rating={formState.value}
            starRatedColor="#da3743"
            starHoverColor="#da3743"
            starEmptyColor="rgb(225, 225, 225)"
            changeRating={(newRating) => onStarRatingChange(newRating, "value")}
            numberOfStars={5}
            name="value"
            starDimension="40px"
            starSpacing="1px"
          />
          <p className="rating-text">{ratingToString(formState.value)}</p>
        </div>
      </div>
    </div>
  );
};

export default PageOne;
