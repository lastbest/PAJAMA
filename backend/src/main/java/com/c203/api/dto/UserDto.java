package com.c203.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private String id;
    private String name;
    private String pwd;
    private String email;
    private String nickname;
    private Date birthday;
}
