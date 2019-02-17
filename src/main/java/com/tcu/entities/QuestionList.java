/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tcu.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

/**
 *
 * @author michael
 */
public class QuestionList {
    
    @JsonProperty("tasks")
    private List<Question> questionList;

    public List<Question> getTaskList() {
        return questionList;
    }

    public void setTaskList(List<Question> taskList) {
        this.questionList = questionList;
    }

    
}
