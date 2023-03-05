package com.ssafy.metassafy.mapper.team;

import com.ssafy.metassafy.dto.team.Team;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface TeamMapper {

    void addUserTeam(String user_id, int team_no);
    void makeTeam(Team team);

    Team getMyTeam(String user_id,String team_type);
}
