import { useEffect, useState } from 'react'
import './ExistingNotesSection.css'
import Button from '../Button/Button';
import NoteCard from '../NoteCard/NoteCard';
import AddNoteDialog from '../Modal/AddNoteDialog';
import { Note } from '../../Services/ApiService';
import { getNotes } from '../../Services/ApiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ExistingNotesSection() {
  const [notes, setNotes] = useState<Note[]>();
  const [showAddDialog,setShowAddDialog] = useState(false);

  useEffect(() => {
    fetchNotes();
  },[])

  const fetchNotes = async () => {
    try{
      const notes = await getNotes();
      setNotes(notes)
    }catch(error){
      if(error instanceof Error){
        toast.error(error.message,{toastId: "getAll"})
      }
    }
  }

  function addNote(note : Note){
    const newNotes = [note,...notes as Note[]]
    setNotes(newNotes)
  }

  function removeNote(uuid: string){
    const newNotes = notes?.filter(n => n.uuid !== uuid)
    setNotes(newNotes)
  }

  function updateNote(note: Note){
    const newNotes = notes?.map(n =>{
      if(n.uuid === note.uuid){
        n.content = note.content;
        n.title = note.title;
        n.version = note.version;
        return n;
      }else{
        return n;
      }
    })
    setNotes(newNotes)
  }

  return (
    <div className='notes-list gap-12 container flex flex-column justify-content-center'>
      <Button onClick={() => setShowAddDialog(true)} text={'Add new note'} className='btn-full add-note-btn' iconPosition='R' icon={AddIcon()}></Button>
      {(notes?.length !== undefined && notes.length > 0) && 
        notes.map(note => {
          return <NoteCard note={note} key={note.uuid} onDelete={() => removeNote(note.uuid.toString())} onChange={(note : Note) => updateNote(note)}></NoteCard>
        })
      }
     {!(notes?.length !== undefined && notes.length > 0) && <div className='flex justify-content-center align-items-center no-data-container'>
      <p>There are no existing notes, feel free to add one.</p>
      </div>} 
      <AddNoteDialog isDisplayed={showAddDialog} onCancel={() => setShowAddDialog(false)} onSubmit={(note : Note) => {addNote(note)}} title='Add new note'></AddNoteDialog>
    </div>
  )
}

function AddIcon(){
  return(
    <span className='icon'>+</span>    
  )
}

export default ExistingNotesSection