package com.ssafy.metassafy.controller.board;

import com.ssafy.metassafy.dto.board.BoardDto;
import com.ssafy.metassafy.dto.board.BoardParameterDto;
import com.ssafy.metassafy.dto.file.FileDto;
import com.ssafy.metassafy.dto.like.LikeDto;
import com.ssafy.metassafy.service.board.BoardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/board")
@Api("게시판 컨트롤러  API V1")
public class BoardController {

    private final BoardService boardService;
    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @ApiOperation(value = "게시판 글작성", notes = "새로운 게시글 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping
    public ResponseEntity<String> writeArticle(@RequestPart("boardDto") @ApiParam(value = "게시글 정보(user_id, title, content, thumbnail)", required = true) BoardDto boardDto, @RequestPart(value = "files", required = false) @ApiParam(value = "업로드 파일 정보.", required = false) List<MultipartFile> files) throws Exception {
         logger.info("writeArticle - 호출");
        if (boardService.writeArticle(boardDto,files)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "전체게시글 보기", notes = "전체 게시글 정보를 가져온다. 그리고 DB입력 성공하면 List<BoardDto>가 json형태로 반환된다.", response = List.class)
    @GetMapping
    public ResponseEntity<List<BoardDto>> listArticle(@ApiParam(value = "게시판 파라미터 정보(key, word, popularity, user_id)", required = false) BoardParameterDto boardParameterDto) throws Exception {
        logger.info("listArticle - 호출" + boardParameterDto);
        return new ResponseEntity<List<BoardDto>>(boardService.listArticle(boardParameterDto), HttpStatus.OK);
    }

    @ApiOperation(value = "선택한 게시글 보기", notes = "선택한 게시글 정보를 가져온다. 그리고 DB입력 성공하면 BoardDto가 json형태로 반환된다.", response = BoardDto.class)
    @PostMapping("/article")
    public ResponseEntity<BoardDto> getArticle(@RequestBody @ApiParam(value = "게시글 번호(article_no, user_id)", required = true) BoardParameterDto boardParameterDto) throws Exception {
        logger.info("getArticle - 호출 : " + boardParameterDto);
        boardService.updateHit(boardParameterDto.getArticle_no());
        return new ResponseEntity<BoardDto>(boardService.getArticle(boardParameterDto), HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 수정", notes = "게시글 정보를 수정한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PutMapping
    public ResponseEntity<String> modifyArticle(@RequestPart("boardDto") @ApiParam(value = "게시글 정보(user_id, title, content, thumbnail)", required = true) BoardDto boardDto, @RequestPart(value = "files", required = false) @ApiParam(value = "업로드 파일 정보.", required = false) List<MultipartFile> files) throws Exception {
        logger.info("modifyArticle - {article_no, title, content}", boardDto);
        logger.info("modifyArticle - {files}", files);

        if (boardService.modifyArticle(boardDto, files)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 삭제", notes = "게시글 정보를 삭제한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @DeleteMapping("/{article_no}")
    public ResponseEntity<String> deleteArticle(@PathVariable("article_no") @ApiParam(value = "삭제할 게시글 번호(article_no)", required = true)  int article_no) throws Exception {
        logger.info("deleteArticle - {article_no}");
        if (boardService.deleteArticle(article_no)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "파일 업로드", notes = "파일 정보를 업로드한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping("/file")
    public ResponseEntity<String> uploadFile(@RequestPart("fileDto") @ApiParam(value = "업로드할 파일 정보(article_no)", required = true) FileDto fileDto, @RequestPart("file") @ApiParam(value = "파일 정보.", required = true) MultipartFile file) throws Exception {
        logger.info("uploadFile - " + fileDto);
        logger.info("file -" + file);
        if (boardService.uploadFile(fileDto, file)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "파일 삭제", notes = "파일 정보를 삭제한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @DeleteMapping("/file")
    public ResponseEntity<String> deleteFile(@RequestBody @ApiParam(value = "삭제할 파일 정보(article_no, saved_name)", required = false) FileDto fileDto) throws Exception {
        logger.info("deleteFile - " + fileDto);
        if (boardService.deleteFile(fileDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "좋아요", notes = "게시글, 메모, 메메모에 좋아요를 누른다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping("/like")
    public ResponseEntity<String> uploadLike(@RequestBody @ApiParam(value = "좋아요 정보( like_type(게시글 : 1, 메모 : 2, 메메모 : 3), user_id(작성자 아이디), no(식별자 번호) )", required = true) LikeDto likeDto) throws Exception{
        logger.info(likeDto.toString());
        if (boardService.uploadLike(likeDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "좋아요", notes = "게시글, 메모, 메메모에 좋아요를 삭제한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @DeleteMapping("/like")
    public ResponseEntity<String> deleteLike(@RequestBody @ApiParam(value = "좋아요 정보( like_type(게시글 : 1, 메모 : 2, 메메모 : 3), user_id(작성자 아이디), no(식별자 번호) )", required = true) LikeDto likeDto) throws Exception{
        logger.info(likeDto.toString());
        if (boardService.deleteLike(likeDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    @PostMapping("/uploadAndgetLink")
    public ResponseEntity<String> uploadAndgetLink(@ApiParam(value = "이미지 올리면 링크를 준다.", required = false) MultipartFile image) throws Exception {
        return  new ResponseEntity<String>(boardService.uploadAndgetLink(image), HttpStatus.OK);
    }
    @PostMapping("/writeSimple")
    public ResponseEntity<String> writeSimple(@RequestBody @ApiParam(value = "게시글 정보", required = true) BoardDto boardDto) throws Exception{
        logger.info(boardDto.toString());
        if (boardService.writeArticle(boardDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }


}
