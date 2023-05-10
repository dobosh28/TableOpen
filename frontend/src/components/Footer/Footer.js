import "./Footer.css";
import linkedin from "../../icons/linkedin.svg";
import github from "../../icons/github.svg";
import angellist from "../../icons/angellist.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-top-inner">
            <div className="footer-top-category">
              <div className="footer-category-title">Backend</div>
              <ul>
                <li>Ruby</li>
                <li>Rails</li>
                <li>PostgreSQL</li>
              </ul>
            </div>
            <div className="footer-top-category">
              <div className="footer-category-title">Frontend</div>
              <ul>
                <li>JavaScript</li>
                <li>React</li>
                <li>Redux</li>
                <li>React Star Ratings</li>
                <li>React Datepicker</li>
              </ul>
            </div>
            <div className="footer-top-category">
              <div className="footer-category-title">Styling</div>
              <ul>
                <li>HTML5</li>
                <li>CSS3</li>
              </ul>
            </div>
            <div className="footer-top-category">
              <div className="footer-category-title">
                Other work by Yosyp Dobosh
              </div>
              <div className="other-work">
                <a
                  href="https://dobosh28.github.io/FIFA22_RadarViz/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FIFA22_RadarViz
                  <span className="other-work-icon">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <g fill="none" fillRule="evenodd">
                        <path
                          d="M8.65685425,9.65685425 L8.65685425,15.1568542 C8.65685425,15.4329966 8.43299662,15.6568542 8.15685425,15.6568542 L7.15685425,15.6568542 C6.88071187,15.6568542 6.65685425,15.4329966 6.65685425,15.1568542 L6.65685425,9.15685425 L6.65685425,8.15685425 C6.65685425,7.88071187 6.88071187,7.65685425 7.15685425,7.65685425 L14.1568542,7.65685425 C14.4329966,7.65685425 14.6568542,7.88071187 14.6568542,8.15685425 L14.6568542,9.15685425 C14.6568542,9.43299662 14.4329966,9.65685425 14.1568542,9.65685425 L8.65685425,9.65685425 Z"
                          transform="translate(10.656854, 11.656854) scale(-1, 1) rotate(-45.000000) translate(-10.656854, -11.656854)"
                          fill="#FFF"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </a>
                <a
                  href="https://we-union.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  weUnion
                  <span className="other-work-icon">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <g fill="none" fillRule="evenodd">
                        <path
                          d="M8.65685425,9.65685425 L8.65685425,15.1568542 C8.65685425,15.4329966 8.43299662,15.6568542 8.15685425,15.6568542 L7.15685425,15.6568542 C6.88071187,15.6568542 6.65685425,15.4329966 6.65685425,15.1568542 L6.65685425,9.15685425 L6.65685425,8.15685425 C6.65685425,7.88071187 6.88071187,7.65685425 7.15685425,7.65685425 L14.1568542,7.65685425 C14.4329966,7.65685425 14.6568542,7.88071187 14.6568542,8.15685425 L14.6568542,9.15685425 C14.6568542,9.43299662 14.4329966,9.65685425 14.1568542,9.65685425 L8.65685425,9.65685425 Z"
                          transform="translate(10.656854, 11.656854) scale(-1, 1) rotate(-45.000000) translate(-10.656854, -11.656854)"
                          fill="#FFF"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </a>
              </div>
              <div className="lets-connect">Let's Connect!</div>
              <div className="lets-connect-links">
                <a
                  href="https://www.linkedin.com/in/yosypdobosh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedin} alt="" />
                </a>

                <a
                  href="https://github.com/dobosh28"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={github} alt="" />
                </a>
                <a
                  href="https://wellfound.com/u/yosyp-dobosh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={angellist} alt="" />
                </a>
              </div>
            </div>
          </div>
          <ul>
            <li className="footer-stuff">Privacy Policy</li>
            <li className="footer-stuff">Terms of Use</li>
            <li className="footer-stuff">Cookies and Interest-Based Ads</li>
            <li className="footer-stuff">
              Do Not Sell or Share My Personal Information
            </li>
            <li className="footer-stuff">Cookie Preferences</li>
          </ul>
          <span className="copyright">
            Copyright © 2023 TableOpen, Inc., an{" "}
            <a
              href="https://www.opentable.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenTable
            </a>{" "}
            clone by Yosyp Dobosh, Bronx NY 10461 - All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
