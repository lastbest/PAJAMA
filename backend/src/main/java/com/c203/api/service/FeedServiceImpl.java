package com.c203.api.service;

import com.c203.api.dto.Feed.FeedRegistDto;
import com.c203.api.dto.Feed.FeedShowDto;
import com.c203.db.Entity.Feed;
import com.c203.db.Repository.FeedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class FeedServiceImpl implements FeedService {
    @Autowired
    private EncryptionService encryptionService;
    @Autowired
    private FeedRepository feedRepository;
    // 피드 대표 값이 있으면 기존 값을 지우고 입력 받은 값으로 설정하기
    @Override
    public FeedShowDto registFeed(FeedRegistDto feedRegistDto) throws Exception {
        String temp = encryptionService.decrypt(feedRegistDto.getRoomIdx());
        int id = Integer.parseInt(temp); // room_idx
        // 방번호, 사진, 사용자가 같은 feed를 가져오기 - present를 true로 만들기
        Feed feed = feedRepository.findByFeedRoomIdxAndFeedPictureAndFeedUser(id, feedRegistDto.getPicture(), feedRegistDto.getEmail());
        List<Feed> list = feedRepository.findByFeedRoomIdxAndFeedUser(id, feedRegistDto.getEmail());
        int size = list.size();
        for (int i=0;i<size;i++){
            Feed feedtemp = list.get(i);
            if(feedtemp.getFeedRepresent()){ // 대표 사진이 있는 경우
                feedtemp.setFeedRepresent(false);
                feedtemp.setFeed_description("");
            }
        }
        feed.setFeedRepresent(true);
        feed.setFeed_description(feedRegistDto.getDescription());
        feedRepository.save(feed);
        FeedShowDto feedShowDto = new FeedShowDto();
        feedShowDto.setTime(feed.getFeed_time());
        feedShowDto.setDescription(feed.getFeed_description());
        feedShowDto.setPicture(feed.getFeedPicture());
        return feedShowDto;
    }

    // 피드 삭제
    @Override
    @Transactional
    public boolean deleteFeed(String email, String roomIdx) throws Exception {
        String temp = encryptionService.decrypt(roomIdx);
        int id = Integer.parseInt(temp); // room_idx
        feedRepository.deleteByFeedRoomIdxAndFeedUser(id,email);
        return true;
    }
}