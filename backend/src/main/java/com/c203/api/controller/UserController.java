package com.c203.api.controller;

import com.c203.api.dto.MailSendDto;
import com.c203.api.dto.UserInfoDto;
import com.c203.api.dto.UserLoginDto;
import com.c203.api.dto.UserRegistDto;
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
//            boolean is = userService.loginUser(userLoginDto);
//            result.put("result",is);
//            status = HttpStatus.OK;

        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
    // 이메일 인증 controller
    //Email과 name의 일치여부를 check하는 컨트롤러
//    @GetMapping("/users/find")
//    public ResponseEntity<?> findUser(HttpServletRequest request){
//        Map<String,Object> result = new HashMap<>();
//        HttpStatus status;
//        try {
//            String accessToken = request.getHeader("accessToken");
//            String decodeId = jwtService.decodeToken(accessToken);
//            if(!decodeId.equals("timeout")){
//                UserInfoDto userInfoDto = userService.infoUser(decodeId);
//                result.put("result",userInfoDto);
//                status = HttpStatus.OK;
//            }
//            else{
//                result.put("result","accessToken 타임아웃");
//                // 인증만료
//                status = HttpStatus.UNAUTHORIZED;
//            }
//            status = HttpStatus.OK;
//        }catch (Exception e){
//            result.put("result","서버에러");
//            status = HttpStatus.INTERNAL_SERVER_ERROR;
//        }
//        return new ResponseEntity<>(result,status);
//    }
//
////    public @ResponseBody Map<String, Boolean> pw_find(String userEmail, String userName){
////        Map<String,Boolean> json = new HashMap<>();
////        boolean pwFindCheck = userService.userEmailCheck(userEmail,userName);
////
////        System.out.println(pwFindCheck);
////        json.put("check", pwFindCheck);
////        return json;
////    }
//
//    //등록된 이메일로 임시비밀번호를 발송하고 발송된 임시비밀번호로 사용자의 pw를 변경하는 컨트롤러
//    @PostMapping("/users/findPw/sendEmail")
//    public @ResponseBody void sendEmail(String userEmail, String userName){
//        MailDto mailDto = sendEmailService.createMailAndChangePassword(userEmail, userName);
//        sendEmailService.mailSend(dto);
//
//    }
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
                result.put("result","fail");
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
}
