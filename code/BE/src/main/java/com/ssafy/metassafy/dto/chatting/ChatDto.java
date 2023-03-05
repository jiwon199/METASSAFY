package com.ssafy.metassafy.dto.chatting;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@Getter
@Setter
@ToString
@EntityScan
public class ChatDto {
    private int chat_no;
    private int croom_no;
    private String user_id;
    private String name;
    private String message;
    private int not_read;
    private int last_read_chat_id;
    private String profile_img;
    private String regtime;

}
