package com.example.NoteBook.model;

import com.example.NoteBook.dto.NoteRequestDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;


@Data
@NoArgsConstructor
@Entity
@Table(name = "notes")
public class Note {
    @Id
    private String uuid;
    @Column(nullable = false)
    private String Title;
    @Column(nullable = false)
    private String Content;

    public Note(NoteRequestDto note){
        this.Title = note.getTitle();
        this.Content = note.getContent();
        this.uuid = UUID.randomUUID().toString();
    }
}
