package com.c203.api.dto.Letter;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LetterDto {
    private int to;
    private int from;
    private int room;
    private String title;
    private String content;
}
