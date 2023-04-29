import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormContext } from "./FormContext";
import "./PageThree.css";

const PageThree = ({ onChange }) => {
  const formState = useContext(FormContext);
  const sessionUser = useSelector((state) => state.session.user);
  const [charCount, setCharCount] = useState(0);

  const updateCharCount = (e) => {
    setCharCount(e.target.value?.length ?? 0);
    onChange(e);
  };

  useEffect(() => {
    if (formState.formState.nickname) {
      setCharCount(formState.formState.nickname.length);
    }
  }, [formState.nickname]);

  return (
    <div className="page-3-div">
      <div style={{ marginBottom: "48px" }}>
        <h1 className="nickname-header">What is your reviews nickname?</h1>
        <p className="nickname-subheader">
          Your nickname will be published on OpenTable alongside any reviews you
          create and publish. For privacy reasons, don’t use your full name or
          email address.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div>
          <div className={charCount > 3 ? "input-div" : "input-div-error"}>
            <label className={!charCount ? "no-chars-label" : "chars-label"}>Nickname</label>
            <input
              type="text"
              name="nickname"
              defaultValue={`${sessionUser?.firstName}${sessionUser?.lastName[0]}`}
              value={formState.nickname}
              onChange={updateCharCount}
            />
          </div>
          <div className="char-count">
            <span style={{ color: charCount < 4 ? "#931b23" : "inherit" }}>
              {charCount}
            </span>{" "}
            / 24 characters
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageThree;
