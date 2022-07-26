package com.c203.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class RoomDto {
    private int host;
    private String name;
    private LocalDateTime date;
    private LocalDateTime open_date;
    private String link;
}
