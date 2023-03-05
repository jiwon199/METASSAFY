package com.ssafy.metassafy.dto.team;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Team {
    int team_no;
    String team_type;
    String team_name;
    int team_number;
    String team_track;
    String leader;
}
