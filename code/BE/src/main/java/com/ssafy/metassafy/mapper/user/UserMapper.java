package com.ssafy.metassafy.mapper.user;

import com.ssafy.metassafy.dto.user.JwtInfoDto;
import com.ssafy.metassafy.dto.user.TechStack;
import com.ssafy.metassafy.dto.user.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface UserMapper {
    void regist(User user);
    JwtInfoDto login(User user);

    int getCount(String user_id);

    User getUser(String user_id);

    void update(User user);

    int getEmailCount(String email);

    void deleteUser(String user_id);

    List<TechStack> getAllTechList();

    List<TechStack> getTechStack(String user_id);

    boolean addTech(HashMap<String, String> map);

    boolean deleteTech(HashMap<String, String> map);

    List<User> getAllUser();

    void setRefresh(String user_id, String refresh_token);

    User getUserWithRefresh(String refresh_token);

    void setProfileImg(String user_id, String profile_img);

    List<User> searchUserList(String search);

    int checkTechDuplicate(HashMap<String, String> map);
}