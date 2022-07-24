package com.c203.api.service;

import com.c203.api.dto.UserInfoDto;
import com.c203.api.dto.UserLoginDto;

public interface UserService {
    boolean loginUser(UserLoginDto userLoginDto);
    UserInfoDto infoUser(String id);
}
