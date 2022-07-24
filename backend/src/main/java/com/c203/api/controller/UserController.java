package com.c203.api.controller;

import com.c203.api.dto.UserInfoDto;
import com.c203.api.dto.UserLoginDto;
import com.c203.api.service.JwtService;
import com.c203.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")

public class UserController
{


    private final UserService userService;
    private final JwtService jwtService;
    @Autowired
    UserController(UserService userService,JwtService jwtService){
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginDto userLoginDto){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;

        try{
            boolean is = userService.loginUser(userLoginDto);
            result.put("result",is);
            status = HttpStatus.OK;
            // 로그인 성공했을때 - 엑세스토큰 만들기
            if(is){
                String accessToken = jwtService.createAccessToken("id",userLoginDto.getId());
                String refreshToken = jwtService.createRefreshToken("id",userLoginDto.getId());
                result.put("accessToken",accessToken);
                result.put("refreshToken",refreshToken);
            }
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }

    @GetMapping("/auth/login")
    public ResponseEntity<?> infoUser(HttpServletRequest request){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;

        try{
            // postman에서header에 accessToken을 담았죠
            // request - front에서 받은 거 다 들어와있죠
            // getHeader - header에 담아 있는거 가져오죠
            String accessToken = request.getHeader("accessToken");
            // decode
            String decodeId = jwtService.decodeToken(accessToken);
            // accessToken이 만료되면 - timeout
            if(!decodeId.equals("timeout")){
                UserInfoDto userInfoDto = userService.infoUser(decodeId);
                // front로 던져줌
                result.put("result",userInfoDto);
                status = HttpStatus.OK;
            }
            else{
                result.put("result","accessToken 타임아웃");
                // 인증만료
                status = HttpStatus.UNAUTHORIZED;
            }
//            boolean is = userService.loginUser(userLoginDto);
//            result.put("result",is);
//            status = HttpStatus.OK;

        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
}
