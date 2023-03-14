import React from "react";
import CatCard from "../../components/catCard/catCard";
import Featured from "../../components/featured/Featured";
import ProjectCard from "../../components/projectCard/ProjectCard";
import Slide from "../../components/slide/Slide";

import { cards } from "../../data";
import { projects } from "../../data";

import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <Featured />

      {/* trusted by */}
      <div className="trustedBy">
        <div className="container">
          <span>Trusted by:</span>
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png"
            alt=""
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png"
            alt=""
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png"
            alt=""
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png"
            alt=""
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png"
            alt=""
          />
        </div>
      </div>

      {/* slider */}
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard item={card} key={card.id} />
        ))}
      </Slide>

      {/* features */}
      <div className="features">
        <div className="container">
          <div className="left">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="img/check.png" alt="" />
              <span>The best for every budget</span>
            </div>
            <p>
              Find high quality services at every price point, No hourly rates,
              just project-based pricing
            </p>
            <div className="title">
              <img src="img/check.png" alt="" />
              <span>The best for every budget</span>
            </div>
            <p>
              Find high quality services at every price point, No hourly rates,
              just project-based pricing
            </p>
            <div className="title">
              <img src="img/check.png" alt="" />
              <span>The best for every budget</span>
            </div>
            <p>
              Find high quality services at every price point, No hourly rates,
              just project-based pricing
            </p>
            <div className="title">
              <img src="img/check.png" alt="" />
              <span>The best for every budget</span>
            </div>
            <p>
              Find high quality services at every price point, No hourly rates,
              just project-based pricing
            </p>
          </div>
          <div className="right">
            <video src="img/video.mp4" controls></video>
          </div>
        </div>
      </div>

      {/* banner */}
      <div className="features darkBlue">
        <div className="container">
          <div className="left">
            <h1>
              fiverr <i>business</i>
            </h1>
            <h1>
              A business solution designes for <i>teams</i>
            </h1>

            <p>
              Upgrade to a curated experience packed with tools and benifits,
              dedicated to businesses
            </p>

            <div className="title">
              <img src="img/check.png" alt="" />
              <p>Connect to freelancers with proven business experience</p>
            </div>
            <div className="title">
              <img src="img/check.png" alt="" />
              <p>
                Get matched with the perfect talent with customer success
                manager
              </p>
            </div>
            <div className="title">
              <img src="img/check.png" alt="" />
              <p>
                Manage teamwork and boost productivity with one powerful
                workspace
              </p>
            </div>

            <button>Explore Fiverr Business</button>
          </div>
          <div className="right">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* slider */}
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((project) => (
          <ProjectCard item={project} key={project.id} />
        ))}
      </Slide>
    </div>
  );
};

export default Home;
