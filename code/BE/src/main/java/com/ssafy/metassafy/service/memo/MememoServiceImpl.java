package com.ssafy.metassafy.service.memo;

import com.ssafy.metassafy.dto.memo.MememoDto;
import com.ssafy.metassafy.dto.memo.MemoParameterDto;
import com.ssafy.metassafy.mapper.memo.MememoMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MememoServiceImpl implements MememoService{

    private static final Logger logger = LoggerFactory.getLogger(MememoServiceImpl.class);

    private final SqlSession sqlSession;

    @Override
    public List<MememoDto> listMememo(MemoParameterDto memoParameterDto) throws Exception {
        return sqlSession.getMapper(MememoMapper.class).listMememo(memoParameterDto);
    }

    @Override
    public boolean writeMememo(MememoDto mememoDto) throws Exception {
        return sqlSession.getMapper(MememoMapper.class).writeMememo(mememoDto) == 1;
    }

    @Override
    public MememoDto getMememo(int mememo_no) throws Exception {
        return sqlSession.getMapper(MememoMapper.class).getMememo(mememo_no);
    }

    @Override
    public boolean editMememo(MememoDto mememoDto) throws Exception {
        return sqlSession.getMapper(MememoMapper.class).editMememo(mememoDto) == 1;
    }

    @Override
    @Transactional
    public boolean deleteMememo(int mememo_no) throws Exception {
        sqlSession.getMapper(MememoMapper.class).deleteLike(mememo_no);
        return sqlSession.getMapper(MememoMapper.class).deleteMememo(mememo_no) == 1;
    }
}
