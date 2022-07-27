import React from "react";
import styles from "./Feed.module.css";

function Feed({ feed_idx, feed_user, feed_description, feed_picture }) {
  return (
    <div className={styles.feeds}>
      <br />
      <img src={feed_picture} alt={feed_idx} />
      <br />
      <div className={styles.comment}>
        <div>feed_idx - {feed_idx}</div>
        <div>{feed_user}</div>
        <div>{feed_description}</div>
      </div>
      <br />
    </div>
  );
}

export default Feed;
