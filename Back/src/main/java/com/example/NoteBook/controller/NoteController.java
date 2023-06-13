package com.example.NoteBook.controller;

import com.example.NoteBook.dto.NoteRequestDto;
import com.example.NoteBook.exceptions.NoteDoesntExistsException;
import com.example.NoteBook.exceptions.OldEntityVersionException;
import com.example.NoteBook.model.Note;
import com.example.NoteBook.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("notes")
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public ResponseEntity<List<Note>> getAll(){
        List<Note> notes = noteService.GetAll();
        if (notes.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(notes,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getById(@PathVariable("id") String id){
        Note note = noteService.GetOne(id);
        if (note == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(note,HttpStatus.OK);
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<Note> save(@Valid @RequestBody NoteRequestDto noteDto, BindingResult bindingResult){
        if (bindingResult.hasErrors() ){
            return new ResponseEntity(constructErrorString(bindingResult),HttpStatus.BAD_REQUEST);
        }
        Note savedNote = noteService.Save(new Note(noteDto));
        return new ResponseEntity<>(savedNote,HttpStatus.CREATED);
    }

    @ExceptionHandler(NoteDoesntExistsException.class)
    @PutMapping(path = "/{id}",consumes = "application/json")
    public ResponseEntity<Object> update(@PathVariable("id") String id,@Valid @RequestBody NoteRequestDto noteDto, BindingResult bindingResult){
        if (bindingResult.hasErrors() ){
            return new ResponseEntity(constructErrorString(bindingResult),HttpStatus.BAD_REQUEST);
        }
        try {
            Note savedNote = noteService.Update(noteDto,id);
            return new ResponseEntity<>(savedNote,HttpStatus.CREATED);
        }catch (NoteDoesntExistsException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
        catch (OldEntityVersionException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/{version}/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") String id,@PathVariable("version") Long version){
        boolean isDeleted = noteService.RemoveOne(id,version);
        if (!isDeleted){
            return new ResponseEntity<>("Couldn't delete note with id: [ "+ id +"]",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private static StringBuilder constructErrorString(BindingResult bindingResult) {
        List<FieldError> errors = bindingResult.getFieldErrors();
        StringBuilder errorString = new StringBuilder();
        errors.forEach(objectError -> errorString.append(objectError.getField().toUpperCase() + "  field is missing \n"));
        return errorString;
    }
}
