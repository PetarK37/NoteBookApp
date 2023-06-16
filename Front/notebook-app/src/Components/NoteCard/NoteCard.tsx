import React, { useState } from 'react'
import { Note } from '../../Services/ApiService';
import './NoteCard.css'
import '../../App.css'
import Button from '../Button/Button'
import { useForm } from "react-hook-form";
import ConfirmationModal from '../Modal/ConfirmationModal'
import { deleteNote, updateNote } from '../../Services/ApiService';
import { toast } from 'react-toastify';


interface NoteCardProps {
    note: Note,
    onDelete?: () => void
    onChange?:  (note : Note) => void
}

interface NoteEditCardProps {
    note: Note,
    onSubmit?: (note : Note) => void,
    onCancel?: () => void
}

type NoteState = 'edit' | 'display' | 'delete'

function NoteCard({ note, onDelete,onChange }: NoteCardProps) {
    const [noteState, setNoteState] = useState<NoteState>('display')

    const handleDeleteNote = async () => {
        try {
            if (onDelete) {
                await deleteNote(note.version, note.uuid.toString())
                onDelete()
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message, { toastId: "delete" })
            }
        }
    }

    return (
        <div className='note gap-12 flex flex-column '>
            {(noteState === 'display' || noteState === 'delete') && <NoteCardDisplayContent note={note}></NoteCardDisplayContent>}
            {(noteState === 'edit') && <NoteCardEditContent note={note} 
            onSubmit={(note: Note) =>{
                onChange && onChange(note);
                setNoteState('display')
                }} 
            onCancel={() => setNoteState('display')}></NoteCardEditContent>}
            {(noteState === 'display' || noteState === 'delete') &&
                <div className='note-action-row flex justify-content-between'>

                    <Button text='Edit' onClick={() => { setNoteState('edit') }} className='btn-larger btn-edit'></Button>
                    <Button text='Delete' onClick={() => { setNoteState('delete') }} className='btn-larger btn-delete'></Button>
                </div>
            }
            <ConfirmationModal title='Are you shure that you want to delete this note?' content={<DeleteModalBody />} onOk={() => handleDeleteNote()} onCancel={() => { setNoteState('display') }} isDisplayed={noteState === 'delete'}></ConfirmationModal>
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

    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    
    const handleUpdateNote = async () => {
        try {
            if (onSubmit) {
                const editedNote = await updateNote (note.version, note.uuid.toString(),
                    {
                        title: getValues("title"),
                        content: getValues("content")
                    })
                onSubmit(editedNote as Note)
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message, { toastId: "delete" })
            }
        }
    }

    return (
        <form className='eidt-form gap-12 flex flex-column ' onSubmit={handleSubmit(handleUpdateNote)}>
            <header className='card flex align-items-center'>
                <input className={`${errors.title ? 'invalid ' : ''}input`} placeholder={`${errors.title ? "This feild is required!" : 'Enter note title'}`} defaultValue={note.title} {...register('title', { required: true })}></input>
            </header>
            <article className='flex justify-content-center'>
                <textarea placeholder={`${errors.content ? "This feild is required!" : 'Enter note content'}`} className={`${errors.content ? 'invalid ' : ''}text-area`} defaultValue={note.content} {...register('content', { required: true })} rows={10}></textarea>
            </article>
            <div className='note-action-row flex justify-content-between'>
                <Button btnType='submit' text='Save' className='btn-larger btn-edit'></Button>
                <Button btnType='button' text='Cancel' onClick={onCancel} className='btn-larger btn-delete'></Button>
            </div>
        </form>)
}

function DeleteModalBody() {
    return (<div className='flex justify-content-center align-items-center' style={{ fontSize: '2rem', padding: '0 24px 24px 24px' }}> <p>This action can not be undone.</p></div>)
}

export default NoteCard