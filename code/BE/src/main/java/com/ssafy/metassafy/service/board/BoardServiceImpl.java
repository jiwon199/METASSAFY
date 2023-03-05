package com.ssafy.metassafy.service.board;


import com.ssafy.metassafy.dto.board.BoardDto;
import com.ssafy.metassafy.dto.board.BoardParameterDto;
import com.ssafy.metassafy.dto.file.FileDto;
import com.ssafy.metassafy.dto.like.LikeDto;
import com.ssafy.metassafy.mapper.board.BoardMapper;
import com.ssafy.metassafy.service.file.FileService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements  BoardService{

    private static final Logger logger = LoggerFactory.getLogger(BoardServiceImpl.class);

    private final SqlSession sqlSession;

    private final FileService fileService;

    @Override
    @Transactional
    public boolean writeArticle(BoardDto boardDto, List<MultipartFile> files) throws Exception {

        if(boardDto.getTitle() == null || boardDto.getContent() == null) {
            throw new Exception();
        }
        //TODO : logger로 바꾸기

        FileDto file;

        if(files != null && !files.get(0).isEmpty()){
            logger.info("modifyArticle files - 업로드 :" + files);
            file = fileService.saveFile(files.get(0));
            boardDto.setThumbnail(file.getPath());
            sqlSession.getMapper(BoardMapper.class).writeArticle(boardDto);

            file.setArticle_no(boardDto.getArticle_no());
            sqlSession.getMapper(BoardMapper.class).uploadFile(file);

            for(int i = 1; i < files.size(); i++){
                file = fileService.saveFile(files.get(i));
                file.setArticle_no(boardDto.getArticle_no());

                sqlSession.getMapper(BoardMapper.class).uploadFile(file);
            }
        }else{
            sqlSession.getMapper(BoardMapper.class).writeArticle(boardDto);
        }

        return true;
    }



    @Override
    public boolean makeLike(LikeDto likeDto) throws Exception {
        return sqlSession.getMapper(BoardMapper.class).makeLike(likeDto) == 1;
    }

    @Override
    @Transactional
    public List<BoardDto> listArticle(BoardParameterDto boardParameterDto) throws Exception {

        return sqlSession.getMapper(BoardMapper.class).listArticle(boardParameterDto);
    }

    @Override
    public BoardDto getArticle(BoardParameterDto boardParameterDto) throws Exception {
        return sqlSession.getMapper(BoardMapper.class).getArticle(boardParameterDto);
    }

    @Override
    public void updateHit(int article_no) throws Exception {
        sqlSession.getMapper(BoardMapper.class).updateHit(article_no);
    }

    @Override
    @Transactional
    public boolean modifyArticle(BoardDto boardDto,List<MultipartFile> files) throws Exception {

        FileDto file;

        if(boardDto.getThumbnail() != null){
            if(files != null && !files.get(0).isEmpty()){
                logger.info("modifyArticle files - 업로드 :" + files);
                for (MultipartFile multipartFile : files) {
                    logger.info(multipartFile.getOriginalFilename().length() + " 길이 몇?");
                    file = fileService.saveFile(multipartFile);
                    file.setArticle_no(boardDto.getArticle_no());

                    sqlSession.getMapper(BoardMapper.class).uploadFile(file);
                }
            }
        }else{
            if(files != null && !files.get(0).isEmpty()){
                logger.info("modifyArticle files - 업로드 :" + files);
                file = fileService.saveFile(files.get(0));
                boardDto.setThumbnail(file.getPath());
                file.setArticle_no(boardDto.getArticle_no());
                sqlSession.getMapper(BoardMapper.class).uploadFile(file);

                for(int i = 1; i < files.size(); i++){
                    file = fileService.saveFile(files.get(i));
                    file.setArticle_no(boardDto.getArticle_no());

                    sqlSession.getMapper(BoardMapper.class).uploadFile(file);
                }
            }
        }

        return sqlSession.getMapper(BoardMapper.class).modifyArticle(boardDto) == 1;
    }

    @Override
    public boolean deleteArticle(int article_no) throws Exception {

        List<FileDto> files = sqlSession.getMapper(BoardMapper.class).getFiles(article_no);

        for(int i = 0; i < files.size(); i++){
            fileService.deleteFile(files.get(i));
        }

        return sqlSession.getMapper(BoardMapper.class).deleteArticle(article_no) == 1;
    }

    @Override
    public boolean deleteFile(FileDto fileDto) throws Exception {
        fileService.deleteFile(fileDto);
        return sqlSession.getMapper(BoardMapper.class).deleteFile(fileDto) == 1;
    }

    @Override
    public boolean uploadFile(FileDto fileDto, MultipartFile file) throws Exception {

        FileDto temp = fileService.saveFile(file);

        fileDto.setOrigin_name(temp.getOrigin_name());
        fileDto.setSaved_name(temp.getSaved_name());
        fileDto.setPath(temp.getPath());

        return sqlSession.getMapper(BoardMapper.class).uploadFile(fileDto) == 1;
    }

    @Override
    public String uploadAndgetLink(MultipartFile img) throws Exception {
        FileDto file = fileService.saveFile(img);
        return file.getPath();
    }

    @Override
    public boolean writeArticle(BoardDto boardDto) throws Exception {
        return sqlSession.getMapper(BoardMapper.class).writeArticle(boardDto)==1;
    }

    @Override
    public boolean uploadLike(LikeDto likeDto) throws Exception {
        return sqlSession.getMapper(BoardMapper.class).uploadLike(likeDto)==1;
    }

    @Override
    public boolean deleteLike(LikeDto likeDto) throws Exception {
        return sqlSession.getMapper(BoardMapper.class).deleteLike(likeDto)==1;
    }

}
