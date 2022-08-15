package com.c203.db.Repository;

import com.c203.db.Entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Integer> {
    Feed findByFeedRoomIdxAndFeedPictureAndFeedUser(int roomIdx,Byte[] picture,String email);
    List<Feed> findByFeedRoomIdxAndFeedUser(int roomIdx, String email);
    void deleteByFeedRoomIdxAndFeedUser(int roomIdx, String email);
}
