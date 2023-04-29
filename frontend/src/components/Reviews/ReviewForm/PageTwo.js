import { useContext, useState } from "react";
import { FormContext } from "./FormContext";
import "./PageTwo.css";

const PageTwo = ({ onChange }) => {
  const formState = useContext(FormContext);
  const [charCount, setCharCount] = useState(0);

  const updateCharCount = (event) => {
    const inputValue = event.target.value || "";
    setCharCount(inputValue.length);
    onChange(event);
  };

  return (
    <div className="page-2-div">
      <div style={{ marginBottom: "48px" }}>
        <h1 className="page-2-header">Write a Review</h1>
        <p className="page-2-subheader">
          Help diners decide where to eat. Remember to keep it short, simple and
          specific.
        </p>
      </div>
      <div style={{ minHeight: "21.875px" }}>
        <div style={{ height: "12.5rem", marginBottom: "32px" }}>
          <div className="need-help">
            <span>
              <svg viewBox="0 0 24 24" focusable="false">
                <g fill="none" fillRule="evenodd">
                  <path
                    d="M12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 Z M12,5 C8.13400675,5 5,8.13400675 5,12 C5,15.8659932 8.13400675,19 12,19 C15.8659932,19 19,15.8659932 19,12 C19,8.13400675 15.8659932,5 12,5 Z M11.16,13.192 C11.02,13.192 10.894,13.08 10.894,12.926 L10.894,12.338 C10.894,11.008 12.84,10.504 12.84,9.524 C12.84,9.02 12.42,8.586 11.72,8.586 C10.866,8.586 10.488,9.132 10.208,9.314 C10.096,9.384 9.998,9.384 9.9,9.3 L9.242,8.656 C9.13,8.558 9.144,8.39 9.242,8.292 C9.242,8.292 10.194,7.06 11.986,7.06 C13.456,7.06 14.702,8.04 14.702,9.412 C14.702,11.106 12.574,11.596 12.574,12.436 L12.574,12.898 C12.574,13.066 12.476,13.192 12.294,13.192 L11.16,13.192 Z M10.572,15.992 C10.572,15.362 11.09,14.83 11.72,14.83 C12.35,14.83 12.882,15.362 12.882,15.992 C12.882,16.622 12.35,17.14 11.72,17.14 C11.09,17.14 10.572,16.622 10.572,15.992 Z"
                    fill="#2d333f"
                  ></path>
                </g>
              </svg>
            </span>
            <div>Need help?</div>
          </div>
          <textarea
            className={
              charCount < 50 && charCount > 0
                ? "review-field error"
                : "review-field"
            }
            name="body"
            placeholder="Your review must be at least 50 characters"
            value={formState.body}
            onChange={updateCharCount}
          />
          <div className="min-50-chars">Minimum 50 characters</div>
        </div>
        <div className="char-count">
          <span
            style={{
              color: charCount < 50 || charCount > 2000 ? "#931b23" : "inherit",
            }}
          >
            {charCount}
          </span>{" "}
          / 2000 characters
        </div>
      </div>
    </div>
  );
};

export default PageTwo;
