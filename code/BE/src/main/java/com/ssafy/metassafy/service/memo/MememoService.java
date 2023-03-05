package com.ssafy.metassafy.service.memo;

import com.ssafy.metassafy.dto.memo.MememoDto;
import com.ssafy.metassafy.dto.memo.MemoParameterDto;

import java.util.List;

public interface MememoService {
    public List<MememoDto> listMememo(MemoParameterDto memoParameterDto) throws Exception;
    public boolean writeMememo(MememoDto mememoDto) throws Exception;
    public MememoDto getMememo(int mememo_no) throws Exception;
    public boolean editMememo(MememoDto mememoDto) throws Exception;
    public boolean deleteMememo(int mememo_no) throws Exception;
}
