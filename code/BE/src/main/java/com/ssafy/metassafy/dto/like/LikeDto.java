package com.ssafy.metassafy.dto.like;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Getter
@Setter
@ToString
@EntityScan
@ApiModel(value = "LikeDto : 게시판 좋아요 정보", description = "게시판 좋아요 정보")
public class LikeDto {
    @ApiModelProperty(value = "좋아요 타입(게시글, 댓글, 대댓글 등)")
    private int like_type;
    @ApiModelProperty(value = "작성자 아이디")
    private String user_id;
    @ApiModelProperty(value = "글번호")
    private int no;
}
