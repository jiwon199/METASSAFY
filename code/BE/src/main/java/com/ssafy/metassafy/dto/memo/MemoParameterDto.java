package com.ssafy.metassafy.dto.memo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@Getter
@Setter
@ToString
@EntityScan
public class MemoParameterDto {
    private String user_id;
    private int article_no;
    private int memo_no;
}
