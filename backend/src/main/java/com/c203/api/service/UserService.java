package com.c203.api.service;

import com.c203.api.dto.UserInfoDto;
import com.c203.api.dto.UserLoginDto;
import com.c203.api.dto.UserModifyUser;
import com.c203.api.dto.UserRegistDto;

public interface UserService {
    boolean loginUser(UserLoginDto userLoginDto);
    UserInfoDto infoUser(String email);
    boolean findUser(String email,String name);
    boolean registUser(UserRegistDto userRegistDto);

    boolean modifyUser(UserModifyUser userModifyUser);

    boolean deleteUser(String decodeEmail);
}
