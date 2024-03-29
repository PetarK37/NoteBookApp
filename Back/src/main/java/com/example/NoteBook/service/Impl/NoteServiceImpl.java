package com.example.NoteBook.service.Impl;

import com.example.NoteBook.dto.NoteRequestDto;
import com.example.NoteBook.exceptions.NoteDoesntExistsException;
import com.example.NoteBook.exceptions.OldEntityVersionException;
import com.example.NoteBook.model.Note;
import com.example.NoteBook.repository.NoteRepository;
import com.example.NoteBook.service.NoteService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;

    public NoteServiceImpl(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @Override
    public Note GetOne(String id) {
        return noteRepository.findById(id).orElse(null);
    }

    @Override
    public List<Note> GetAll() {
        return noteRepository.findAll();
    }

    @Override
    @Transactional
    public Boolean RemoveOne(String id,Long version ) {
        Note note = noteRepository.findById(id).orElse(null);
        if (note == null || version < note.getVersion()){
            return false;
        }else{
            return noteRepository.removeByUuid(id) > 0;
        }
    }

    @Override
    public Note Save(Note note) {
        return  noteRepository.save(note);
    }

    @Override
    public Note Update(NoteRequestDto noteDto,String id,Long version) throws NoteDoesntExistsException,OldEntityVersionException {
        Note note = noteRepository.findById(id).orElse(null);
        if (note == null){
            throw new NoteDoesntExistsException("Note with id: [" + id + "] doesnt exist");
        }
        if (version < note.getVersion()){
            throw new OldEntityVersionException("You can not update older version of a note");
        }
        note.setTitle(noteDto.getTitle());
        note.setContent(noteDto.getContent());
        return noteRepository.save(note);
    }
}
