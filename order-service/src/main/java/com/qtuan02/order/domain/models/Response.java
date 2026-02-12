package com.qtuan02.order.domain.models;

import org.springframework.http.HttpStatus;

public record Response<T>(Integer statusCode, String message, T data, Integer errorCode, String errorMessage) {
    // Success response
    public static <T> Response<T> success(T data, String message) {
        return new Response<>(HttpStatus.OK.value(), message, data, null, null);
    }

    public static <T> Response<T> success(String message) {
        return new Response<>(HttpStatus.OK.value(), message, null, null, null);
    }

    public static <T> Response<T> created(T data, String message) {
        return new Response<>(HttpStatus.CREATED.value(), message, data, null, null);
    }

    public static <T> Response<T> noContent(String message) {
        return new Response<>(HttpStatus.NO_CONTENT.value(), message, null, null, null);
    }

    // Error response
    public static <T> Response<T> error(HttpStatus status, String errorMessage) {
        return new Response<>(status.value(), null, null, status.value(), errorMessage);
    }

    public static <T> Response<T> error(HttpStatus status, Integer errorCode, String errorMessage) {
        return new Response<>(status.value(), null, null, errorCode, errorMessage);
    }
}
