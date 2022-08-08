package com.c203.api.service;

import com.c203.api.dto.Feed.FeedRegistDto;
import com.c203.api.dto.Feed.FeedShowDto;

public interface FeedService {
    FeedShowDto registFeed(FeedRegistDto feedRegistDto) throws Exception;
    boolean deleteFeed(String email,String roomIdx) throws Exception;
}
