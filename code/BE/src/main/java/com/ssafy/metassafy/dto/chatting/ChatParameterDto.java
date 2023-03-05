package com.ssafy.metassafy.dto.chatting;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import java.util.List;

@Getter
@Setter
@ToString
@EntityScan
public class ChatParameterDto {
    private int chat_no;
    private int croom_no;
    private String croom_name;
    private String croom_img;
    private String user_id;
    private String name;
    private int start_no;
    private int cur_no;
    private List<String> participants;
}
