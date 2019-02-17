/**
 * 
 */
package com.tcu.common;

import java.io.DataOutput;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author njimenez
 *
 */
public class JsonUtils {

  private ObjectMapper mapper = new ObjectMapper();
  private String convertionErrorMessage;

  public JsonUtils() {
    mapper.configure(DeserializationFeature.FAIL_ON_NUMBERS_FOR_ENUMS, false);
    mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    mapper.configure(DeserializationFeature.READ_ENUMS_USING_TO_STRING, false);
  }

  public <T> T convertToObject(String jsonInString, Class<T> valueType) throws JsonParseException, JsonMappingException, IOException {
    return (T) mapper.readValue(jsonInString, valueType);
  }

  /**
   * Transforms an object to JSON notation. In case transformation is not
   * possible logs an error and returns null.
   * 
   * @param obj
   * @return
   * @throws JsonProcessingException
   */
  public String convertToJSON(Object obj) throws JsonProcessingException {
    if ((obj == null) || obj.equals(""))
      return "";
    else
      // Object to JSON in String
      return mapper.writeValueAsString(obj);
  }

  public void convertToJSON(Object obj, DataOutput output) throws IOException {
    mapper.writeValue(output, obj);
  }

  public String getConvertionErrorMessage() {
    return convertionErrorMessage;
  }

  public Map<String, Object> convertToMap(String jsonStr) throws JsonParseException, JsonMappingException, IOException {
    Map<String, Object> map = new HashMap<String, Object>();
    map = mapper.readValue(jsonStr, new TypeReference<Map<String, Object>>() {
    });
    return map;
  }
}