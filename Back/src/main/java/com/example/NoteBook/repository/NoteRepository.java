package com.example.NoteBook.repository;

import com.example.NoteBook.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, String> {
    Note save(Note note);
    Long removeByUuid(String uuid);
    List<Note> findAll();
    Optional<Note> findById(String uuid);

}
