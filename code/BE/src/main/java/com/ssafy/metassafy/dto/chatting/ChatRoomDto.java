package com.ssafy.metassafy.dto.chatting;

import com.ssafy.metassafy.dto.file.FileDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import java.util.List;

@Getter
@Setter
@ToString
@EntityScan
public class ChatRoomDto {
    private int croom_no;
    private String croom_name;
    private String last_chat;
    private String last_chat_time;
    private int not_read_chat;
    private String croom_img;
    private List<String> participants;
    private String regtime;
    private int start_no;

}
