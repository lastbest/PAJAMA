package com.c203.api.controller;

import com.c203.api.dto.Feed.FeedRegistDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class FeedController {

    // 피드 생성
    @PostMapping("/mypage")
    public ResponseEntity<?> registFeed(@RequestBody FeedRegistDto feedRegistDto){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;
        try{

            result.put("result","success");
            status = HttpStatus.OK;
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
}