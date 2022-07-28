package com.c203.api.service;

import com.c203.api.dto.*;
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

    // 로그인 후 정보 보여주기
    @Override
    public UserInfoDto infoUser(String email) {
        Optional<User> res = userRepository.findByUserEmail(email);
        if(res.isPresent()){
            // 리턴 타입 dto니까
            UserInfoDto userInfoDto = new UserInfoDto();
            // 값이 비어있겠죠
            userInfoDto.setNickname(res.get().getUserNickname());
            return userInfoDto;
        }
        else return null;
    }

    // 이메일 보낼때 user가 맞는지 확인하려고
    @Override
    public boolean findUser(String email, String name) {
        return false;
    }

    // 회원 가입
    @Override
    public boolean registUser(UserRegistDto userRegistDto) {
        Optional<User> userInfo = userRepository.findByUserEmail(userRegistDto.getEmail());
        if(!userInfo.isPresent()){
            User user = new User();
            user.setUserEmail(userRegistDto.getEmail());
            user.setUserNickname(userRegistDto.getNickname());
            user.setUserPwd(userRegistDto.getPwd());
            user.setUserName(userRegistDto.getName());
            user.setUserTel(userRegistDto.getTel());
            userRepository.save(user);
            return true;
        }
        return false;
    }

    // 회원 정보 수정
    @Override
    public boolean modifyUser(UserModifyDto userModifyDto) { // id pwd nickname
        User user = userRepository.findByUserEmail(userModifyDto.getEmail()).get(); // 정확히 동일한 엔티티, 값만 받아오는게 아니라 그 대상을 가지고 있는거
        user.setUserPwd(userModifyDto.getPwd());
        user.setUserNickname(userModifyDto.getNickname());

        userRepository.save(user);
        return true;
    }

    // 회원 탈퇴
    @Override
    @Transactional
    public boolean deleteUser(String decodeEmail) {
        userRepository.deleteByUserEmail(decodeEmail);
        return true;
    }

    // 전체 정보 보여주기
    @Override
    public UserShowDto showUser(String email) {
        Optional<User> res = userRepository.findByUserEmail(email);
        if(res.isPresent()){
            UserShowDto userShowDto = new UserShowDto();
            userShowDto.setName(res.get().getUserName());
            userShowDto.setEmail(res.get().getUserEmail());
            userShowDto.setNickname(res.get().getUserNickname());
            userShowDto.setTel(res.get().getUserTel());
            return userShowDto;
        }
        else return null;
    }
}
