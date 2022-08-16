package com.c203.api.dto.Feed;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FeedRegistDto {
    private String roomIdx;
    private String email;
    private String description;
    // 첫번째 사진을 대표 사진
    private String picture;
}
