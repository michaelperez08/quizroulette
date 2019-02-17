package com.tcu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

//http://www.thymeleaf.org/doc/articles/layouts.html
@SpringBootApplication
public class SpringBootWebApplication {

    public static void main(String[] args) throws Exception {
        ConfigurableApplicationContext ctx = SpringApplication.run(SpringBootWebApplication.class, args);
        boolean canContinue = new ConfigurationLoader().loadConfiguration();

        if (!canContinue) {
            System.err.print("Cannot load configuration, server is going down...");
            ctx.close();
        }
    }

}
