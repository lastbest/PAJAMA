package com.c203.api.dto.Room;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RoomDecoDto {
    private String roomId; // 암호화된 룸 번호
    private int bg;
    private int candle;
    private int object;
}
