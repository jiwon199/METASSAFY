package com.ssafy.metassafy.dto.user;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class JwtInfoDto {
    String user_id;
    String email;
}
