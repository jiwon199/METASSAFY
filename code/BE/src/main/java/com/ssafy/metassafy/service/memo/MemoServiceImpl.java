package com.ssafy.metassafy.service.memo;


import com.ssafy.metassafy.dto.memo.MemoDto;
import com.ssafy.metassafy.dto.memo.MemoParameterDto;
import com.ssafy.metassafy.mapper.memo.MemoMapper;
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
public class MemoServiceImpl implements MemoService{
    private static final Logger logger = LoggerFactory.getLogger(MemoServiceImpl.class);

    private final SqlSession sqlSession;

    @Override
    public List<MemoDto> listMemo(MemoParameterDto memoParameterDto) throws Exception {
        return sqlSession.getMapper(MemoMapper.class).listMemo(memoParameterDto);
    }

    @Override
    public boolean writeMemo(MemoDto memoDto) throws Exception {
        return sqlSession.getMapper(MemoMapper.class).writeMemo(memoDto) == 1;
    }

    @Override
    public MemoDto getMemo(int memo_no) throws Exception {
        return sqlSession.getMapper(MemoMapper.class).getMemo(memo_no);
    }
    @Override
    public boolean editMemo(MemoDto memoDto) throws Exception {
        return sqlSession.getMapper(MemoMapper.class).editMemo(memoDto) == 1;
    }
    @Override
    @Transactional
    public boolean deleteMemo(int memo_no) throws Exception {
        sqlSession.getMapper(MemoMapper.class).deleteLike(memo_no);
        return sqlSession.getMapper(MemoMapper.class).deleteMemo(memo_no) == 1;
    }
}
