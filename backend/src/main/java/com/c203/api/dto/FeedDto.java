package com.c203.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FeedDto {
    private int idx;
    private int user;
    private String description;
    private Byte[] picture;
}
