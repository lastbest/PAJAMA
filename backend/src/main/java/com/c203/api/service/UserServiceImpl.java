package com.c203.api.service;

import com.c203.api.dto.UserInfoDto;
import com.c203.api.dto.UserLoginDto;
import com.c203.api.dto.UserModifyUser;
import com.c203.api.dto.UserRegistDto;
import com.c203.db.Entity.User;
import com.c203.db.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service

public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public boolean loginUser(UserLoginDto userLoginDto) {
        Optional<User> res = userRepository.findByUserEmailAndUserPwd(userLoginDto.getEmail(), userLoginDto.getPwd());
        
        if(res.isPresent()){
            return true;
        }else{
             return false;
        }
    }

    @Override
    public UserInfoDto infoUser(String email) {
        Optional<User> res = userRepository.findByUserEmail(email);
        if(res.isPresent()){
            // 리턴 타입 dto니까
            UserInfoDto userInfoDto = new UserInfoDto();
            // 값이 비어있겠죠
            userInfoDto.setNickname(res.get().getUser_nickname());
            return userInfoDto;
        }
        else return null;
    }

    // 이메일 보낼때 user가 맞는지 확인하려고
    @Override
    public boolean findUser(String email, String name) {
        return false;
    }

    @Override
    public boolean registUser(UserRegistDto userRegistDto) {
        Optional<User> userInfo = userRepository.findByUserEmail(userRegistDto.getEmail());
        if(!userInfo.isPresent()){
            User user = new User();
            user.setUserEmail(userRegistDto.getEmail());
            user.setUser_nickname(userRegistDto.getNickname());
            user.setUserPwd(userRegistDto.getPwd());
            user.setUserName(userRegistDto.getName());
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public boolean modifyUser(UserModifyUser userModifyUser) { //id pwd nickname
        User user = userRepository.findByUserEmail(userModifyUser.getEmail()).get();
        user.setUserPwd(userModifyUser.getPwd());
        user.setUser_nickname(userModifyUser.getNickname());

        userRepository.save(user);
        return true;
    }

    @Override
    @Transactional
    public boolean deleteUser(String decodeEmail) {
        userRepository.deleteByUserEmail(decodeEmail);
        return true;
    }
}
