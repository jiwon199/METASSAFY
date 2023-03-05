package com.ssafy.metassafy.dto.memo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.autoconfigure.domain.EntityScan;

//댓글들 (작성자이름, 날짜, 내용, 내가좋아요, 좋아요수)
@Getter
@Setter
@ToString
@EntityScan
public class MemoDto {
    private int memo_no;
    private int article_no;
    private String user_id;
    private String content;
    private int memo_like;
    private int my_like;
    private String regtime;
    private String name;
    private String profile_img;
}
