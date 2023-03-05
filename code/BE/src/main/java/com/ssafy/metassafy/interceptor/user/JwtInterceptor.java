package com.ssafy.metassafy.interceptor.user;

import com.ssafy.metassafy.service.user.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JwtInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        if(request.getMethod().equals("OPTIONS")) { // preflight로 넘어온 options는 통과
            return true;
        } else {
            String token = request.getHeader("jwt-auth-token"); // client에서 요청할 때 header에 넣어둔 "jwt-auth-token"이라는 키 값을 확인
            if(token != null && token.length() > 0) {
                if(!jwtService.checkValid(token))  {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인하거나 토큰을 갱신 api 호출하세요.");
                    //throw new Exception("토큰이 만료되었습니다. 다시 로그인하거나 토큰을 갱신 api 호출하세요.");
                }

                return true;
            } else {
                // 유효한 인증토큰이 아닐 경우
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "유효한 인증토큰이 존재하지 않습니다.");
                //throw new Exception("유효한 인증토큰이 존재하지 않습니다.");
            }
            return true;
        }
    }
}