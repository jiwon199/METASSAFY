package com.ssafy.metassafy.controller.memo;

import com.ssafy.metassafy.dto.memo.MemoDto;
import com.ssafy.metassafy.dto.memo.MemoParameterDto;
import com.ssafy.metassafy.service.memo.MemoService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/memo")
public class MemoController {

    private final MemoService memoService;
    private static final Logger logger = LoggerFactory.getLogger(MemoController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    // 메모 리스트 가져오기
    @GetMapping
    public ResponseEntity<List<MemoDto>> listMemo(MemoParameterDto memoParameterDto) throws Exception {
        logger.info("listMemo - 호출");
        return new ResponseEntity<List<MemoDto>>(memoService.listMemo(memoParameterDto), HttpStatus.OK);
    }

    // 메모 create
    @PostMapping
    public ResponseEntity<String> writeMemo(@RequestBody MemoDto memoDto) throws Exception {
        logger.info("writeMemo - 호출");

        if (memoService.writeMemo(memoDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    // 메모 한개 가져오기
    @GetMapping(value = "/{memo_no}")
    public ResponseEntity<MemoDto> getMemo(@PathVariable("memo_no") int memo_no) throws Exception {
        logger.info("getMemo - 호출");
        return new ResponseEntity<MemoDto>(memoService.getMemo(memo_no), HttpStatus.OK);
    }

    // 메모 edit
    @PutMapping
    public ResponseEntity<String> editMemo(MemoDto memoDto) throws Exception {
        logger.info("editMemo" , memoDto);

        if (memoService.editMemo(memoDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.OK);
    }

    // 메모 delete like 삭제도 처리....
    @DeleteMapping("/{memo_no}")
    public ResponseEntity<String> deleteMemo(@PathVariable("memo_no") int memo_no) throws Exception {
        logger.info("deleteMemo - ", memo_no);
        if (memoService.deleteMemo(memo_no)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }
}
