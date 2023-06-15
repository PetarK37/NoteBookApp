import React from 'react'
import {Note} from '../ExistingNotesSection/ExistingNotesSection'
import './NoteCard.css'
import Button from '../Button/Button'

interface NoteCardProps{
    note : Note
}

function NoteCard({note} : NoteCardProps) {
  return (
    <div className='note gap-8 flex flex-column '>
        <header className='card flex align-items-center'>
            <p>{note.title}</p>
        </header>
        <article className='card flex justify-content-center'>
            {note.content}
        </article>
        <div className='note-action-row flex justify-content-between'>
            <Button text='Edit' className='btn-larger btn-edit'></Button>
            <Button text='Delete' className='btn-larger btn-delete'></Button>
        </div>
    </div>
  )
}

export default NoteCard