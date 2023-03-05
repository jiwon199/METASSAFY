package com.ssafy.metassafy.controller.test;

import com.ssafy.metassafy.service.test.testService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
컨트롤러~서비스 폴더 내에서 기능별로 폴더를 나누는 방식으로 진행.
testㅁㅁㅁ들은 패키지 구조를 만들고 동작 여부를 확인하기 위해 develop_back에 생성함.
추후 삭제 예정
*/
@RestController
@RequestMapping("/test")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class testController {
    @Autowired
    testService service;

    //테스트용- db에 저장된 user의 수를 반환하는 api
    @GetMapping("userCount")
    public String getUserCount()   {
        return service.getUserCount();
    }
    @GetMapping("hello")
    public String Hello(){
        return "hello";
    }

    @GetMapping("hi")
    public String Hi(){
        return "hi";
    }


}

