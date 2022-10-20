import aboutUsPage from "../images/aboutusIntroPage.png";
import firstPic from "../images/aboutUsPic1.png";
import secondPic from "../images/aboutUsPic2.png";
import thirdPic from "../images/aboutUsPic3.png";
import rishi from "../images/rishi.png";
import lavina from "../images/lavina.png";
import jacob from "../images/jacob.png";
import zo from "../images/zo.png";

const AboutpageBody = () => {
  return (
    <div>
      <div className="pitch-and-image">
        <div className="pitch-text-holder">
          <div className="pitch-text">
            FreeUp facilitates the upcycling of free used goods between New
            Yorkers to make the process as streamlined as possible
          </div>
        </div>
        <div className="pitch-img">
          <img
            className="pitch-img"
            src={aboutUsPage}
            height="300px"
            width="400px"
          />
        </div>
      </div>
      <div className="value-proposition-text">The impact</div>
      <div className="upcycling-info">
        <div className="blurb-one">
          <div className="blurb-one-container">
            <div className="blurb-one-img">
              <img
                className="blurb-one-actual-img"
                src={firstPic}
                height="200px"
                width="200px"
              />
            </div>
            <div className="blurb-one-holder">
              <div className="blurb-one-text">
                Less than 20% of all charitable donations to Goodwill and The
                Salvation Army are sold. Charities receive far too many
                donations to sell them all.
              </div>
            </div>
          </div>
        </div>
        <div className="blurb-two">
          <div className="blurb-two-container">
            <div className="blurb-two-img">
              <img
                className="blurb-one-actual-img"
                src={secondPic}
                height="200px"
                width="200px"
              />
            </div>
            <div className="blurb-two-holder">
              <div className="blurb-two-text">
                22% of 30-59 year olds regularly upcycled followed by 60 yrs up
                and 18-29 respectively.
              </div>
            </div>
          </div>
        </div>
        <div className="blurb-three">
          <div className="blurb-three-container">
            <div className="blurb-three-img">
              <img
                className="blurb-one-actual-img"
                src={thirdPic}
                height="200px"
                width="200px"
              />
            </div>
            <div className="blurb-three-holder">
              <div className="blurb-three-text">
                The exchange of free used goods between New Yorkers keeps the
                sidewalks clean and fosters a sense community.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="who-we-are-container">
        <div className="who-we-are-text">Who we are</div>
        <div className="authors-container">
          <div className="person-one-container">
            <div className="img-and-info">
              <div className="person-three-img-container">
                <img
                  className="author-img"
                  src={rishi}
                  height="100px"
                  width="100px"
                />
              </div>
              <div className="author-information-text">Rishi Shah</div>
              <div className="author-role">Product Manager</div>
              <div className="author-social">
                <a
                  target="_blank"
                  className="author-links"
                  href="https://www.linkedin.com/in/rishi-shah-0317/"
                >
                  <img
                    src="https://seeklogo.com/images/L/linkedin-icon-logo-05B2880899-seeklogo.com.png"
                    height="34px"
                    width="34px"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="person-two-container">
            <div className="img-and-info">
              <div className="person-three-img-container">
                <img
                  className="author-img"
                  src={jacob}
                  height="100px"
                  width="120px"
                />
              </div>
              <div className="author-information-text">Jacob Nathanson</div>
              <div className="author-role">Software Developer</div>
              <div className="author-social">
                <div className="github-section">
                  <a
                    target="_blank"
                    className="author-links"
                    href="https://github.com/j-nathanson"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                      height="34px"
                      width="34px"
                    />
                  </a>
                </div>
                <div className="linkedIn-section">
                  <a
                    target="_blank"
                    className="author-links"
                    href="https://www.linkedin.com/in/j-nathanson/"
                  >
                    {" "}
                    <img
                      src="https://seeklogo.com/images/L/linkedin-icon-logo-05B2880899-seeklogo.com.png"
                      height="34px"
                      width="34px"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="person-three-container">
            <div className="img-and-info">
              <div className="person-three-img-container">
                <img
                  className="author-img"
                  src={zo}
                  height="100px"
                  width="120px"
                />
              </div>
              <div className="author-information-text">Zohaib Manzoor</div>
              <div className="author-role">Software Developer</div>
              <div className="author-social">
                <div className="github-section">
                  <a
                    target="_blank"
                    className="author-links"
                    href="https://github.com/ZohaibManzoor00"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                      height="34px"
                      width="34px"
                    />
                  </a>
                </div>
                <div className="linkedIn-section">
                  <a
                    target="_blank"
                    className="author-links"
                    href="https://www.linkedin.com/in/zohaibmanzoor/"
                  >
                    <img
                      src="https://seeklogo.com/images/L/linkedin-icon-logo-05B2880899-seeklogo.com.png"
                      height="34px"
                      width="34px"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="person-four-container">
            <div className="img-and-info">
              <div className="person-three-img-container">
                <img
                  className="author-img"
                  src={lavina}
                  height="100px"
                  width="150x"
                />
              </div>
              <div className="author-information-text">Lavina Green</div>
              <div className="author-role">Product Designer</div>
              <div className="author-social">
                <div className="linkedIn-section">
                  <a
                    target="_blank"
                    className="author-links"
                    href="https://www.linkedin.com/in/lavina-green-b3313b14/"
                  >
                    {" "}
                    <img
                      src="https://seeklogo.com/images/L/linkedin-icon-logo-05B2880899-seeklogo.com.png"
                      height="34px"
                      width="34px"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="faq-container">
        <div className="faq-text">Frequently Asked Questions</div>
        <div className="qanda-holder">
          <div className="individual-qanda-columns">
            <div className="question-section">
              <div className="question-holder">
                <div className="question-text">
                How do I sign up?
                </div>
              </div>
            </div>
            <div className="answer-section">
              <div className="answer-holder">
                <div className="answer-text">
                To sign up, click on the Sign Up button. There you will select your password and enter your user information.
                </div>
              </div>
            </div>
          </div>
          <div className="individual-qanda-columns">
            <div className="question-section">
              <div className="question-holder">
                <div className="question-text">
                How do I change my email? 
                </div>
              </div>
            </div>
            <div className="answer-section">
              <div className="answer-holder">
                <div className="answer-text">
                On FreeUp.com, navigate to Your account and select Account settings. Scroll down to the Email section and fill out your new email in the Change your email form. Select Change Email and Hit Submit! 
                </div>
              </div>
            </div>
          </div>
          <div className="individual-qanda-columns">
            <div className="question-section">
              <div className="question-holder">
                <div className="question-text">
                Is my information private?
                </div>
              </div>
            </div>
            <div className="answer-section">
              <div className="answer-holder">
                <div className="answer-text">
                Yes, your personal and health information is completely private. We take confidentiality very seriously! 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="link-to-more-text">Read More</div>
      <div className="bottom-space"></div>
    </div>
  );
};

export default AboutpageBody;
