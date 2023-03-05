package com.ssafy.metassafy.dto.user;

import lombok.*;

import java.sql.Timestamp;
import java.util.Date;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "User : 유저 정보", description = "유저 정보")
public class User {
    @ApiModelProperty(value = "유저 아이디")
    String user_id; //pk
    @ApiModelProperty(value = "유저 비밀번호")
    String user_pwd;
    @ApiModelProperty(value = "유저 학생번호")
    String student_no;
    @ApiModelProperty(value = "유저 이름")
    String name;
    @ApiModelProperty(value = "유저 지역")
    String area;
    @ApiModelProperty(value = "유저 이메일")
    String email;

    @ApiModelProperty(value = "유저 성별 프론트")
    String genderF; //w 혹은 m
    @ApiModelProperty(value = "유저 성별")
    char gender; //w 혹은 m
    @ApiModelProperty(value = "유저 생일")
    String birthday;
    @ApiModelProperty(value = "유저 나이")
    int age;
    @ApiModelProperty(value = "유저 관심직무")
    String interest; //관심 직무(백,프론트,미정 등등)
    @ApiModelProperty(value = "유저 가입시간")
    String regtime; //가입 시간
    @ApiModelProperty(value = "유저 프로필 이미지")
    String profile_img; //프로필 이미지 url
    @ApiModelProperty(value = "유저 자기소개")
    String profile_txt; //자기소개 멘트
    @ApiModelProperty(value = "유저 1학기 트랙")
    String first_semester; //자바트랙, 파이썬 트랙..
    @ApiModelProperty(value = "유저 공통 트랙")
    String common;
    @ApiModelProperty(value = "유저 특화 트랙")
    String special;
    @ApiModelProperty(value = "유저 자유 트랙")
    String free;
    @ApiModelProperty(value = "유저 1학기 반")
    int first_semester_class; //1학기 몇반이었는지
    @ApiModelProperty(value = "유저 공통 반")
    int common_class; //공통 구미 1반, 2반...
    @ApiModelProperty(value = "유저 특화 반")
    int special_class; //특화 구미 1반, 2반...
    @ApiModelProperty(value = "유저 자유 반")
    int free_class; //자율 구미1반, 2반...
    @ApiModelProperty(value = "유저 x좌표")
    float x; //맵 상에서 마지막 위치
    @ApiModelProperty(value = "유저 y좌표")
    float y; //맵 상에서 마지막 위치
    @ApiModelProperty(value = "유저 z좌표")
    float z; //맵 상에서 마지막 위치
    @ApiModelProperty(value = "유저 공통 팀")
    int common_team; //공통 구미 1반 1조,2조..
    @ApiModelProperty(value = "유저 특화 팀")
    int special_team; //특화 ~~
    @ApiModelProperty(value = "유저 자유 팀")
    int free_team; //자율 ~~
    @ApiModelProperty(value = "유저 현재 직무")
    String current_role; //현재 팀내에서 맡은 직무

    @ApiModelProperty(value = "기수")
    int generation;
    @ApiModelProperty(value = "전공")
    String major;

    @ApiModelProperty(value = "공식 공통 조")
    String common_jo;
    @ApiModelProperty(value = "공식 특화 조")
    String special_jo;
    @ApiModelProperty(value = "공식 자율 조")
    String free_jo;
}