import React, { useState } from 'react'
import './ExistingNotesSection.css'
import Button from '../Button/Button';
import NoteCard from '../NoteCard/NoteCard';
import AddNoteDialog from '../Modal/AddNoteDialog';

export interface Note {
  uuid: React.Key
  title: string,
  content: string,
  version: number,
}



function ExistingNotesSection() {
  const [notes, setNotes] = useState<Array<Note>>([{uuid: "Test",title:"test title",content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",version:1},{uuid: "Test2",title:"test title 2",content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",version:1}]);
  const [showAddDialog,setShowAddDialog] = useState(false);

  return (
    <div className='notes-list gap-12 container flex flex-column justify-content-center'>
      <Button onClick={() => setShowAddDialog(true)} text={'Add new note'} className='btn-full add-note-btn' iconPosition='R' icon={AddIcon()}></Button>
      {(notes?.length !== undefined && notes.length > 0) && 
        notes.map(note => {
          return <NoteCard note={note} key={note.uuid}></NoteCard>
        })
      }
     {!(notes?.length !== undefined && notes.length > 0) && <div className='flex justify-content-center align-items-center no-data-container'>
      <p>There are no existing notes, feel free to add one.</p>
      </div>} 
      <AddNoteDialog isDisplayed={showAddDialog} onCancel={() => setShowAddDialog(false)} onSubmit={() => {}} title='Add new note'></AddNoteDialog>
    </div>
  )
}

function AddIcon(){
  return(
    <span className='icon'>+</span>    
  )
}

export default ExistingNotesSection