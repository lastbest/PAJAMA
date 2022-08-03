package com.c203.api.controller;

import com.c203.api.dto.Room.RoomCreateDto;
import com.c203.api.dto.Room.RoomDecoDto;
import com.c203.api.dto.User.UserShowDto;
import com.c203.api.service.JwtService;
import com.c203.api.service.RoomService;
import com.c203.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class RoomController {
    private final JwtService jwtService;
    private final UserService userService;
    private final RoomService roomService;
    @Autowired
    RoomController(UserService userService, JwtService jwtService,RoomService roomService){
        this.userService = userService;
        this.jwtService = jwtService;
        this.roomService = roomService;
    }
    // 파티룸 생성하기
    @PostMapping("/rooms")
    public ResponseEntity<?> createRoom(@RequestBody RoomCreateDto roomCreateDto,HttpServletRequest request){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;
        try{
            String accessToken = request.getHeader("accessToken");
            String decodeEmail = jwtService.decodeToken(accessToken);
            // 현재 이 방을 만들고자 하는 사람이 host가 되겠지
            if(!decodeEmail.equals("timeout")){
                roomCreateDto.setPartyHost(decodeEmail);
                RoomDecoDto roomDecoDto = roomService.createRoom(roomCreateDto);
                result.put("result",roomDecoDto);
            }
            status = HttpStatus.OK;
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
    // 파티룸 정보 수정하기

    // 파티룸 삭제하기
}
