/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tcu.controller;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.tcu.common.JsonUtils;
import com.tcu.core.QuestionDispatcher;
import com.tcu.core.QuestionListManager;
import com.tcu.entities.Question;
import java.io.IOException;
import java.math.BigInteger;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author michael
 */
@Controller
@RequestMapping(value = "/quizroulette/questions")
public class GameController {

    @RequestMapping(method = RequestMethod.POST, path = "/save", produces = "application/json", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<Object> saveQuestion(@RequestBody String jsonRequest, HttpServletRequest request) {
        try {
            JsonUtils jsonUtils = new JsonUtils();
            Question question = jsonUtils.convertToObject(jsonRequest, Question.class);

            QuestionDispatcher qd = new QuestionDispatcher();
            qd.saveQuestions(question);

            return new ResponseEntity<Object>(QuestionListManager.getInstance().getCustomQuestionList(), HttpStatus.OK);
        } catch (JsonMappingException ex) {
            Logger.getLogger(GameController.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        } catch (IOException ex) {
            Logger.getLogger(GameController.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        } catch (Exception ex) {
            Logger.getLogger(GameController.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    @RequestMapping(method = RequestMethod.GET, path = "/delete/{questionId}", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Object> saveQuestion(@PathVariable("questionId") String questionId) {
        BigInteger qid = new BigInteger(questionId);
        boolean result = QuestionListManager.getInstance().removeFromCustomQuestionListByID(qid);
        if (result) {
            QuestionDispatcher qd = new QuestionDispatcher();
            qd.saveListOnFile(QuestionListManager.getInstance().getCustomQuestionList());
            return new ResponseEntity<Object>(QuestionListManager.getInstance().getCustomQuestionList(), HttpStatus.OK);
        }else{
            return new ResponseEntity<Object>(new String("El id no existe"), HttpStatus.BAD_REQUEST);
        }
    }

}
