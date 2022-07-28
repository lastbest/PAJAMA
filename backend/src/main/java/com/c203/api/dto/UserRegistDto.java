package com.c203.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRegistDto {
    private String email;
    private String name;
    private String pwd;
    private String nickname;
}
