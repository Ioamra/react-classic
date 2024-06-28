import React, { ChangeEvent, FocusEvent, useState } from 'react';

interface InputTextProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onError?: (error: boolean) => void;
    id: string;
    name: string;
    label: string;
    value: string;
    type: 'text' | 'email' | 'password';
    required: boolean;
    placeholder?: string;
    pattern?: string;
    errorMessage?: string;
}

const InputText: React.FC<InputTextProps> = ({ onChange, onError, id, name, label, value, type, required, placeholder = '', pattern = '', errorMessage = '' }) => {
    const [error, setError] = useState<string | null>(null);

    const validateField = (value: string): boolean => {
        if (required && !value) {
            setError('Ce champ est obligatoire.');
            return true;
        } else if (pattern && !new RegExp(pattern).test(value)) {
            setError(errorMessage);
            return true;
        } else {
            setError(null);
            return false;
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const isError = validateField(value);
        if (onError) {
            onError(isError);
        }
        onChange(event);
    };

    return (
        <section className='input-container'>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                name={name}
                type={type}
                className={`input--text ${error ? 'input--error' : ''}`}
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
                required={required}
            />
            {error && <span className='error-500 text--sm'>{error}</span>}
        </section>
    )
}

export default InputText;