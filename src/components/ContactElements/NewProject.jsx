import React, { useRef } from 'react';
import Input from '../Inputs/Input.jsx';
import Modal from './Modal.jsx';

export default function NewProject({ onAdd, onCancel }) {
    const modal = useRef();

    const Name = useRef();
    const PhoneNumber = useRef();
    const Date = useRef();

    function handleSave() {
        const enteredName = Name.current.value;
        const enteredPhoneNumber = PhoneNumber.current.value;
        const enteredDate = Date.current.value;

        if (
            enteredName.trim() === '' ||
            enteredPhoneNumber.trim() ==='' ||
            enteredDate.trim() === ''
        ) {
            modal.current.open();
            return;
        }

        onAdd({
            name: enteredName,
            phone_Number: enteredPhoneNumber,
            date: enteredDate,
        });
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="Okay">
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">
                    Oops ... looks like you forgot to enter a value.
                </p>
                <p className="text-stone-600 mb-4">
                    Please make sure you provide a valid value for every input field.
                </p>
            </Modal>
            <div className="w-[35rem] mt-16 ml-96">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button
                            className="text-stone-800 hover:text-stone-950"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input type="text" ref={Name} label="Name" />
                    <Input type="text" ref={PhoneNumber} label="Phone Number" />
                    <Input type="date" ref={Date} label="Date" />
                </div>
            </div>
        </>
    );
}
