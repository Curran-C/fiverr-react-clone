import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

//componenets
import GigCard from "../../components/gigCard/GigCard";

//data
// import { gigs } from "../../data";

//css
import "./Gigs.scss";

const Gigs = () => {
  //hook variables
  const [menu, setMenu] = useState("Date");
  const [gigs, setGigs] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Price");
  const [viewMenu, setViewMenu] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const location = useLocation();

  //hooks
  useEffect(() => {
    const getGigs = async () => {
      const min = minRef.current.value;
      const max = maxRef.current.value;
      const sort = selectedMenuItem === "Date" ? "createdAt" : "price";
      const search = location.search.slice(1, -1);
      try {
        const res = await axios.get(
          `http://localhost:8800/api/gig/gigs?${search}&min=${min}&max=${max}&sort=${sort}`
        );
        res.data && setGigs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getGigs();
  }, [min, max, selectedMenuItem]);

  //functions
  const handleSort = (e) => {
    setMenu(selectedMenuItem);
    setSelectedMenuItem(e);
    setViewMenu(false);
  };

  const handleViewMenu = () => {
    setViewMenu(!viewMenu);
  };

  const handleMinMax = async (e) => {
    e.preventDefault();
    setMin(minRef.current.value);
    setMax(maxRef.current.value);
  };
  //return
  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">
          {" "}
          FIVERR {">"} GRAPHICS & DESIGNS {">"}
        </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr{`'`}s AI
          artists
        </p>

        <div className="menu">
          <form onSubmit={handleMinMax} className="left">
            <span>Budget:</span>
            <input type="text" placeholder="min" ref={minRef} />
            <input type="text" placeholder="max" ref={maxRef} />
            <button>Apply</button>
          </form>

          <div className="right">
            <span className="sortBy">Sort By:</span>
            <span className="sortType">{selectedMenuItem}</span>
            <img src="img/down.png" alt="" onClick={handleViewMenu} />
            {viewMenu && (
              <div className="menu">
                <span onClick={(e) => handleSort(e.target.innerHTML)}>
                  {menu}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {gigs?.map((gig) => (
            <GigCard item={gig} key={gig._id} page={gig._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
