import React, { useState } from "react";
import styles from "@shared/styles/components/Form/Input.module.css";

interface SelectProps {
    name: string;
    maxWidth?: string;
    placeholder?: string;
    required?: boolean;
    value?: string | number;
    options: { label: string; value: string | number }[];
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    onFocus?: () => void;
    height?: string;
    defaultValue?: string;
    disabled?: boolean;
}



export default function CustomSelect(props: SelectProps) {
    const [error, setError] = useState<string | null>(null);
    const { name, placeholder, defaultValue, maxWidth = "330px", required = true, value, onChange, onFocus, height, disabled, options } = props;

    const handleInvalid = (e: React.FormEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setError("Este campo es requerido");
    };

    const handleInput = () => {
        if (error) {
            setError(null);
        }
    };

    return (
        <div className={`${styles.container}`} style={{ maxWidth }}>
            <select
                style={{ height }}
                onChange={onChange}
                onInvalid={handleInvalid}
                onInput={handleInput}
                className={`${styles.input} ${error && styles.inputError}`}
                name={name}
                required={required}
                value={value}
                onFocus={onFocus}
                disabled={disabled}
                defaultValue={defaultValue}
            >
                <option value="" disabled selected>
                    {placeholder || "Selecciona una opción"}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
}
