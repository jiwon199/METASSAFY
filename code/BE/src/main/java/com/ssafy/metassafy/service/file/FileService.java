package com.ssafy.metassafy.service.file;

import com.ssafy.metassafy.dto.file.FileDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    public FileDto saveFile(MultipartFile file) throws IOException;
    public void deleteFile(FileDto fileDto);
}
