'use client'

import React, { useState } from "react";
import styles from "@shared/styles/components/Form/Input.module.css";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

interface InputProps {
    type: string;
    name: string;
    maxWidth?: string;
    placeholder?: string;
    required?: boolean
    pattern?: string
    value?: string | number
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onFocus?: () => void;
    height?: string
    isMoneyInput?: boolean;
    disabled?: boolean
    min?: number;
    defaultValue?: string | number;
}

export default function CustomInput(props: InputProps) {
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { type, placeholder, name, maxWidth = '330px', required = true, pattern, value, onChange, onFocus, height, disabled = false, isMoneyInput = false, } = props;

    const handleShowPass = () => {
        setShowPassword((prev) => !prev)
    }

    const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { type } = e.target as HTMLInputElement;
        if (type === 'email') {
            setError('Correo no valido')
            return
        }

        if (type === 'number') {
            setError('El valor debe ser numerico')
            return
        }

        setError('Este campo es requerido')
    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)

        }
    }


    return (
        <div
            className={`${styles.container} ${isMoneyInput ? styles.moneyContainer : ""}`}
            style={{ maxWidth }}
        >
            {isMoneyInput && <span className={styles.moneyLabel}>RD$</span>}
            <input
                style={{ height }}
                onChange={onChange}
                onInvalid={handleInvalid}
                className={`${styles.input} ${error && styles.inputError}`}
                type={showPassword ? "text" : type}
                name={name}
                placeholder={placeholder}
                required={required}
                onInput={handleInput}
                pattern={pattern}
                value={value}
                onFocus={onFocus}
                disabled={disabled}
                min={props.min}
                defaultValue={props.defaultValue}
            />
            {type === "password" && (
                <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={handleShowPass}
                >
                    {showPassword ? <IconEyeOff strokeWidth={1} /> : <IconEye strokeWidth={1} />}
                </button>
            )}
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
}
