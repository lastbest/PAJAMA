package com.c203.api.dto.Participant;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ParticipantRegistDto {
    private String room; // room 안호화된 번호
    private String user; // user email
}
