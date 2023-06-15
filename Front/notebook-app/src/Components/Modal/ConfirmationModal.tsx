import React, { Children } from 'react'
import Button from '../Button/Button'
import './Modal.css'

interface ModalProps {
    title?: string,
    content: React.ReactElement,
    onCancel: () => void,
    onOk: () => void,
    isDisplayed: boolean
}
function ConfirmationModal({ title, content, onCancel, onOk, isDisplayed = false }: ModalProps) {
    return (
        <div className={isDisplayed ? 'backdrop--visible backdrop' : 'backdrop'} onClick={onCancel}>
            <div className={isDisplayed ? 'modal--visible modal' : 'modal'}>
                <div className={'flex gap-12 justify-content-between align-items-center modal-title'}>
                    <h3>{title}</h3>
                    <h3 onClick={onCancel}>X</h3>
                </div>
                <div className={'modal-body'}>
                    {content}
                </div>
                <div className='flex gap-12'>
                <Button text='Cancel' onClick={onCancel}  className='btn-larger btn-delete margin-l-auto'></Button>
                <Button text='Ok' onClick={onOk} className='btn-larger btn-edit '></Button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal