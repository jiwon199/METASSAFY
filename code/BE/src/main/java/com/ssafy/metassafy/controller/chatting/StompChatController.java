package com.ssafy.metassafy.controller.chatting;
import com.ssafy.metassafy.dto.chatting.ChatDto;
import com.ssafy.metassafy.service.chatting.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class StompChatController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    private final ChatService chatService;

    //"/pub/chat"
    @MessageMapping(value = "/chat/enter")
    public void enterWorld(ChatDto message){
        message.setMessage(message.getName() + "님이 접속하였습니다.");

        template.convertAndSend("/sub/chat", message);
    }

    //"/pub/message"
    @MessageMapping(value = "/chat/message")
    public void messageWorld(ChatDto message){
        template.convertAndSend("/sub/chat", message);
    }

    //"/pub/chat/room/message"
    @MessageMapping(value = "/chat/room/message")
    public void message(ChatDto message) throws  Exception{

        //대화 저장
        chatService.createChat(message);
        //룸 마지막 대화 업데이트
        chatService.updateLastChat(message);
        //chat_no 가져오기
        int chat_no = chatService.getChatNo(message);
        message.setChat_no(chat_no);

        template.convertAndSend("/sub/chat/room/" + message.getCroom_no(), message);
    }

}

