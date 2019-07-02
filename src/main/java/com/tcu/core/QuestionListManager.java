/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tcu.core;

import com.tcu.entities.Question;
import com.tcu.entities.QuestionList;
import java.math.BigInteger;
import java.util.Collections;
import javafx.print.Collation;

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
    
    public boolean removeFromCustomQuestionListByID(BigInteger id){
        boolean removed = false; 
        for(Question q: customQuestionList.getQuestionList()){
            if(q.getId().intValue()==id.intValue()){
                removed=customQuestionList.getQuestionList().remove(q);
                break;
            }
        }
        return removed;
    }
    
    public boolean editFromQuestionList(Question editedQuestion){
        boolean edited = false;
        for(Question q: customQuestionList.getQuestionList()){
            if(q.getId().intValue()==editedQuestion.getId().intValue()){
                edited = Collections.replaceAll(customQuestionList.getQuestionList(), q, editedQuestion);
                break;
            }
        }
        return edited;
    }

}
