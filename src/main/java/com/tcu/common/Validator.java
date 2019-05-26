/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tcu.common;

import java.io.File;

/**
 *
 * @author michael
 */
public class Validator {

    private static String OS = System.getProperty("os.name").toLowerCase();

    public static boolean isWindows() {

        return (OS.indexOf("win") >= 0);

    }

    public static boolean isMac() {

        return (OS.indexOf("mac") >= 0);

    }

    public static boolean isUnix() {

        return (OS.indexOf("nix") >= 0 || OS.indexOf("nux") >= 0 || OS.indexOf("aix") > 0);

    }

    public static boolean isSolaris() {

        return (OS.indexOf("sunos") >= 0);

    }

    public static String getAppPathByOS() {
        return System.getProperty("user.home")+"/.quizroulette/";
    }

    public boolean checkQuestionsFile(String fileName) {
        boolean result = false;
        File f = new File(getAppPathByOS() + "/" + fileName);
        if (f.exists()) {
            return true;
        } else {
            FileCreator fc = new FileCreator();
            result = fc.createDir(getAppPathByOS());
            result = fc.createFile(getAppPathByOS() + "/" + fileName, "{\"questions\":[]}");
        }
        return result;
    }

}
