import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Categories = () => {
  const categories = [
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];
  

    return (<div className="container d-flex justify-content-around flex-wrap my-3 sticky-top " style={{backgroundColor: "#fff"}}>
        {
            categories.map((category) => (
              <Link key={category} to={`/${category}`} > <button className="btn btn-outline-dark text-capitalize my-3">
            {category}
        </button></Link>
            ))
        }
    </div>);
  
}

export default Categories;
