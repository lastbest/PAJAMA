package com.c203.api.service;

import com.c203.api.dto.UserInfoDto;
import com.c203.api.dto.UserLoginDto;
import com.c203.db.Entity.User;
import com.c203.db.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public boolean loginUser(UserLoginDto userLoginDto) {
        Optional<User> res = userRepository.findByUserIdAndUserPwd(userLoginDto.getId(), userLoginDto.getPwd());
        if(res.isPresent()){
            return true;
        }
        else return false;
    }

    @Override
    public UserInfoDto infoUser(String id) {
        Optional<User> res = userRepository.findByUserId(id);
        if(res.isPresent()){
            // 리턴 타입 dto니까
            UserInfoDto userInfoDto = new UserInfoDto();
            // 값이 비어있겠죠
            userInfoDto.setNickname(res.get().getUser_nickname());
            userInfoDto.setBirthday(res.get().getUser_birthday());
            return userInfoDto;
        }
        else return null;
    }
}
