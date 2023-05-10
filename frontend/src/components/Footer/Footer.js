import "./Footer.css";

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
                <a href="https://we-union.onrender.com/" target="_blank">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
