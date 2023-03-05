package com.ssafy.metassafy.controller.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.metassafy.controller.board.BoardController;
import com.ssafy.metassafy.dto.user.*;
import com.ssafy.metassafy.service.user.JwtService;
import com.ssafy.metassafy.service.user.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Api("유저 컨트롤러  API V1")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private static final String SUCCESS = "Success";
    private static final String FAIL = "Fail";

    @Autowired
    UserService service;
    /*
     클라이언트는 인증이 필요한 api에 요청할 때 토큰 정보와 함께 요청
     인증이 필요한 api는 토큰이 유효한지 검증 후 응답(예를 들어 글쓰기 페이지는 토큰 정보 없이 접근하면 튕기도록,,)
    */
    @Autowired
    JwtService jwtService; //jwt 인증이 필요한 api는 경로에 /auth 붙이기

    @ApiOperation(value = "유저 목록 조회", notes = "모든 유저의 목록을 출력한다. ", response = String.class)
    @GetMapping("/allUser")
    public List<User> getAllUser(){
        return service.getAllUser();
    }


    @ApiOperation(value = "검색어를 아이디나 이름에 포함하는 유저 목록 반환", notes = "모든 유저의 목록을 출력한다. 성공하면 success 반환", response = String.class)
    @GetMapping(value = {"/searchUser/{search}", "/searchUser"})
    public List<User> searchUserList(@PathVariable(required = false) String search ){
        if(search==null) return service.getAllUser();
        return service.searchUserList(search);
    }


    //회원 가입
    @ApiOperation(value = "유저 등록", notes = "새로운 유저 정보를 입력한다. 성공하면 success 반환 예시: \n {\n" +
            "    \"user_id\": \"ssafy\",\n" +
            "    \"user_pwd\":\"1234\",\n" +
            "    \"name\":\"kim\",\n" +
            "    \"area\":\"구미\",\n" +
            "    \"email\":\"ssafy@naver.com\"\n" +
            "}", response = String.class)
    @PostMapping("/regist")
    public ResponseEntity<String> register(@RequestBody @ApiParam(value = "유저 정보(user_id, user_pwd, name, area, email)", required = true) User user){
        try{
            service.regist(user);
        }catch(Exception e){
            return new ResponseEntity<String>(FAIL , HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

    //로그인
    @ApiOperation(value = "유저 로그인", notes = "유저가 로그인한다. 그리고 DB입력 성공하면 success 반환하고 헤더에 jwt-auth-token을 부여.(postman) 예시: \n {\n" +
            "  \"user_id\": \"ssafy\",\n" +
            "  \"user_pwd\": \"1234\"\n" +
            "}" , response = Object.class)
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody @ApiParam(value = "유저 로그인(user_id, user_pwd)", required = true)  User user, HttpServletResponse response) {
        try {
            JwtInfoDto loginUser=service.login(user);
            if(loginUser.getUser_id()!=null&&loginUser.getEmail()!=null) { // 유효한 사용자일 경우
                String access_token = jwtService.createToken(loginUser,"access"); // 사용자 정보로 토큰 생성
                String refresh_token = jwtService.createToken(loginUser,"refresh"); //refresh 토큰 생성
                response.setHeader("jwt-auth-token", access_token);  // client에 token 전달
                response.setHeader("jwt-refresh-token",refresh_token);

                response.setHeader("Access-Control-Expose-Headers","jwt-auth-token,jwt-refresh-token,cookie");


                service.setRefresh(user.getUser_id(),refresh_token); //refresh 토큰은 서버에 저장하기
                return new ResponseEntity<Object>(SUCCESS, HttpStatus.OK);
            } else {
                return new ResponseEntity<Object>(FAIL+ " 해당 아이디-비번인 유저가 없습니다.", HttpStatus.OK);
            }
        } catch(Exception e) {
            return new ResponseEntity<Object>(FAIL, HttpStatus.OK);
        }
    }

    //refresh 토큰으로 새로운 액세스 토큰을 발급받는다.
    @ApiOperation(value = "액세스 토큰 만료시 새 토큰 발급(postman)", notes = "헤더에 refresh 토큰을 넣으면 새 액세스 토큰을 발급해줍니다.", response = Object.class)
    @GetMapping("/getNewAccessToken")
    public ResponseEntity<Object> getNewAccess(HttpServletResponse response,HttpServletRequest request) {
        try{
            String refresh_token = request.getHeader("jwt-refresh-token");
            User user=service.getUserWithRefresh(refresh_token);
            if(user!=null){
                String newToken=jwtService.createToken(new JwtInfoDto(user.getUser_id(),user.getEmail()),"access");
                response.setHeader("jwt-auth-token", newToken);
                response.setHeader("Access-Control-Expose-Headers","jwt-auth-token,jwt-refresh-token,cookie");
                return new ResponseEntity<Object>(SUCCESS, HttpStatus.OK);
            }
        }catch(Exception e){
            return new ResponseEntity<Object>(FAIL, HttpStatus.OK);
        }
        return new ResponseEntity<Object>("refresh 토큰이 없습니다. ", HttpStatus.OK);

    }

    @ApiOperation(value = "유저 정보 읽기(postman 테스트하기)", notes = "유저 토큰. 그리고 DB입력 성공하면 Object가 json형태로 반환된다. (postman)", response = Object.class)
    @GetMapping("/auth/getUser") // 토큰에 담겨있는 사용자 정보를 리턴, 토큰이 필요한 경로
    public ResponseEntity<Object> getUser(HttpServletRequest request) {
        try {
            String token = request.getHeader("jwt-auth-token");
            Map<String, Object> tokenInfoMap = jwtService.getInfo(token);

            //토큰에는 아이디와 이메일 정보만 저장. 아이디 정보로 유저 전체 정보를 가져온다.
            JwtInfoDto userToken = new ObjectMapper().convertValue(tokenInfoMap.get("user"), JwtInfoDto.class);
            User user=service.getUser(userToken.getUser_id());
            user.setUser_pwd(null);
            return new ResponseEntity<Object>(user, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<Object>(FAIL, HttpStatus.OK);
        }
    }
    //아이디 중복 체크->false면 해당 아이디 사용 가능
    @ApiOperation(value = "유저 아이디 중복 체크", notes = "유저 아이디가 중복되었는지 확인한다. 중복되지 않는 아이디면 'false'를 반환한다.", response = Boolean.class)
    @GetMapping("/isExist/{user_id}")
    public boolean isExist(@PathVariable("user_id") @ApiParam(value = "유저 아이디(user_id)", required = true) String user_id){
        if(service.getCount(user_id)!=0)
            return true;
        return false;
    }

    //이메일 중복 체크
    @ApiOperation(value = "유저 이메일 중복 체크", notes = "유저 이메일이 중복되었는지 확인한다. 중복되지 않는 이메일이면 'false'를 반환한다.", response = Boolean.class)
    @GetMapping("/isExistEmail/{email}")
    public boolean isExistEmail(@PathVariable("email") @ApiParam(value = "유저 이메일(email)", required = true) String email){
        if(service.getEmailCount(email)!=0)
            return true;
        return false;
    }

    //회원 정보 수정(auth)
    @ApiOperation(value = "유저 정보 수정(postman 테스트)", notes = "유저 정보를 수정한다. 그리고 DB입력 성공여부에 따라 'success' 또는 에러를 반환한다. (postman)", response = String.class)
    @PostMapping("/auth/update")
    public ResponseEntity<String> update(@RequestBody @ApiParam(value = "업데이트할 유저 정보(*)", required = true) User user){

        System.out.println(user +"User-------------------------------------");

        try{
            service.update(user);
        }catch(Exception e){
            logger.info("수정 "+e.getMessage());
            return new ResponseEntity<String>(FAIL, HttpStatus.OK);
        }
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

    //회원 탈퇴
    @ApiOperation(value = "유저 정보 삭제(postman에서 테스트하기)", notes = "유저 정보를 삭제한다. 그리고 DB입력 성공여부에 따라 'success' 또는 에러를 반환한다. (postman)", response = String.class)
    @GetMapping("/auth/delete/{user_id}")
    public ResponseEntity<String> deleteUser(@PathVariable @ApiParam(value = "삭제할 유저 아이디(user_id)", required = true) String user_id,HttpServletRequest request){
        try{
            String token = request.getHeader("jwt-auth-token");
            Map<String, Object> tokenInfoMap = jwtService.getInfo(token);
            JwtInfoDto userToken = new ObjectMapper().convertValue(tokenInfoMap.get("user"), JwtInfoDto.class);
            //본인일 경우에만 삭제 가능
            if(userToken.getUser_id().equals(user_id))
                service.deleteUser(user_id);
            else
                return new ResponseEntity<String>("비정상적인 접근- 본인이 아닌것 같습니다..", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<String>(FAIL, HttpStatus.OK);
        }
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

    //기술 스택 전체 보기
    @ApiOperation(value = "기술 스택 전체 보기", notes = "옵션으로 제공되는 기술스택 목록 반환", response = TechStack.class)
    @GetMapping("/allTechList")
    public List<TechStack> getAllTechList(){
        List <TechStack> list=service.getAllTechList();
        logger.info("아이니는 "+Integer.toString(list.get(0).getTech_id()));
        return list;
    }

    //특정 유저의 기술 스택 보기
    @ApiOperation(value = "특정 유저의 기술 스택 반환", notes = "user_id의 기술스택 목록 반환", response = TechStack.class)
    @GetMapping("/auth/techList/{user_id}")
    public List<TechStack> getAllTechList(@PathVariable @ApiParam(value = "유저 아이디", required = true) String user_id){
        List <TechStack> list=service.getTechList(user_id);
        return list;
    }


    //특정 유저의 기술스택 하나 추가
    @ApiOperation(value="특정 유저의 기술 스택 추가",notes="유저아이디, 기술스택 아이디를 받는다. 성공시 success 반환 예시:\n {\n" +
            "        \"user_id\": \"admin\",\n" +
            "        \"tech_id\": 1\n" +
            "} ")
    @PostMapping("/addTech")
    public ResponseEntity<String> addTech(@RequestBody HashMap<String, String> map){
       try{
           service.addTech(map);
           return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
       }catch(Exception e){
           return new ResponseEntity<String>(FAIL, HttpStatus.OK);
       }

    }
    @ApiOperation(value = "유저의 기술스택 리스트로 추가", notes = "기술스택을 리스트로 추가. 기존 기술 스택은 다 없애고 새 기술 스택으로 갈아끼운다.", response = String.class)
    @PostMapping("/addTechList/{user_id}")
    //기술 스택 리스트 받아서 그 유저에게 추가
    public ResponseEntity<String> addTechList(@RequestBody int [] tech_list, @PathVariable String user_id){
        try{

            service.addTechList(user_id,tech_list);
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }catch(Exception e){
            logger.info(e.toString());
            return new ResponseEntity<String>(FAIL, HttpStatus.OK);
        }
    }

    //특정 유저의 기술 스택 하나 삭제
    @ApiOperation(value = "특정 유저의 기술 스택 삭제", notes = "특정 유저의 기술스택을 삭제한다. 형식은 기술 스택 추가와 동일", response = String.class)
    @PostMapping("/deleteTech")
    public ResponseEntity<String> deleteTech(@RequestBody HashMap<String, String> map){
        if(service.deleteTech(map)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.OK);
    }

    @ApiOperation(value = "프사 올림", notes = "프사를 스토리지에 올리고 url 받기.", response = String.class)
    @PostMapping("/uploadProfileImg")
    public String uploadProfileImg(@RequestPart("profile_img") @ApiParam(value = "프사", required = false) MultipartFile profile_img ){
        logger.info("setProfileImg");
        try{
            return service.uploadProfileImg(profile_img);
        }catch (Exception e){
            return FAIL;
        }
    }

    @ApiOperation(value = "특정 유저의 프사 설정", notes = "특정 유저의 프사를 추가한다.", response = String.class)
    @PostMapping("/auth/setProfileImg")
    public ResponseEntity<String> setProfileImg(@RequestBody UserProfile data){
        try{
            service.setProfileImg(data.getUser_id(),data.getUrl());
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);

        }catch (Exception e){
            return new ResponseEntity<String>(FAIL, HttpStatus.OK);
        }

    }

    @GetMapping("/auth/getUserById/{user_id}")
    public User getInfo(@PathVariable String user_id){

        return service.getUser(user_id);
    }

}