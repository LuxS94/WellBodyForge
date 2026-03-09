package org.example.be.exceptions;

import org.apache.coyote.BadRequestException;
import org.example.be.dto.ErrorDTO;
import org.example.be.dto.ErrorsDTO;
import org.springframework.http.HttpStatus;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorsHandler {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    public ErrorDTO handleBadRequest(BadRequestException ex) {
        return new ErrorDTO(ex.getMessage());
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(AlreadyExists.class)
    public ErrorDTO handleBadRequest(AlreadyExists ex) {
        return new ErrorDTO(ex.getMessage());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public ErrorDTO handleBadRequest(NotFoundException ex) {
        return new ErrorDTO(ex.getMessage());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UnauthorizedException.class)
    public ErrorDTO handleBadRequest(UnauthorizedException ex) {
        return new ErrorDTO(ex.getMessage());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(ValidationException.class)
    public ErrorsDTO handleBadRequest(ValidationException ex) {
        return new ErrorsDTO(ex.getErrorsList());
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorDTO handleAuthorizationDenied(AuthorizationDeniedException ex) {
        return new ErrorDTO(ex.getMessage());
    }
}
