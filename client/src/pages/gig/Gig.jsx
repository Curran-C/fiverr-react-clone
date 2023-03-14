import axios from "axios";
import Slider from "infinite-react-carousel";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "../../components/Reviews/Reviews";
import "./Gig.scss";

const Gig = () => {
  //hooks
  const { id } = useParams();
  const [gig, setGig] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getGig = async () => {
      try {
        const gig = await axios
          .get(`http://localhost:8800/api/gig/single/${id}`)
          .then(setIsLoading(false));
        const user = await axios.get(
          `http://localhost:8800/api/users/${gig.data.userId}`
        );
        setGig(gig.data);
        setUser(user.data);
        console.log(gig.data);
        console.log(user.data);
      } catch (err) {
        console.log(err);
      }
    };
    getGig();
  }, []);

  return (
    <>
      {isLoading ? (
        "loading"
      ) : (
        <div className="gig">
          <div className="container">
            {/* left */}
            <div className="left">
              <span className="breadCrumbs">
                FIVERR {">"} GRAPHICS {">"} DESIGN
              </span>
              <h1>{gig.title}</h1>
              <div className="user">
                <img className="pp" src={user.img} alt="" />
                <span>{user.username}</span>
                <div className="stars">
                  <img src="/img/star.png" alt="" />
                  <span>{Math.round(gig.totalStars / gig.starNumber)}</span>
                </div>
              </div>
              {gig.images && (
                <Slider slidesToShow={1} arrowsScroll={1} className="slider">
                  {gig.images?.map((img, i) => (
                    <img src={img} key={i} alt="" />
                  ))}
                </Slider>
              )}
              <h2>About this gig</h2>
              <p>{gig.desc}</p>
              {/* seller info */}
              <div className="seller">
                <h2>About the seller</h2>
                <div className="user">
                  <img src={user.img} alt="" />
                  <div className="info">
                    <span>{user.username}</span>
                    <div className="stars">
                      <img src="/img/star.png" alt="" />
                      <span>{Math.round(gig.totalStars / gig.starNumber)}</span>
                    </div>
                    <button>Contact Me</button>
                  </div>
                </div>

                {/* box */}
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{user.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">{user.createdAt}</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{user.desc}</p>
                </div>
              </div>
              {/* reviews */}
              <Reviews gigId={id} />
            </div>
            {/* right */}
            <div className="right">
              <div className="container">
                <div className="row">
                  <h2>{gig.shortTitle}</h2>
                  <span className="price">${gig.price}</span>
                </div>
                <p>{gig.shortDesc}</p>
                <div className="row">
                  <div className="time">
                    <img src="/img/clock.png" alt="" />
                    <span>{gig.deliveryTime} Days Delivery</span>
                  </div>
                  <div className="time">
                    <img src="/img/recycle.png" alt="" />
                    <span>{gig.revisionNumber} Revisions</span>
                  </div>
                </div>
                <div className="checks">
                  {gig.features?.map((feature) => (
                    <div key={feature} className="check">
                      <img src="/img/greencheck.png" alt="" />
                      <p>{feature}</p>
                      {console.log(typeof feature)}
                    </div>
                  ))}
                </div>
                <button>Continue</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gig;
