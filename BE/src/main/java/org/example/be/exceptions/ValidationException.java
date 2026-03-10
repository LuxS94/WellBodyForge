package org.example.be.exceptions;


import java.util.List;


public class ValidationException extends RuntimeException {

    private List<String> errorsList;

    public ValidationException(List<String> errorsList) {
        super("Errors in validation");

        this.errorsList = errorsList;
    }

    public List<String> getErrorsList() {
        return errorsList;
    }
}
