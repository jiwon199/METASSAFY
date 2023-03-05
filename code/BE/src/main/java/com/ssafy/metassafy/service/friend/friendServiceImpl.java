package com.ssafy.metassafy.service.friend;

import com.ssafy.metassafy.dto.friend.FriendDto;
import com.ssafy.metassafy.dto.friend.RecommendDto;
import com.ssafy.metassafy.dto.user.User;
import com.ssafy.metassafy.mapper.friend.FriendMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class friendServiceImpl implements  FriendService{

    private static final Logger logger = LoggerFactory.getLogger(friendServiceImpl.class);
    private final FriendMapper mapper;
    private Map<String, SseEmitter> connectedUser = new ConcurrentHashMap<>();


    @Override
    public List<User> getFrinedList(String user_id) {
        List <User> list= mapper.getFriendList(user_id);
        for(int i=0;i<list.size();i++){
            list.get(i).setUser_pwd(null);
        }
        return list;
    }

    @Override
    public String getFrinedNum(String user_id) {
        return mapper.getFriendNum(user_id);
    }

    @Override
    public List<FriendDto> getNotifyList(String user_id) {
        return mapper.getNotifyList(user_id);
    }

    @Override
    public boolean isValidAdd(String from_user_id, String to_user_id) {
        if(mapper.countRelation(from_user_id,to_user_id)!=0)
            return false;
        return true;
    }

    @Override
    public void acceptFriend(FriendDto friend) {
        mapper.acceptFriend(friend.getFriend_no());
    }

    @Override
    public void rejectFriend(FriendDto friend) {
        mapper.rejectFriend(friend.getFriend_no());
    }

    @Override
    public void deleteFriend(String user_id1, String user_id2) {
        mapper.deleteFriend(user_id1,user_id2);
    }

    @Override
    public List<FriendDto> getSendList(String user_id) {
        return mapper.getSendList(user_id);
    }

    @Override
    public List<User> getRecommendFriendList(RecommendDto recommendDto) {
        return mapper.getRecommendFriendList(recommendDto);
    }

    @Override
    public void setUserEmitter(String user_id, SseEmitter sseEmitter) {
        connectedUser.put(user_id, sseEmitter);

    }

    @Override
    public void sendMessage(String to_user_id,String from_user_id) {

        mapper.addNotify(from_user_id,to_user_id); //친구 신청 내역을 db에 추가
        FriendDto notify=mapper.getNotify(from_user_id,to_user_id); //방금 가져온 dto 가져옴
        //알림창에 접속상태이면
        if(connectedUser.containsKey(to_user_id)){
            SseEmitter sseEmitter = connectedUser.get(to_user_id); //해당 유저의 sseEmitter 가져오기
            //실시간 알림 보내기
            try {
                sseEmitter.send(SseEmitter.event()
                        .name("newNotify")
                        .data(notify));
                sseEmitter.complete();
                logger.info("친구 신청 보냄(서비스)");
            } catch (Exception ex) {
                logger.info("에러 발생-"+ex.getMessage());
                sseEmitter.completeWithError(ex);
            }
        }
    }

    @Override
    public void removeEmitter(String user_id) {
        logger.info("유저 제거");
        connectedUser.remove(user_id);
    }


}
