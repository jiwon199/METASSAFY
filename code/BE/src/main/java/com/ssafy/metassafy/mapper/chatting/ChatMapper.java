package com.ssafy.metassafy.mapper.chatting;


import com.ssafy.metassafy.dto.chatting.ChatDto;
import com.ssafy.metassafy.dto.chatting.ChatParameterDto;
import com.ssafy.metassafy.dto.chatting.ChatRoomDto;
import com.ssafy.metassafy.dto.chatting.ParticipantDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface ChatMapper {
    public List<ChatRoomDto> findAllRooms(ChatParameterDto chatParameterDto) throws SQLException;
    public ChatRoomDto getRoom(ChatParameterDto chatParameterDto) throws SQLException;
    public int createChatRoom(ChatParameterDto chatParameterDto) throws SQLException;
    public int editChatRoom(ChatParameterDto chatParameterDto) throws SQLException;
    public int deleteChatRoom(ChatParameterDto chatParameterDto) throws SQLException;
    public List<ChatDto> findAllChat(ChatParameterDto chatParameterDto) throws SQLException;
    public int getMemberNum(ChatDto chatDto) throws SQLException;
    public int createChat(ChatDto chatDto) throws SQLException;
    public int updateLastChat(ChatDto chatDto) throws SQLException;
    public int registParticipants(ChatParameterDto ChatParameterDto) throws SQLException;
    public int deleteParticipant(ParticipantDto participantDto) throws SQLException;
    public int getLastReadChatId(int croom_no) throws SQLException;
    public List<ParticipantDto> findAllParticipants(ChatParameterDto chatParameterDto) throws SQLException;
    public int renewNotReadChat(List<ParticipantDto> participantDtos) throws SQLException;
    public int updateNotRead(ChatParameterDto chatParameterDto) throws SQLException;
    public int renewLastReadChatId(ParticipantDto participantDto) throws SQLException;
    public int getChatNo(ChatDto chatDto) throws SQLException;
    public int getUserLastReadChatId(ChatParameterDto chatParameterDto) throws SQLException;
    public int getLowChatNo(ChatParameterDto chatParameterDto) throws SQLException;
    public int getStartNo(ChatParameterDto chatParameterDto) throws SQLException;
    public List<ChatDto> upScroll(ChatParameterDto chatParameterDto) throws  SQLException;
    public int leaveRoom(ParticipantDto participantDto) throws SQLException;
}
