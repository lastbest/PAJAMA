package com.c203.api.service;

import com.c203.api.dto.UserLoginDto;

public interface UserService {
    boolean loginUser(UserLoginDto userLoginDto);

}
