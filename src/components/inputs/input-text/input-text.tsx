import React, { ChangeEvent, FocusEvent, useState } from 'react';

interface InputTextProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    id: string,
    name: string,
    label: string,
    value: string,
    type: 'text' | 'email' | 'password',
    required: boolean,
    placeholder?: string,
    pattern?: string,
    errorMessage?: string
}

const InputText: React.FC<InputTextProps> = ({ onChange, id, name, label, value, type, required, placeholder = '', pattern = '', errorMessage = '' }) => {
    const [error, setError] = useState<string | null>(null);

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        if (required && !value) {
            setError('Ce champ est obligatoire.');
        } else if (pattern && !new RegExp(pattern).test(value)) {
            setError(errorMessage);
        } else {
            setError(null);
        }
    };

    return (
        <section className="input-container">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                name={name}
                type={type}
                className={`input--text ${error ? 'input--error' : ''}`}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                required={required}
                onBlur={handleBlur}
            />
            {error && <span className="error-500">{error}</span>}
        </section>
    )
}

export default InputText;