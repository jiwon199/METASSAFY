package com.ssafy.metassafy.service.memo;



import com.ssafy.metassafy.dto.memo.MemoDto;
import com.ssafy.metassafy.dto.memo.MemoParameterDto;

import java.util.List;

public interface MemoService {
    public List<MemoDto> listMemo(MemoParameterDto memoParameterDto) throws Exception;
    public boolean writeMemo(MemoDto memoDto) throws Exception;
    public MemoDto getMemo(int memo_no) throws Exception;
    public boolean editMemo(MemoDto memoDto) throws Exception;
    public boolean deleteMemo(int memo_no) throws Exception;
}
