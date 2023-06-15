import React,{useRef} from 'react'
import Button from '../Button/Button'
import { useForm } from "react-hook-form";

interface AddModalProps {
    title?: string,
    onCancel: () => void,
    onSubmit: () => void,
    isDisplayed: boolean
}

function AddNoteDialog({ title, onCancel, onSubmit, isDisplayed = false }: AddModalProps) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const modalRef = useRef(null);

    function handleModalClick(e : React.SyntheticEvent) {
        e.stopPropagation()
    }

    return (
        <div className={isDisplayed ? 'backdrop--visible backdrop' : 'backdrop'} onClick={onCancel}>
            <div ref={modalRef} onClick={handleModalClick}className={isDisplayed ? 'modal--visible modal' : 'modal'}>
                <div className={'flex gap-12 justify-content-between align-items-center modal-title'}>
                    <h3>{title}</h3>
                    <h3 onClick={onCancel}>X</h3>
                </div>
                <div className={'modal-body'}>                    
                    <form className='add-form gap-12 flex flex-column ' onSubmit={handleSubmit(() => { })}>
                        <header className='flex align-items-center'>
                            <input className='input' placeholder='Enter note title' defaultValue={""} {...register('title')}></input>
                        </header>
                        <article className='flex justify-content-center'>
                            <textarea placeholder='Enter note content' className='text-area' defaultValue={""} {...register('content')} rows={10}></textarea>
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