package com.example.NoteBook.service;

import com.example.NoteBook.dto.NoteRequestDto;
import com.example.NoteBook.exceptions.NoteDoesntExistsException;
import com.example.NoteBook.exceptions.OldEntityVersionException;
import com.example.NoteBook.model.Note;

import java.util.List;

public interface NoteService {
    Note GetOne(String id);
    List<Note> GetAll();
    Boolean RemoveOne(String id,Long version);
    Note Save(Note note);
    Note Update(NoteRequestDto noteDto,String id,Long version) throws NoteDoesntExistsException, OldEntityVersionException;

}
