package com.ssafy.metassafy.dto.friend;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "FriendDto : 친구 신청 정보", description = "친구 신청 정보")
public class FriendDto {
    int friend_no;
    String to_user_id;
    String from_user_id;
    boolean accept;

    public FriendDto(String to_user_id,String from_user_id){
        this.to_user_id=to_user_id;
        this.from_user_id=from_user_id;

    }

}
