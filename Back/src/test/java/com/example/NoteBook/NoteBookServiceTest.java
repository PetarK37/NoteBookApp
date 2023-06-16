package com.example.NoteBook;

import com.example.NoteBook.dto.NoteRequestDto;
import com.example.NoteBook.exceptions.NoteDoesntExistsException;
import com.example.NoteBook.exceptions.OldEntityVersionException;
import com.example.NoteBook.model.Note;
import com.example.NoteBook.repository.NoteRepository;
import com.example.NoteBook.service.Impl.NoteServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class NoteBookServiceTest {
    @Mock
    NoteRepository noteRepository;
    @InjectMocks
    NoteServiceImpl noteService;

    @Test
    public void testUpdate() throws Exception{
        // Set up test environment
        String noteId = "9ab8c862-0ec5-4ce0-94fb-208345f6f75b";
        Long version = 1L;

        // Create a mock Note object
        NoteRequestDto noteDto = new NoteRequestDto("Updated title","Updated content");
        Note expectedResult = new Note(noteId,"Updated title","Updated content",version+1);
        // Mock the behavior of noteRepository.findById()
        when(noteRepository.findById(noteId)).thenReturn(Optional.ofNullable(new Note(noteId,"Test","Test",1L)));

        // Mock the behavior of noteRepository.removeByUuid()
        when(noteRepository.save(any(Note.class))).thenReturn(expectedResult);

        // Perform the test
        Note result = noteService.Update(noteDto,noteId, version);

        // Assert the result
        assertTrue(result.equals(expectedResult));

        // Verify that noteRepository.findById() was called with the expected parameters
        verify(noteRepository).findById(noteId);

        // Verify that noteRepository.removeByUuid() was called
        verify(noteRepository).save(any(Note.class));
    }

    @Test
    public void testUpdateUnsuccessful() throws Exception{
        // Set up test environment
        String noteId = "9ab8c862-0ec5-4ce0-94fb-208345f6f75b";
        Long version = 1L;

        // Create a mock Note object
        NoteRequestDto noteDto = new NoteRequestDto("Updated title","Updated content");

        // Mock the behavior of noteRepository.findById()
        when(noteRepository.findById(noteId)).thenReturn(Optional.ofNullable(new Note(noteId,"Test","Test",2L)));
        when(noteRepository.findById("test")).thenReturn(Optional.empty());

        // Assert the result
        assertThrows(OldEntityVersionException.class, () ->{noteService.Update(noteDto,noteId, version);});
        assertThrows(NoteDoesntExistsException.class, () ->{ noteService.Update(noteDto,"test",version);});

        // Verify that noteRepository.findById() was called with the expected parameters
        verify(noteRepository).findById(noteId);

        // Verify that noteRepository.save() was not called
        verify(noteRepository,never()).save(any(Note.class));
    }

    @Test
    public void testRemoveOne() {
        // Set up test environment
        String noteId = "9ab8c862-0ec5-4ce0-94fb-208345f6f75b";
        Long version = 1L;

        // Create a mock Note object
        Note note = new Note();
        note.setVersion(version);

        // Mock the behavior of noteRepository.findById()
        when(noteRepository.findById(noteId)).thenReturn(Optional.ofNullable(note));

        // Mock the behavior of noteRepository.removeByUuid()
        when(noteRepository.removeByUuid(noteId)).thenReturn(1L);

        // Perform the test
        boolean result = noteService.RemoveOne(noteId, version);

        // Assert the result
        assertTrue(result);

        // Verify that noteRepository.findById() was called with the expected parameters
        verify(noteRepository).findById(noteId);

        // Verify that noteRepository.removeByUuid() was called
        verify(noteRepository).removeByUuid(noteId);
    }

    @Test
    public void testUnsuccessfulRemoveOne() {
        // Create a mock Note objects
        Note firstNote = new Note("9ab8c862-0ec5-4ce0-94fb-208345f6f75b","test","test",1l);
        Note secondNote = new Note("6ab8c862-0ec5-4ce0-94fb-208345f6f75f","test","test",2l);


        // Mock the behavior of noteRepository.findById()
        when(noteRepository.findById(firstNote.getUuid())).thenReturn(Optional.ofNullable(firstNote));
        when(noteRepository.findById(secondNote.getUuid())).thenReturn(Optional.ofNullable(secondNote));
        when(noteRepository.findById("test")).thenReturn(Optional.empty());


        // Mock the behavior of noteRepository.removeByUuid()
        when(noteRepository.removeByUuid(firstNote.getUuid())).thenReturn(0L);

        // Perform the test
        boolean firstResult = noteService.RemoveOne(firstNote.getUuid(), 1L);
        boolean secondResult = noteService.RemoveOne(secondNote.getUuid(), 1L);
        boolean thirdResult = noteService.RemoveOne("test", 1L);

        // Assert the result
        assertFalse(firstResult);
        assertFalse(secondResult);
        assertFalse(thirdResult);

        // Verify that noteRepository.findById() was called with the expected parameters
        verify(noteRepository).findById(firstNote.getUuid());
        verify(noteRepository).findById(secondNote.getUuid());
        verify(noteRepository).findById("test");

        // Verify that noteRepository.removeByUuid() was called
        verify(noteRepository).removeByUuid(firstNote.getUuid());

        // Verify that noteRepository.removeByUuid() was not called
        verify(noteRepository, never()).removeByUuid(secondNote.getUuid());
        verify(noteRepository, never()).removeByUuid("test");
    }


}
