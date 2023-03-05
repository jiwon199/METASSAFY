package com.ssafy.metassafy.config.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

import springfox.documentation.builders.*;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.schema.ScalarType;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

@Configuration // 스프링 실행시 설정파일
@EnableSwagger2 // Swagger2를 사용
@SuppressWarnings("unchecked") // warning 제거
public class SwaggerConfig {

//	Swagger-UI 2.x 확인
//	http://localhost[:8080]/{your-app-root}/swagger-ui.html
//	Swagger-UI 3.x 확인
//	http://i8d211.p.ssafy.io:8088/metassafy/swagger-ui/index.html
    // http://localhost[:8080]/{your-app-root}/swagger-ui.html
    private String version = "V1";
    private String title = "METASSAFY API" + version;

    private String host="i8d211.p.ssafy.io:8088/metassafy"; //추가


    private ApiInfo apiInfo() {



        String descript = "METASSAFY React.js API Reference for Developers<br>";
        return new ApiInfoBuilder().title(title)
                .version("0.0.1")
                .description(descript)
                .contact(new Contact("SSAFY", "https://edu.ssafy.com", "ssafy@ssafy.com"))
                .license("SSAFY License")
                .licenseUrl("ssafy@ssafy.com").version("1.0")
                .build();
    }


    @Bean
    public Docket allApi() {

        return new Docket(DocumentationType.SWAGGER_2).groupName("1. 전체").apiInfo(apiInfo()).host(host).select() //수정
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.metassafy.controller")).paths(PathSelectors.regex("/*.*"))
                .apis(RequestHandlerSelectors.any()).build() ;
    }

    @Bean
    public Docket userApi() {

        return new Docket(DocumentationType.SWAGGER_2).groupName("2. 회원").apiInfo(apiInfo()).select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.metassafy.controller")).paths(PathSelectors.regex("/user*.*"))
                .apis(RequestHandlerSelectors.any()).build() ;
    }

    @Bean
    public Docket searchApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("3. 게시판").apiInfo(apiInfo()).select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.metassafy.controller")).paths(PathSelectors.regex("/board*.*"))
                .apis(RequestHandlerSelectors.any()).build();
    }



}

