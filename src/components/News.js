import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import Categories from "./Categories";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  


  const  updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let response = await fetch(url);
    props.setProgress(60);
    let data = await response.json();
    setArticles(data.articles);
    setTotalResults(data.totalResults);
    setLoading(false);
    // console.log(data);
    props.setProgress(100);

  }

  useEffect(() => {
      updateNews();
  }, [])

  // async componentDidMount() {
  //  updateNews()
  // }

  // const handlePrevClick = async () => {
  //   setPage(page - 1)
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  //   setPage(page + 1)
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    setPage(page + 1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setArticles(articles.concat(data.articles));
    setTotalResults(data.totalResults);
    setLoading(false);
  };


  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  }

    return (
      <>
        <h1 className="fw-bold text-center my-4 mx-2">{`Newzii - Top ${capitalize(props.category)} Headlines`}</h1>
        <Categories />
        {loading && <Spinner />}
        <div className="container mt-3 mb-4">
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={loading && <Spinner />}
          >
            <div className="container">
              <div className="row">
                {articles.map((element) => {
                  return (
                    <div className="col col-lg-4" key={element.url}>
                      {
                        <NewsItem
                          title={
                            element.title ? element.title.slice(0, 40) : ""
                          }
                          description={
                            element.description
                              ? element.description.slice(0, 85)
                              : ""
                          }
                          imageUrl={
                            element.urlToImage
                              ? element.urlToImage
                              : "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
                          }
                          newsUrl={element.url}
                          author={element.author}
                          date={element.publishedAt}
                          source={element.source.name}
                        />
                      }
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </>
    );

}

News.defaultProps = {
  pageSize: 6,
  country: "in",
  category: "general",
};

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
