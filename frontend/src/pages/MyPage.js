import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Feed from "../components/common/Feed";
import styles from "./MyPage.module.css";

function MyPage() {
  const [loading, setLoading] = useState(true);
  const [feeds, setFeeds] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.jsonminimum_rating=8.5&sort_by=year`
      )
    ).json();
    setFeeds(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  var hasFeed = Object.keys(feeds).length > 0;

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.header}>
          <span className={styles.userName}>SSAFY님의 Party</span>
          <Link className={styles.link} to="/">
            피드 추가하기
          </Link>
          <span> {"  "}</span>
          <Link className={styles.link} to="/">
            회원정보수정
          </Link>
        </div>
      </header>
      <div className={styles.feedContainer}>
        {loading ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <div className={styles.feeds}>
            {feeds.map((movie) => (
              <Feed
                key={movie.id}
                feed_idx={movie.id}
                feed_user={movie.title}
                feed_description="test_desc"
                feed_picture={movie.medium_cover_image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPage;
