/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tcu.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;
import java.math.BigInteger;
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
    private BigInteger id;
    
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

    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getPregunta() {
        return pregunta;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getGrado() {
        return grado;
    }

    public void setGrado(String grado) {
        this.grado = grado;
    }

    public List<Option> getOpciones() {
        return opciones;
    }

    public void setOpciones(List<Option> opciones) {
        this.opciones = opciones;
    }
    
    
}

@JsonTypeName("opciones")
class Option{
    @JsonProperty("texto")
    private String texto;
    
    @JsonProperty("respuestaCorrecta")
    private boolean respuestaCorrecta;
}

