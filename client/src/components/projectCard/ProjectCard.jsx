import React from "react";
import { Link } from "react-router-dom";

import "./ProjectCard.scss";
const ProjectCard = ({ item }) => {
  console.log(item);
  return (
    <Link to="/" className="link">
      <div className="projectCard">
        <img src={item.img} alt="" />
        <div className="info">
          <img src={item.pp} alt="" />
          <div className="infoText">
            <h1>{item.username}</h1>
            <p>{item.cat}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
