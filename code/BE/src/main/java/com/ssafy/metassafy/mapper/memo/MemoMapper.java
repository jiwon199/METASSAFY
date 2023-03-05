package com.ssafy.metassafy.mapper.memo;

import com.ssafy.metassafy.dto.memo.MemoDto;
import com.ssafy.metassafy.dto.memo.MemoParameterDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface MemoMapper {
    public List<MemoDto> listMemo(MemoParameterDto memoParameterDto) throws SQLException;
    public int writeMemo(MemoDto memoDto) throws SQLException;
    public MemoDto getMemo(int memo_no) throws SQLException;
    public int editMemo(MemoDto memoDto) throws SQLException;
    public int deleteMemo(int memo_no) throws SQLException;
    public void deleteLike(int memo_no) throws SQLException;
}
