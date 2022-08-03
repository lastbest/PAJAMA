import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/nav/NavBar";
import Feed from "../components/common/Feed";
import styles from "./MyPage.module.css";
import Button from "../components/common/Button";
import axios from "axios";

function MyPage() {
  let token = sessionStorage.getItem("accessToken");
  let [nickname, setNickname] = useState("");
  useEffect(() => {
    axios({
      url: "http://localhost:8080/users/me",
      method: "get",
      headers: { accessToken: token },
    })
      .then((res) => {
        setNickname(res.data.result.nickname);
      })
      .catch(() => {
        alert("불러오기 실패");
        navigate("/login");
      });
  }, []);

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
  const navigate = useNavigate();
  function moveUpdate() {
    navigate("/mypage/update");
  }
  return (
    <div className={styles.container}>
      <NavBar></NavBar>
      <header>
        <div className={styles.header}>
          <span className={styles.userName}>${nickname}의 Party</span>
          <Button className={styles.link} onClick={moveUpdate}>
            회원정보수정
          </Button>
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
