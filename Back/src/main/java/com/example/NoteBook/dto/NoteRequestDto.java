package com.example.NoteBook.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoteRequestDto {
    @NotBlank
    private String title;
    @NotBlank
    private String content;
}
