package com.example.NoteBook.exceptions;

public class NoteDoesntExistsException extends Exception{
    public NoteDoesntExistsException(String message){
        super(message);
    }
}
