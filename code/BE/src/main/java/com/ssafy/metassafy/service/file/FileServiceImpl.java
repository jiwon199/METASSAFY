package com.ssafy.metassafy.service.file;

import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import com.ssafy.metassafy.dto.file.FileDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.*;
import java.util.UUID;
import java.util.Optional;

@Service
public class FileServiceImpl implements FileService{

    @Value("${naver.cloud.endpoint}")
    private String endPoint;
    @Value("${naver.cloud.region.name}")
    private String regionName;
    @Value("${naver.cloud.bucket.name}")
    private String bucketName;
    @Value("${naver.cloud.access.key}")
    private String accessKey;
    @Value("${naver.cloud.secret.key}")
    private String secretKey;
    private AmazonS3 s3;

    @PostConstruct
    public void initialize(){
        s3 = AmazonS3ClientBuilder.standard()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endPoint, regionName))
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
                .build();
    }

    @Override
    public FileDto saveFile(MultipartFile multipartFile) throws IOException{

        FileDto fileDto = new FileDto();

        // 원래 파일 이름 추출
        String origin_name = multipartFile.getOriginalFilename();

        // 파일 이름으로 쓸 uuid 생성
        String uuid = UUID.randomUUID().toString();

        // uuid와 확장자 결합
        String saved_name = uuid + origin_name;
        File uploadFile = convert(multipartFile)        // 파일 생성
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File convert fail"));

        upload(bucketName,saved_name,uploadFile);
        // 파일 업로드 & 링크 받아오기

        fileDto.setOrigin_name(origin_name);
        fileDto.setSaved_name(saved_name);
        fileDto.setPath(endPoint +"/"+ bucketName +"/"+ saved_name);

        return fileDto;
    }

    @Override
    public void deleteFile(FileDto fileDto){

        System.out.println("deleteFile ::" + fileDto);

        try {
            s3.deleteObject(bucketName, fileDto.getSaved_name());
            System.out.format("Object %s has been deleted.\n", fileDto.getSaved_name());
        } catch (AmazonS3Exception e) {
            e.printStackTrace();
        } catch(SdkClientException e) {
            e.printStackTrace();
        }
    }


    private void upload(String bucketName, String fileName, File uploadFile) {
        s3.putObject(new PutObjectRequest(bucketName, fileName, uploadFile)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        uploadFile.delete();
    }

    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }

        return Optional.empty();
    }
}
