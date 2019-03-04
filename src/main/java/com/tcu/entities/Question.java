/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tcu.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;
import java.util.List;

/**
 *
 * @author michael

 * 
 */
@JsonTypeName("question")
@JsonInclude(JsonInclude.Include.NON_NULL)

public class Question {
    
    @JsonProperty("id")
    private int id;
    
    @JsonProperty("imagen")
    private String imagen;
    
    @JsonProperty("pregunta")
    private String pregunta;
    
    @JsonProperty("area")
    private String area;
    
    @JsonProperty("grado")
    private String grado;
    
    @JsonProperty("opciones")
    private List<Option> opciones;
}

@JsonTypeName("opciones")
class Option{
    @JsonProperty("texto")
    private String texto;
    
    @JsonProperty("respuestaCorrecta")
    private boolean respuestaCorrecta;
}