package com.ssafy.metassafy.controller.chatting;

import com.ssafy.metassafy.dto.chatting.ChatParameterDto;
import com.ssafy.metassafy.dto.chatting.ParticipantDto;
import com.ssafy.metassafy.service.chatting.ChatService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/participant")
public class ParticipantController {

    private final ChatService chatService;
    private static final Logger logger = LoggerFactory.getLogger(ParticipantController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    // user의 모든 채팅방 참가 목록 가져오기(user_id)
    @GetMapping
    public ResponseEntity<List<ParticipantDto>> findAllParticipants(ChatParameterDto chatParameterDto) throws Exception{
        logger.info("findAllParticipants - 호출");
        return new ResponseEntity<List<ParticipantDto>>(chatService.findAllParticipants(chatParameterDto), HttpStatus.OK);
    }


    // user의 모든 not_read_chat을 갱신
    @PutMapping(value = "/not_read_chat")
    public ResponseEntity<String> renewNotReadChat(@RequestBody List<ParticipantDto> participantDtos) throws Exception{
        logger.info("renewNotReadChat - 호출");

        if(chatService.renewNotReadChat(participantDtos)){
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @PutMapping(value = "/last_read_chat_id")
    public ResponseEntity<String> renewLastReadChatId(@RequestBody ParticipantDto  participantDto) throws Exception{
        logger.info("renewNotReadChat - 호출");

        if(chatService.renewLastReadChatId(participantDto)){
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @PutMapping(value = "/leave_room")
    public ResponseEntity<String> leaveRoom(@RequestBody ParticipantDto  participantDto) throws Exception{
        logger.info("leaveRoom - 호출");

        if(chatService.leaveRoom(participantDto)){
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteParticipant(@RequestBody ParticipantDto  participantDto) throws Exception{
        logger.info("leaveRoom - 호출 user_id, croom_no");

        if(chatService.deleteParticipant(participantDto)){
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }


}
