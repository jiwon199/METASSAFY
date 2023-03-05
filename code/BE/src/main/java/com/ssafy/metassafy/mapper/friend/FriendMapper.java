package com.ssafy.metassafy.mapper.friend;

import com.ssafy.metassafy.dto.friend.FriendDto;
import com.ssafy.metassafy.dto.friend.RecommendDto;
import com.ssafy.metassafy.dto.user.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface FriendMapper {
    List<User> getFriendList(String user_id);
    String getFriendNum(String user_id);
    void addNotify(String from_user_id,String to_user_id);

    List<FriendDto> getNotifyList(String user_id);

    int countRelation(String from_user_id, String to_user_id);

    void acceptFriend(int friend_no);

    void rejectFriend(int friend_no);

    FriendDto getNotify(String from_user_id, String to_user_id);
    void deleteFriend(String user_id1, String user_id2);

    List<FriendDto> getSendList(String user_id);
    List<User> getRecommendFriendList(RecommendDto recommendDto);
}
