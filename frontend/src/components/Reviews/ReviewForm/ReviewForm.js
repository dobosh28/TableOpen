import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { createReview, updateReview } from "../../../store/reviews";
import { FormContext } from "./FormContext";
import { useCallback } from "react";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import "./ReviewForm.css";

const ReviewForm = ({ review }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const restaurantId = useParams().restaurantId;
  const sessionUser = useSelector((state) => state.session.user);

  const [formState, setFormState] = useState(
    review
      ? {
          ...review,
          nickname: review.nickname,
          restaurant_id: review.restaurantId,
          user_id: review.userId,
        }
      : {
          overall: 0,
          food: 0,
          service: 0,
          ambience: 0,
          value: 0,
          nickname: `${sessionUser?.firstName}${sessionUser?.lastName[0]}`,
          body: "",
          restaurant_id: restaurantId,
          user_id: sessionUser?.id,
        }
  );

  const handleFormChange = function (e) {
    let name, value;

    if (typeof e === "string") {
      name = e;
      value = arguments[1];
    } else {
      name = e.target.name;
      value = e.target.value;
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleStarRatingChange = (newRating, name) => {
    setFormState((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: newRating,
      };

      isFormValid(updatedState);
      return updatedState;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      overall: parseInt(formState.overall),
      food: parseInt(formState.food),
      service: parseInt(formState.service),
      ambience: parseInt(formState.ambience),
      value: parseInt(formState.value),
      nickname: formState.nickname,
      body: formState.body,
      restaurant_id: parseInt(restaurantId),
      user_id: sessionUser?.id,
    };

    if (review) {
      dispatch(updateReview({ ...reviewData, id: review.id }));
    } else {
      dispatch(createReview(reviewData));
    }
    history.push(`/restaurants/${restaurantId}`);
  };

  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      id: "page1",
      component: (
        <PageOne
          onChange={handleFormChange}
          onStarRatingChange={handleStarRatingChange}
        />
      ),
    },
    { id: "page2", component: <PageTwo onChange={handleFormChange} /> },
    { id: "page3", component: <PageThree onChange={handleFormChange} /> },
  ];

  const currentPageClass = (pageId) =>
    pageId === pages[currentPage].id ? "dot-active" : "";

  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const isFormValid = useCallback(
    (state) => {
      const requiredFields = [
        "overall",
        "food",
        "service",
        "ambience",
        "value",
      ];
      const pageOneValid = requiredFields.every((field) => state[field] >= 1);
      const pageTwoValid = state.body.length >= 50;
      const pageThreeValid =
        state.nickname.length >= 4 && state.nickname.length <= 24;

      if (currentPage === 0) {
        setIsNextDisabled(!pageOneValid);
        return pageOneValid;
      } else if (currentPage === 1) {
        setIsNextDisabled(!pageTwoValid);
        return pageTwoValid;
      } else if (currentPage === 2) {
        setIsNextDisabled(!pageThreeValid);
        return pageThreeValid;
      }
    },
    [currentPage]
  );

  useEffect(() => {
    isFormValid(formState);
  }, [formState, currentPage, isFormValid]);

  return (
    <div className="review-form-container">
      <div className="review-form-inner">
        <div className="review-form-inner-2">
          <div className="page-dots">
            {pages.map((page) => (
              <div
                key={page.id}
                to={page.id}
                className={`dot ${currentPageClass(page.id)}`}
              ></div>
            ))}
          </div>
          <FormContext.Provider
            value={{ formState, onStarRatingChange: handleStarRatingChange }}
          >
            {pages[currentPage].component}
          </FormContext.Provider>
        </div>
      </div>
      <div className="back-next">
        <div className="back-next-inner">
          {currentPage > 0 && (
            <div style={{ height: "50px", width: "83.25px" }}>
              <button
                className="back-button"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Back
              </button>
            </div>
          )}
          <div
            style={{
              alignItems: "flex-end",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {currentPage === 2 ? (
              <button
                className={`next-submit-button ${
                  isNextDisabled ? "next-submit-button-disabled" : ""
                }`}
                onClick={handleSubmit}
                disabled={isNextDisabled}
              >
                Submit
              </button>
            ) : (
              <button
                className={`next-submit-button ${
                  isNextDisabled ? "next-submit-button-disabled" : ""
                }`}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={isNextDisabled}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
