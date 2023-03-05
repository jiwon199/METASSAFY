package com.ssafy.metassafy.dto.friend;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "FriendDto : 친구 추천 정보", description = "친구 추천 정보")
public class RecommendDto {

    @ApiModelProperty(value = "유저 아이디")
    String user_id;

    @ApiModelProperty(value = "유저 지역")
    String area;

    @ApiModelProperty(value = "유저 관심직무")
    String interest;
}
