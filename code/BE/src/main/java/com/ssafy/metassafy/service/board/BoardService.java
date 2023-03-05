package com.ssafy.metassafy.service.board;

import com.ssafy.metassafy.dto.board.BoardDto;
import com.ssafy.metassafy.dto.board.BoardParameterDto;
import com.ssafy.metassafy.dto.file.FileDto;
import com.ssafy.metassafy.dto.like.LikeDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


public interface BoardService {
    public boolean writeArticle(BoardDto boardDto,List<MultipartFile> files) throws Exception;
    public boolean makeLike(LikeDto likeDto) throws Exception;
    public List<BoardDto> listArticle(BoardParameterDto boardParameterDto) throws Exception;
    public BoardDto getArticle(BoardParameterDto boardParameterDto) throws Exception;
    public void updateHit(int article_no) throws Exception;
    public boolean modifyArticle(BoardDto boardDto,List<MultipartFile> files) throws Exception;
    public boolean deleteArticle(int article_no) throws Exception;
    public boolean deleteFile(FileDto fileDto) throws Exception;
    public boolean uploadFile(FileDto fileDto, MultipartFile file) throws Exception;
    String uploadAndgetLink(MultipartFile image) throws Exception;
    boolean writeArticle(BoardDto boardDto) throws Exception;
    boolean uploadLike(LikeDto likeDto) throws Exception;
    boolean deleteLike(LikeDto likeDto) throws Exception;
}
