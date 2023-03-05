package com.ssafy.metassafy.service.friend;

import com.ssafy.metassafy.dto.friend.FriendDto;
import com.ssafy.metassafy.dto.friend.RecommendDto;
import com.ssafy.metassafy.dto.user.User;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface FriendService {
    List<User> getFrinedList(String user_id);
    String getFrinedNum(String user_id);
    public void setUserEmitter(String user_id, SseEmitter sseEmitter);
    public void sendMessage(String to_user_id,String from_user_id);
    public void removeEmitter(String user_id);

    List<FriendDto> getNotifyList(String user_id);

    boolean isValidAdd(String from_user_id, String to_user_id);

    void acceptFriend(FriendDto friend);

    void rejectFriend(FriendDto friend);

    void deleteFriend(String user_id1, String user_id2);

    List<FriendDto> getSendList(String user_id);
    List<User> getRecommendFriendList(RecommendDto recommendDto);
}
