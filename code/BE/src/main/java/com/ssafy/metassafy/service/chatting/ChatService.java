package com.ssafy.metassafy.service.chatting;

import com.ssafy.metassafy.dto.chatting.ChatDto;
import com.ssafy.metassafy.dto.chatting.ChatParameterDto;
import com.ssafy.metassafy.dto.chatting.ChatRoomDto;
import com.ssafy.metassafy.dto.chatting.ParticipantDto;

import java.util.List;

public interface ChatService {

    public List<ChatRoomDto> findAllRooms(ChatParameterDto chatParameterDto) throws Exception;
    public ChatRoomDto getRoom(ChatParameterDto chatParameterDto) throws Exception;
    public int createChatRoom(ChatParameterDto chatParameterDto, List<String> participants) throws  Exception;
    public boolean editChatRoom(ChatParameterDto chatParameterDto) throws Exception;
    public boolean deleteChatRoom(ChatParameterDto chatParameterDto) throws Exception;
    public List<ChatDto> findAllChat(ChatParameterDto chatParameterDto) throws Exception;
    public void createChat(ChatDto chatDto) throws Exception;
    public void updateLastChat(ChatDto chatDto) throws Exception;
//    public void registParticipant(ChatDto chatDto) throws Exception;
    public boolean deleteParticipant(ParticipantDto participantDto) throws Exception;
    public int getLastReadChatId(int croom_no) throws Exception;
    public List<ParticipantDto> findAllParticipants(ChatParameterDto chatParameterDto) throws Exception;
    public boolean renewNotReadChat(List<ParticipantDto> participantDtos) throws Exception;
    public boolean updateNotRead(ChatParameterDto chatParameterDto) throws Exception;
    public boolean renewLastReadChatId(ParticipantDto participantDto) throws Exception;
    public int getChatNo(ChatDto chatDto) throws Exception;
    public List<ChatDto> upScroll(ChatParameterDto chatParameterDto) throws Exception;
    public boolean leaveRoom(ParticipantDto participantDto) throws Exception;
}
