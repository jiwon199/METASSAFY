package com.ssafy.metassafy.service.user;

import com.ssafy.metassafy.dto.file.FileDto;
import com.ssafy.metassafy.dto.user.JwtInfoDto;
import com.ssafy.metassafy.dto.user.TechStack;
import com.ssafy.metassafy.dto.user.User;
import com.ssafy.metassafy.mapper.user.UserMapper;
import com.ssafy.metassafy.service.file.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;

@Service
public class UserService {

    final UserMapper mapper;

    @Autowired
    private FileService fileService;

    public UserService(UserMapper mapper) {
        this.mapper = mapper;
    }

    public void regist(User user) {
        mapper.regist(user);
    }


    public JwtInfoDto login(User user) {
        JwtInfoDto loginUser=mapper.login(user);
        if(loginUser!=null){
            return loginUser;
        }
        return new JwtInfoDto();
    }

    public int getCount(String user_id) {
        return mapper.getCount(user_id);
    }

    public User getUser(String user_id) {
        User user = mapper.getUser(user_id);
        if(user.getGender() == 'm'){
            user.setGenderF("남성");
        }else if(user.getGender() == 'w'){
            user.setGenderF("여성");
        }else{
            user.setGenderF("미정");
        }

        user.setUser_pwd(null);

        return user;
    }

    public void update(User user) {

            if(user.getGenderF().equals("남성")){
                user.setGender('m');
            }else if(user.getGenderF().equals("여성")){
                user.setGender('w');
            }else{
                user.setGender('z');
            }
        System.out.println(user.getGender());
        mapper.update(user);
    }

    public int getEmailCount(String email) {
        return mapper.getEmailCount(email);
    }

    public void deleteUser(String user_id) {
        mapper.deleteUser(user_id);
    }

    public List<TechStack> getAllTechList() {
        return mapper.getAllTechList();
    }

    public List<TechStack> getTechList(String user_id) {
        return mapper.getTechStack(user_id);
    }

    public void addTech(HashMap<String, String> map) {
        if(mapper.checkTechDuplicate(map)==0){
            mapper.addTech(map);
        }
    }

    public boolean deleteTech(HashMap<String, String> map) {
        return mapper.deleteTech(map);
    }

    public List<User> getAllUser() {
        List<User> users = mapper.getAllUser();
        setGenderFList(users);
        return users;
    }

    public void setRefresh(String user_id, String refresh_token) {
        mapper.setRefresh(user_id,refresh_token);
    }

    public User getUserWithRefresh(String refresh_token) {
        User user = mapper.getUserWithRefresh(refresh_token);

        if(user.getGender() == 'm'){
            user.setGenderF("남성");
        }else if(user.getGender() == 'w'){
            user.setGenderF("여성");
        }else{
            user.setGenderF("미정");
        }

        return user;
    }

    public String uploadProfileImg(MultipartFile profile_img) throws Exception{
        FileDto img=fileService.saveFile(profile_img);

        return img.getPath();
    }

    public void setProfileImg(String user_id,String url){
        mapper.setProfileImg(user_id,url);
    }
    public List<User> searchUserList(String search) {
        List<User> users = mapper.searchUserList(search);
        setGenderFList(users);
        return users;
    }


    private void setGenderFList(List<User> users){
        for(User user : users){
            if(user.getGender() == 'm'){
                user.setGenderF("남성");
            }else if(user.getGender() == 'w'){
                user.setGenderF("여성");
            }else{
                user.setGenderF("미정");
            }
        }
    }


    public void addTechList(String user_id, int [] tech_list) {
        deleteAllUserTech(user_id);
        addAllUserTech(user_id,tech_list);

    }
    public void deleteAllUserTech(String user_id ){
        List<TechStack> list= mapper.getTechStack(user_id);
        for(TechStack tech:list){
            HashMap<String,String> map=new HashMap<>();
            map.put("user_id",user_id );
            map.put("tech_id",Integer.toString(tech.getTech_id()));
            mapper.deleteTech(map);
        }
    }
    public void addAllUserTech(String user_id, int [] tech_list){
        for(int tech_id:tech_list){
            HashMap<String,String> map=new HashMap<>();
            map.put("user_id",user_id );
            map.put("tech_id",Integer.toString(tech_id));
            mapper.addTech(map);
        }
    }
}