package com.ssafy.metassafy.mapper.memo;

import com.ssafy.metassafy.dto.memo.MememoDto;
import com.ssafy.metassafy.dto.memo.MemoParameterDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface MememoMapper {
    public List<MememoDto> listMememo(MemoParameterDto memoParameterDto) throws SQLException;
    public int writeMememo(MememoDto mememoDto) throws SQLException;
    public MememoDto getMememo(int mememo_no) throws SQLException;
    public int editMememo(MememoDto mememoDto) throws SQLException;
    public int deleteMememo(int mememo_no) throws SQLException;
    public void deleteLike(int mememo_no) throws SQLException;
}
