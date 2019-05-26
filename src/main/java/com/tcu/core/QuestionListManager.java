/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tcu.core;

import com.tcu.entities.QuestionList;

/**
 *
 * @author michael
 */
public class QuestionListManager {

    private static QuestionListManager instance;

    private QuestionList questionList;
    private QuestionList customQuestionList;

    public static QuestionListManager getInstance() {
        if (instance == null) {
            instance = new QuestionListManager();
        }
        return instance;
    }

    public void init(QuestionList questionList) {

        this.questionList = questionList;

    }

    public void initCustomList(QuestionList questionList) {

        this.customQuestionList = questionList;

    }

    public QuestionList getQuestionList() {
        return this.questionList;
    }

    public QuestionList getCustomQuestionList() {
        return customQuestionList;
    }

}
