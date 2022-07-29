package com.c203.api.dto.Room;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class RoomCreateDto {
    private String partyHost; // 호스트 이름
    private String partyName; // 파티 이름
    private String partyDesc;
    private Date partyDate;
    private String partyBg;
    private String partyCake;
    private String partyCandle;
}
