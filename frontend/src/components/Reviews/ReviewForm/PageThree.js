import { useContext } from "react";
// import { useSelector } from "react-redux";
import { FormContext } from "./FormContext";
import "./PageThree.css";

const PageThree = ({ onChange }) => {
  const formState = useContext(FormContext);
  


  // const sessionUser = useSelector((state) => state.session.user);

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
          <div className="input-div">
            <label>Nickname</label>
            <input
              type="text"
              name="nickname"
              // defaultValue={sessionUser.firstName}
              value={formState.nickname}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageThree;
