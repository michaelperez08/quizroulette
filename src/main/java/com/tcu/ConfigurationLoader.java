/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tcu;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.tcu.common.JsonUtils;
import com.tcu.core.QuestionListManager;
import com.tcu.entities.QuestionList;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.logging.Level;
import java.util.logging.Logger;


public class ConfigurationLoader {

    public boolean loadConfiguration() {

        BufferedReader br = null;
        try {
            StringBuffer sb = new StringBuffer();
            InputStream inputStream = getClass().getResourceAsStream("/config/questions.json");
            br = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }   JsonUtils jsonUtils = new JsonUtils();
            QuestionList ql = jsonUtils.convertToObject(sb.toString(), QuestionList.class);
            QuestionListManager.getInstance().init(ql);
            
            return true;
        } catch (JsonParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (JsonMappingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            try {
                br.close();
            } catch (IOException ex) {
                Logger.getLogger(ConfigurationLoader.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return false;
        
    }

}
