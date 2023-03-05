package com.ssafy.metassafy.service.test;

import com.ssafy.metassafy.mapper.test.testMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class testService {

    @Autowired
    testMapper mapper;
    public String getUserCount() {
        return "회원 수:"+mapper.getUserCount();
    }
}
