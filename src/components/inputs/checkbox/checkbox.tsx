import React, { ChangeEvent } from 'react';

interface CheckboxProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    id: string;
    name: string;
    label: string;
    value: string;
    required: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ onChange, id, name, label, value, required }) => {
    return (
        <section className='checkbox-container'>
            <input
                id={id}
                name={name}
                type='checkbox'
                className='input--checkbox'
                onChange={onChange}
                value={value}
                required={required}
            />
            <label htmlFor={id}>{label}</label>
        </section>
    )
}

export default Checkbox;