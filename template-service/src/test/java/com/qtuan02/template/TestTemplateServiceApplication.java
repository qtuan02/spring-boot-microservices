package com.qtuan02.template;

import org.springframework.boot.SpringApplication;

public class TestTemplateServiceApplication {

    public static void main(String[] args) {
        SpringApplication.from(TemplateServiceApplication::main)
                .with(TestcontainersConfiguration.class)
                .run(args);
    }
}
