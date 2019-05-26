/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tcu.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tcu.entities.QuestionList;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author michael
 */
public class FileCreator {

    public boolean createFile(String filename, String filecontent) {
        try {
            File f = new File(filename);
            if (f.exists()) {
                f.delete();
            }

            f.createNewFile();
            FileOutputStream fos = new FileOutputStream(f);
            byte[] contentbytes = filecontent.getBytes();
            fos.write(contentbytes);
            fos.flush();
            fos.close();
            return true;
        } catch (IOException ex) {
            Logger.getLogger(FileCreator.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    public boolean createDir(String path) {
        File theDir = new File(path);
        // if the directory does not exist, create it
        if (!theDir.exists()) {
            System.out.println("creating directory: " + theDir.getName());
            boolean result = false;

            try {
                theDir.mkdir();
                result = true;
            } catch (SecurityException se) {
                //handle it
            }
            if (result) {
                System.out.println("DIR created");
                return true;
            }
        }else{
            return true;
        }
        return false;
    }

}
