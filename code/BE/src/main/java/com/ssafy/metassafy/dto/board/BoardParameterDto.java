package com.ssafy.metassafy.dto.board;

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
@ApiModel(value = "BoardParameterDto : 게시판 파라미터 정보", description = "게시판의 특정 조건 글을 얻기위한 부가적인 파라미터정보")
public class BoardParameterDto {
    @ApiModelProperty(value = "검색 조건")
    private String key;
    @ApiModelProperty(value = "검색어")
    private String word;
    @ApiModelProperty(value = "인기순")
    private String popularity;
    @ApiModelProperty(value = "유저 아이디")
    private String user_id;
    @ApiModelProperty(value = "게시글 번호")
    private int article_no;
}
