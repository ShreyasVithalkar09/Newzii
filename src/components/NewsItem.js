import React from "react";

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <>
        <div className="card mb-3" style={{ minWidth: "16rem" }}>
          <img
            src={imageUrl}
            className="card-img-top"
            alt="news"
          />
          <div className="card-body">
            <h5 className="card-title fw-bold">{title}...</h5>
            <span className="badge bg-info text-dark mb-2">{source}</span>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author? author : "Unknown"} on {new Date(date).toGMTString() }</small></p>
            <a href={newsUrl} className="btn btn-outline-info btn-sm">
              Read more
            </a>
          </div>
        </div>
      </>
    );
  
}

export default NewsItem;
