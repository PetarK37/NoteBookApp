import React,{useRef} from 'react'
import Button from '../Button/Button'
import { useForm } from "react-hook-form";
import { Note } from '../../Services/ApiService';
import { toast } from 'react-toastify';
import { addNote } from '../../Services/ApiService';

interface AddModalProps {
    title?: string,
    onCancel: () => void,
    onSubmit: (note : Note) => void,
    isDisplayed: boolean
}

function AddNoteDialog({ title, onCancel, onSubmit, isDisplayed = false }: AddModalProps) {

    const { register, handleSubmit, getValues, formState: { errors },reset } = useForm({mode: "onBlur"});
    const modalRef = useRef(null);

    function handleModalClick(e : React.SyntheticEvent) {
        e.stopPropagation()
    }

    function closeModal(){
        onCancel();
        reset();
    }

    const handleAddNote = async () => {
        if(errors.title || errors.content){
            return;
        }
        try{
            const note = await addNote(
                {
                    title: getValues("title"),
                    content: getValues("content")
                }
            )
            onSubmit(note);
            closeModal();
        }catch(error){
            if(error instanceof Error){
                toast.error(error.message,{toastId: "postNote"})
              }
        }
    }

    return (
        <div className={isDisplayed ? 'backdrop--visible backdrop' : 'backdrop'} onClick={closeModal}>
            <div ref={modalRef} onClick={handleModalClick}className={isDisplayed ? 'modal--visible modal' : 'modal'}>
                <div className={'flex gap-12 justify-content-between align-items-center modal-title'}>
                    <h3>{title}</h3>
                    <h3 onClick={closeModal}>X</h3>
                </div>
                <div className={'modal-body'}>                    
                    <form className='add-form gap-12 flex flex-column ' onSubmit={handleSubmit(handleAddNote)}>
                        <header className='flex align-items-center'>
                            <input className={`${errors.title ? 'invalid ' : ''}input`} placeholder={`${errors.title ? "This feild is required!" : 'Enter note title'}`} defaultValue={""} {...register('title',{ required: true })}></input>
                        </header>
                        <article className='flex justify-content-center'>
                            <textarea placeholder={`${errors.content ? "This feild is required!" : 'Enter note content'}`} className={`${errors.content ? 'invalid ' : ''}text-area`} defaultValue={""} {...register('content',{ required: true})} rows={10}></textarea>
                        </article>
                        <div className='flex justify-content-between'>
                            <Button btnType='submit' text='Add note' className='btn-larger btn-save margin-l-auto'></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
}

export default AddNoteDialog