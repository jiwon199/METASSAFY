package com.ssafy.metassafy.dto.file;

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
@ApiModel(value = "FileDto : 게시판 파일 정보", description = "게시판에 업로드 된 파일 정보")
public class FileDto {
    @ApiModelProperty(value = "글번호")
    private int article_no;
    @ApiModelProperty(value = "본파일 이름")
    private String origin_name;
    @ApiModelProperty(value = "저장된 파일 이름")
    private String saved_name;
    @ApiModelProperty(value = "다운로드 URL")
    private String path;
}
