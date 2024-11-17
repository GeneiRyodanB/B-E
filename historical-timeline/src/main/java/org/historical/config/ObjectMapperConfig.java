package org.historical.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.jackson.ObjectMapperCustomizer;
import jakarta.inject.Singleton;

@Singleton
public class ObjectMapperConfig implements ObjectMapperCustomizer {

    @Override
    public void customize(ObjectMapper objectMapper) {
        objectMapper.setDefaultPropertyInclusion(
                com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL);
    }
}
