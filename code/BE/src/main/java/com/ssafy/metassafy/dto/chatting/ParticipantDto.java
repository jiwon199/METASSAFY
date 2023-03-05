package com.ssafy.metassafy.dto.chatting;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@Getter
@Setter
@ToString
@EntityScan
public class ParticipantDto {
    private String user_id;
    private int croom_no;
    private String croom_name;
    private int not_read_chat;
    private int last_read_chat_id;
    private String regtime;
}
