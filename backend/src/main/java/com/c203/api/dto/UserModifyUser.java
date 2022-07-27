package com.c203.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserModifyUser {
    private String email;
    private String nickname;
    private String pwd;

}
