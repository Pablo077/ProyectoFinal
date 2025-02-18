package com.dh.Back.exception;

import com.dh.Back.controller.DireccionController;
import org.apache.log4j.Logger;

public class ResourceNotFoundException extends Exception {
    private static final Logger LOGGER = Logger.getLogger(ResourceNotFoundException.class);
    public ResourceNotFoundException(String message) {
        super(message);
        LOGGER.warn(message);
    }
}
