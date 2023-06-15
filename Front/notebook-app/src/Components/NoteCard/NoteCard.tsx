import React, { useState } from 'react'
import { Note } from '../ExistingNotesSection/ExistingNotesSection'
import './NoteCard.css'
import '../../App.css'
import Button from '../Button/Button'
import { useForm } from "react-hook-form";
import ConfirmationModal from '../Modal/ConfirmationModal'

interface NoteCardProps {
    note: Note,
}
interface NoteEditCardProps {
    note: Note,
    onSubmit?: () => void,
    onCancel?: () => void
}

type NoteState = 'edit' | 'display' | 'delete'

function NoteCard({ note }: NoteCardProps) {
    const [noteState, setNoteState] = useState<NoteState>('display')

    return (
        <div className='note gap-12 flex flex-column '>
            {(noteState === 'display' || noteState === 'delete') && <NoteCardDisplayContent note={note}></NoteCardDisplayContent>}
            {(noteState === 'edit') && <NoteCardEditContent note={note} onCancel={() => setNoteState('display')}></NoteCardEditContent>}
            {(noteState === 'display' || noteState === 'delete') &&
                <div className='note-action-row flex justify-content-between'>
                    
                        <Button text='Edit' onClick={() => { setNoteState('edit') }} className='btn-larger btn-edit'></Button>
                        <Button text='Delete' onClick={() => { setNoteState('delete') }} className='btn-larger btn-delete'></Button>
                    </div>
                }
            <ConfirmationModal title='Are you shure that you want to delete this note?' content={<DeleteModalBody />} onOk={() => alert("ok")} onCancel={() => { setNoteState('display') }} isDisplayed={noteState === 'delete'}></ConfirmationModal>
        </div>

    )
}

function NoteCardDisplayContent({ note }: NoteCardProps) {
    return (<>
        <header className='card flex align-items-center'>
            <p>{note.title}</p>
        </header>
        <article className='card flex justify-content-center'>
            {note.content}
        </article></>)
}

function NoteCardEditContent({ note, onCancel, onSubmit }: NoteEditCardProps) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    return (
        <form className='eidt-form gap-12 flex flex-column ' onSubmit={handleSubmit(() => { })}>
            <header className='card flex align-items-center'>
                <input className='input' defaultValue={note.title} {...register('title')}></input>
            </header>
            <article className='card flex justify-content-center'>
                <textarea className='text-area' defaultValue={note.content} {...register('content')} rows={10}></textarea>
            </article>
            <div className='note-action-row flex justify-content-between'>
                <Button btnType='submit' text='Save' className='btn-larger btn-edit'></Button>
                <Button btnType='button'  text='Cancel' onClick={onCancel} className='btn-larger btn-delete'></Button>
            </div>
        </form>)
}

function DeleteModalBody() {
    return (<div className='flex justify-content-center align-items-center' style={{ fontSize: '2rem', padding: '0 24px 24px 24px' }}> <p>This action can not be undone.</p></div>)
}

export default NoteCard