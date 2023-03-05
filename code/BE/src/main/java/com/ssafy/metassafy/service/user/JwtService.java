package com.ssafy.metassafy.service.user;

import com.ssafy.metassafy.dto.user.JwtInfoDto;
import com.ssafy.metassafy.dto.user.User;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component
public class JwtService {
    private String secretKey = "myKey"; // 서명에 사용할 secretKey
    private long exp = 1000L * 60 * 60 * 24; // 토큰 사용가능 시간, 1시간(1분*60)*24


    // 토큰 생성하는 메서드
    public String createToken(JwtInfoDto user,String tokenName) { // 토큰에 담고싶은 값 파라미터로 가져오기
        if(tokenName.equals("access")){
            return Jwts.builder()
                    .setHeaderParam("typ", "JWT") // 토큰 타입
                    .setSubject(tokenName) // 토큰 제목
                    .setExpiration(new Date(System.currentTimeMillis() + exp)) // 토큰 유효시간
                    .claim("user", user) // 토큰에 담을 데이터
                    .signWith(SignatureAlgorithm.HS256, secretKey.getBytes()) // secretKey를 사용하여 해싱 암호화 알고리즘 처리
                    .compact(); // 직렬화, 문자열로 변경
        }
        //refresh면 유효기간 없이
        return Jwts.builder()
                .setHeaderParam("typ", "JWT") // 토큰 타입
                .setSubject(tokenName) // 토큰 제목
                .claim("user", user) // 토큰에 담을 데이터
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes()) // secretKey를 사용하여 해싱 암호화 알고리즘 처리
                .compact(); // 직렬화, 문자열로 변경


    }

    // 토큰에 담긴 정보를 가져오기 메서드
    public Map<String, Object> getInfo(String token) throws Exception {
        Jws<Claims> claims = null;
        try {
            claims = Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(token); // secretKey를 사용하여 복호화
        } catch(Exception e) {
            throw new Exception();
        }

        return claims.getBody();
    }

    // interceptor에서 토큰 유효성을 검증하기 위한 메서드
    public boolean checkValid(String token) {
        try{
            Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(token);
        }catch (ExpiredJwtException e){
            return false;
        }
        return true;

    }




}
