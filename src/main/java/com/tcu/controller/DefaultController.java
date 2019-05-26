package com.tcu.controller;

import com.tcu.core.QuestionListManager;
import com.tcu.entities.QuestionList;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DefaultController {

    @GetMapping("/")
    public String home1(ModelMap mp) {
        QuestionList ql = QuestionListManager.getInstance().getQuestionList();
        QuestionList cql = QuestionListManager.getInstance().getCustomQuestionList();
        
        mp.put("ql", ql);
        mp.put("cql", cql);
        return "/index";
    }

    @GetMapping("/home")
    public String home() {
        return "/index";
    }
    
    @GetMapping("/preguntas")
    public String questions(ModelMap mp) {
        QuestionList ql = QuestionListManager.getInstance().getQuestionList();
        QuestionList cql = QuestionListManager.getInstance().getCustomQuestionList();
        
        mp.put("ql", ql);
        mp.put("cql", cql);
        return "/questions";
    }

    @GetMapping("/admin")
    public String admin() {
        return "/admin";
    }

    @GetMapping("/user")
    public String user() {
        return "/user";
    }

    @GetMapping("/about")
    public String about() {
        return "/about";
    }

    @GetMapping("/login")
    public String login() {
        return "/login";
    }

    @GetMapping("/403")
    public String error403() {
        return "/error/403";
    }

}
