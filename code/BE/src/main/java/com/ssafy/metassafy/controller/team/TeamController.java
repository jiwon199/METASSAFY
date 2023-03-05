package com.ssafy.metassafy.controller.team;

import com.ssafy.metassafy.controller.friend.FriendController;
import com.ssafy.metassafy.dto.team.Team;
import com.ssafy.metassafy.service.friend.FriendService;
import com.ssafy.metassafy.service.team.TeamService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/team")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Api("팀구 컨트롤러  API V1")
public class TeamController {
    private static final Logger logger = LoggerFactory.getLogger(FriendController.class);
    private static final String SUCCESS = "Success";
    private static final String FAIL = "Fail";
    @Autowired
    private TeamService service;

    //team_type은 꼭 common, special, free 중 하나!
    @PostMapping("/makeTeam")
    @ApiOperation(value = "user_id의 친구 목록 조회. 타입은 type은 꼭 common,special,free 중 하나!", notes = "user_id의 친구 목록을 조회한다. \n {\n" +
            "\"team_name\": \"sdf\",\n" +
            "\"team_type\":\"common\",\n" +
            "\"team_track\":\"웹디자인\",\n" +
            "\"leader\":\"ssafy\"\n" +
            "}" )
    public ResponseEntity<String> makeTeam(@RequestBody Team team){
        if(!service.makeTeam(team))  {
            return new ResponseEntity<String>("이미 팀이 있습니다.", HttpStatus.OK);
        }
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }



}
