// PageOne.js
import { useContext } from "react";
import { FormContext } from "./FormContext";
import StarRatings from "react-star-ratings";
import "./PageOne.css";

const PageOne = () => {
  const { formState, onStarRatingChange } = useContext(FormContext);

  return (
    <div>
      <h1>Overall</h1>
      <StarRatings
        rating={formState.overall}
        starRatedColor="#da3743"
        starHoverColor="#da3743"
        changeRating={(newRating) => onStarRatingChange(newRating, "overall")}
        numberOfStars={5}
        name="overall"
        starDimension="40px"
        starSpacing="1px"
      />
      <h1>Food</h1>
      <StarRatings
        rating={formState.food}
        starRatedColor="#da3743"
        starHoverColor="#da3743"
        changeRating={(newRating) => onStarRatingChange(newRating, "food")}
        numberOfStars={5}
        name="food"
        starDimension="40px"
        starSpacing="1px"
      />
      <h1>Service</h1>
      <StarRatings
        rating={formState.service}
        starRatedColor="#da3743"
        starHoverColor="#da3743"
        changeRating={(newRating) => onStarRatingChange(newRating, "service")}
        numberOfStars={5}
        name="service"
        starDimension="40px"
        starSpacing="1px"
      />
      <h1>Ambience</h1>
      <StarRatings
        rating={formState.ambience}
        starRatedColor="#da3743"
        starHoverColor="#da3743"
        changeRating={(newRating) => onStarRatingChange(newRating, "ambience")}
        numberOfStars={5}
        name="ambience"
        starDimension="40px"
        starSpacing="1px"
      />
      <h1>Value</h1>
      <StarRatings
        rating={formState.value}
        starRatedColor="#da3743"
        starHoverColor="#da3743"
        changeRating={(newRating) => onStarRatingChange(newRating, "value")}
        numberOfStars={5}
        name="value"
        starDimension="40px"
        starSpacing="1px"
      />
    </div>
  );
};

export default PageOne;
