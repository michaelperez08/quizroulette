/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tcu.core;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tcu.common.FileCreator;
import com.tcu.common.Validator;
import com.tcu.entities.Question;
import com.tcu.entities.QuestionList;

/**
 *
 * @author michael
 */
public class QuestionDispatcher {
    
    public static String JSON_PREGUNTAS = "preguntas.json";
    private FileCreator fl;

    public boolean saveQuestions(Question q) throws Exception {
        
        QuestionListManager.getInstance().getCustomQuestionList().getQuestionList().add(q);
        QuestionList ql = QuestionListManager.getInstance().getCustomQuestionList();
        
        ObjectMapper Obj = new ObjectMapper();
        String filecontent = Obj.writeValueAsString(ql);
        fl = new FileCreator();

        return fl.createFile(getQuestionsFileName(), filecontent);
    }
    
    public String getQuestionsFileName(){
        return Validator.getAppPathByOS()+JSON_PREGUNTAS;
    }
    
}
