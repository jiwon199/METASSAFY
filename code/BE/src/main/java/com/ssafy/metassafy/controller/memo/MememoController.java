package com.ssafy.metassafy.controller.memo;

import com.ssafy.metassafy.dto.memo.MememoDto;
import com.ssafy.metassafy.dto.memo.MemoParameterDto;
import com.ssafy.metassafy.service.memo.MememoService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/mememo")
public class MememoController {

    private final MememoService mememoService;
    private static final Logger logger = LoggerFactory.getLogger(MememoController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    // 메메모 리스트 가져오기
    @GetMapping
    public ResponseEntity<List<MememoDto>> listMememo(MemoParameterDto memoParameterDto) {
        logger.info("listMememo - 호출");
        try{
            return new ResponseEntity<List<MememoDto>>(mememoService.listMememo(memoParameterDto), HttpStatus.OK);
        }catch (Exception e){
            List<MememoDto> list = new ArrayList<>();
            return new ResponseEntity<List<MememoDto>>(list, HttpStatus.OK);
        }
    }

    // 메메모 create
    @PostMapping
    public ResponseEntity<String> writeMememo(@RequestBody MememoDto mememoDto) throws Exception {
        logger.info("writeMememo - 호출");

        if (mememoService.writeMememo(mememoDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    // 메메모 한개 가져오기
    @GetMapping(value = "/{mememo_no}")
    public ResponseEntity<MememoDto> getMememo(@PathVariable int mememo_no) throws Exception {
        logger.info("getMememo - 호출");
        return new ResponseEntity<MememoDto>(mememoService.getMememo(mememo_no), HttpStatus.OK);
    }

    // 메메모 edit
    @PutMapping
    public ResponseEntity<String> editMememo(@RequestBody MememoDto mememoDto) throws Exception {
        logger.info("editMememo" , mememoDto);

        if (mememoService.editMememo(mememoDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.OK);
    }

    // 메메모 delete like 삭제도 처리....
    @DeleteMapping("/{mememo_no}")
    public ResponseEntity<String> deleteMememo(@PathVariable int mememo_no) throws Exception {
        logger.info("deleteMememo - ", mememo_no);
        if (mememoService.deleteMememo(mememo_no)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }
}
