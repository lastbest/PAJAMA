package com.c203.api.controller;

import com.c203.api.dto.*;
import com.c203.api.service.JwtService;
import com.c203.api.service.MailService;
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
    private final MailService mailService;
    private final JwtService jwtService;
    @Autowired
    UserController(UserService userService,JwtService jwtService,MailService mailService){
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
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
                String accessToken = jwtService.createAccessToken("id",userLoginDto.getEmail());
                String refreshToken = jwtService.createRefreshToken("id",userLoginDto.getEmail());
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
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
    @PostMapping("/users")
    public ResponseEntity<?> registUser(@RequestBody UserRegistDto userRegistDto){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;
        try{
            boolean is = userService.registUser(userRegistDto);
            if(is){
                result.put("result","success");
            }
            else{
                result.put("result","이미 존재하는 이메일");
            }
            status = HttpStatus.OK;
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
    @PostMapping("/users/mail")
    public ResponseEntity<?> mailSend(@RequestBody MailSendDto mailSendDto){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;
        try{
            mailService.mailSend(mailSendDto);
            result.put("result","success");
            status = HttpStatus.OK;
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
    @GetMapping("/users/mail")
    public ResponseEntity<?> mailCheck(@RequestParam("authNumber")String authNumber, @RequestParam("email")String email){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;
        try{
            if(mailService.mailCheck(authNumber, email)){ //boolean true라면 인증 됨.
                result.put("result","success");
            }else{
                result.put("result","fail");
            }
            status = HttpStatus.OK;
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }

    @PutMapping("/users")
    public ResponseEntity<?> modifyUser(@RequestBody UserModifyDto userModifyDto, HttpServletRequest request){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;
        String accessToken = request.getHeader("accessToken");
        String decodeEmail = jwtService.decodeToken(accessToken);
        try{
            userModifyDto.setEmail(decodeEmail);
            userService.modifyUser(userModifyDto);
            result.put("result","success");
            status = HttpStatus.OK;
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }

    @DeleteMapping("/users")
    public ResponseEntity<?> deleteUser(HttpServletRequest request ){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;
        String accessToken = request.getHeader("accessToken");
        String decodeEmail = jwtService.decodeToken(accessToken);
        try{
            userService.deleteUser(decodeEmail);
            result.put("result","success");
            status = HttpStatus.OK;
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
}
