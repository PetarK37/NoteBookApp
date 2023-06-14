package com.example.NoteBook;

import com.example.NoteBook.controller.NoteController;
import com.example.NoteBook.dto.NoteRequestDto;
import com.example.NoteBook.exceptions.NoteDoesntExistsException;
import com.example.NoteBook.exceptions.OldEntityVersionException;
import com.example.NoteBook.model.Note;
import com.example.NoteBook.service.NoteService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.test.web.servlet.MockMvc;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class NoteBookControllerTests {

	public static final String API_URL = "/notes";
	ObjectMapper objectMapper = new ObjectMapper();

	@Autowired
	private  NoteController noteController;
	@Autowired
	private MockMvc mockMvc;
	@MockBean
	private NoteService noteService;

	@Test
	void contextLoads() {
		assertThat(noteController).isNotNull();
	}

	@Test
	public void testSaveValidNote() throws Exception {
		NoteRequestDto noteDto = new NoteRequestDto("Valid title","Valid description");

		// Set up the expected note to be returned by the service
		Note createdNote = new Note("9ab8c862-0ec5-4ce0-94fb-208345f6f75b",noteDto.getTitle(),noteDto.getContent(),0L);

		// Mock the service behavior
		when(noteService.Save(any(Note.class))).thenReturn(createdNote);

		// Perform the POST request
		mockMvc.perform(post(API_URL)
				.content(objectMapper.writeValueAsString(noteDto))
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.uuid").value(createdNote.getUuid()))
				.andExpect(jsonPath("$.title").value(createdNote.getTitle()))
				.andExpect(jsonPath("$.content").value(createdNote.getContent()));

		// Verify that the service method was called with the expected note
		verify(noteService).Save(any(Note.class));
	}

	@Test
	public void testSaveInvalidValidNote() throws Exception {
		//Creating multiple cases of DTO objects
		NoteRequestDto noTitleNote = new NoteRequestDto("","Valid description");
		NoteRequestDto noContentNote = new NoteRequestDto("Valid title","");
		NoteRequestDto nullNote = new NoteRequestDto(null,null);
		NoteRequestDto emptyNote = new NoteRequestDto("","");

		// Perform the POST request
		mockMvc.perform(post(API_URL)
						.content(objectMapper.writeValueAsString(noTitleNote))
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andExpect(content().string(containsString("TITLE field is missing")));

		mockMvc.perform(post(API_URL)
						.content(objectMapper.writeValueAsString(noContentNote))
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andExpect(content().string(containsString("CONTENT field is missing")));

		mockMvc.perform(post(API_URL)
						.content(objectMapper.writeValueAsString(emptyNote))
						.contentType(MediaType.APPLICATION_JSON))
						.andExpect(status().isBadRequest())
						.andExpect(content().string(containsString("CONTENT field is missing")))
						.andExpect(content().string(containsString("TITLE field is missing")));

		mockMvc.perform(post(API_URL)
						.content(objectMapper.writeValueAsString(nullNote))
						.contentType(MediaType.APPLICATION_JSON))
						.andExpect(status().isBadRequest())
						.andExpect(content().string(containsString("CONTENT field is missing")))
						.andExpect(content().string(containsString("TITLE field is missing")));

		// Verify that the service method was not called
		verifyNoInteractions(noteService);
	}

	@Test
	public void testGetNoteById() throws Exception {
		// Set up the expected note to be returned by the service
		Note expectedNote = new Note("9ab8c862-0ec5-4ce0-94fb-208345f6f75b","Test title","Test content",0L);

		// Mock the service behavior
		when(noteService.GetOne(expectedNote.getUuid())).thenReturn(expectedNote);

		// Perform the POST request
		mockMvc.perform(get(API_URL+"/{id}",expectedNote.getUuid()))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.uuid").value(expectedNote.getUuid()))
				.andExpect(jsonPath("$.title").value(expectedNote.getTitle()))
				.andExpect(jsonPath("$.content").value(expectedNote.getContent()));

		// Verify that the service method was called with the expected note
		verify(noteService).GetOne(any(String.class));
	}

	@Test
	public void testInvalidGetNoteById() throws Exception {
		// Mock the service behavior
		when(noteService.GetOne(any(String.class))).thenReturn(null);

		// Perform the POST request
		mockMvc.perform(get(API_URL+"/{id}", UUID.randomUUID().toString()))
				.andExpect(status().isNotFound());

		// Verify that the service method was called with the expected note
		verify(noteService).GetOne(any(String.class));
	}

	@Test
	public void testGetAllNotesEmpty() throws Exception {
		// Mock the service behavior
		when(noteService.GetAll()).thenReturn(new ArrayList<Note>());

		// Perform the POST request
		mockMvc.perform(get(API_URL))
				.andExpect(status().isNotFound())
				.andExpect(jsonPath("$",hasSize(0)));
		// Verify that the service method was called with the expected note
		verify(noteService).GetAll();
	}

	@Test
	public void testGetAllNotes() throws Exception {
		// Set up the expected notes to be returned by the service
		List<Note> expectedNotes =  Arrays.asList(
				new Note("9ab8c862-0ec5-4ce0-94fb-208345f6f75b","Test title","Test content",0L),
				new Note("6ab8c862-0ec5-4ce0-94fb-208345f6f75h","Test title 2","Test content 2",0L));

		// Mock the service behavior
		when(noteService.GetAll()).thenReturn(expectedNotes);

		// Perform the POST request
		mockMvc.perform(get(API_URL))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$",hasSize(expectedNotes.size())))
				.andExpect(jsonPath("$[0].uuid").value(expectedNotes.get(0).getUuid()))
				.andExpect(jsonPath("$[0].title").value(expectedNotes.get(0).getTitle()))
				.andExpect(jsonPath("$[0].content").value(expectedNotes.get(0).getContent()));
		// Verify that the service method was called with the expected note
		verify(noteService).GetAll();
	}

	@Test
	public void testUpdateSuccessful() throws Exception {
		// Set up test environment
		String noteId = "9ab8c862-0ec5-4ce0-94fb-208345f6f75b";
		Long version = 1L;
		NoteRequestDto noteDto = new NoteRequestDto("Updated Title", "Updated Content");
		Note updatedNote = new Note(noteId, noteDto.getTitle(), noteDto.getContent(), version + 1);

		// Mock the behavior of noteService.Update() to return the updated note
		when(noteService.Update(noteDto, noteId, version)).thenReturn(updatedNote);

		// Perform the PUT request
		mockMvc.perform(put(API_URL+"/{version}/{id}", version, noteId)
						.content(objectMapper.writeValueAsString(noteDto))
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.uuid").value(updatedNote.getUuid()))
				.andExpect(jsonPath("$.title").value(updatedNote.getTitle()))
				.andExpect(jsonPath("$.content").value(updatedNote.getContent()))
				.andExpect(jsonPath("$.version").value(updatedNote.getVersion()));

		// Verify that noteService.Update() was called with the expected parameters
		verify(noteService).Update(noteDto, noteId, version);
	}

	@Test
	public void testUpdateNotExists() throws Exception {
		// Set up test environment
		String noteId = "9ab8c862-0ec5-4ce0-94fb-208345f6f75b";
		Long version = 1L;
		NoteRequestDto noteDto = new NoteRequestDto("Updated Title", "Updated Content");
		Note updatedNote = new Note(noteId, noteDto.getTitle(), noteDto.getContent(), version + 1);

		// Mock the behavior of noteService.Update() to return the updated note
		when(noteService.Update(noteDto, noteId, version)).thenThrow(new NoteDoesntExistsException("Note with id: [" + noteId + "] doesnt exist"));
		// Perform the PUT request
		mockMvc.perform(put(API_URL+"/{version}/{id}", version, noteId)
						.content(objectMapper.writeValueAsString(noteDto))
						.contentType(MediaType.APPLICATION_JSON))
						.andExpect(status().isNotFound())
						.andExpect(content().string("Note with id: [" + noteId + "] doesnt exist"));

		// Verify that noteService.Update() was called with the expected parameters
		verify(noteService).Update(noteDto, noteId, version);
	}

	@Test
	public void testUpdateOldVersion() throws Exception {
		// Set up test environment
		String noteId = "9ab8c862-0ec5-4ce0-94fb-208345f6f75b";
		Long version = 0L;
		NoteRequestDto noteDto = new NoteRequestDto("Updated Title", "Updated Content");

		// Mock the behavior of noteService.Update() to return the updated note
		when(noteService.Update(noteDto, noteId, version)).thenThrow(new OldEntityVersionException("You can not update older version of a note"));
		// Perform the PUT request
		mockMvc.perform(put(API_URL+"/{version}/{id}", version, noteId)
						.content(objectMapper.writeValueAsString(noteDto))
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isConflict())
				.andExpect(content().string("You can not update older version of a note"));

		// Verify that noteService.Update() was called with the expected parameters
		verify(noteService).Update(noteDto, noteId, version);
	}

	@Test
	public void testDeleteSuccessful() throws Exception{
		// Set up test environment
		String noteId = "9ab8c862-0ec5-4ce0-94fb-208345f6f75b";
		Long version = 0L;

		// Mock the behavior of noteService.RemoveOne() to return true
		when(noteService.RemoveOne(noteId,version)).thenReturn(true);

		//Perform DELETE request
		mockMvc.perform(delete(API_URL+"/{version}/{id}", version, noteId))
				.andExpect(status().isOk());

		// Verify that noteService.Update() was called with the expected parameters
		verify(noteService).RemoveOne(noteId,version);
	}

	@Test
	public void testDeleteUnsuccessful() throws Exception{
		// Set up test environment
		String noteId = "9ab8c862-0ec5-4ce0-94fb-208345f6f75b";
		Long version = 0L;

		// Mock the behavior of noteService.RemoveOne() to return true
		when(noteService.RemoveOne(noteId,version)).thenReturn(false);

		//Perform DELETE request
		mockMvc.perform(delete(API_URL+"/{version}/{id}", version, noteId))
				.andExpect(status().isInternalServerError())
				.andExpect(content().string("Couldn't delete note with id: [ "+ noteId +"]"));

		// Verify that noteService.RemoveOne() was called with the expected parameters
		verify(noteService).RemoveOne(noteId,version);
	}

}
