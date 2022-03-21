package com.exampaper.krielwus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import xyz.erupt.core.annotation.EruptScan;

@SpringBootApplication(scanBasePackages = {"com.exampaper.krielwus","org.jeecg.modules.jmreport",},exclude = MongoAutoConfiguration.class)
@EntityScan
@EruptScan
public class KrielwusApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(KrielwusApplication.class, args);
    }
    /**
     *新增此方法
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        // 注意这里要指向原先用main方法执行的Application启动类
        return builder.sources(KrielwusApplication .class);
    }
}
