"use client"
import styles from '@shared/styles/components/Form/AutoComplete.module.css'
import { useState, useEffect, useRef } from 'react'

export interface Option {
  label: string
  value: string
}


interface AutoCompleteProps {
  options: Option[]
  onInput?: (value: string) => void
  onSelect?: (value: string, label: string) => void
  freeOption?: boolean
  placeholder?: string
  disabled?: boolean
  maxWidth?: string
  value?: string
}

export function AutoComplete({
  options = [],
  onInput,
  onSelect,
  freeOption = false,
  placeholder = '',
  disabled = false,
  maxWidth = '330px',
  value = ''
}: AutoCompleteProps) {
  const [inputValue, setInputValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null)
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [hasSelectedOption, setHasSelectedOption] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastValidOption = useRef<Option | null>(null)

  useEffect(() => {
    const option = options.find(opt => opt.value === value)
    if (option) {
      setInputValue(option.label)
      lastValidOption.current = option
      setHasSelectedOption(true)
    }
  }, [value, options])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        if (!hasSelectedOption) {
          if (lastValidOption.current) {
            setInputValue(lastValidOption.current.label)
          } else {
            setInputValue('')
          }
        }
        setHasSelectedOption(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [hasSelectedOption])

  useEffect(() => {
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )
    setFilteredOptions(filtered)
  }, [options, inputValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setIsOpen(true)
    setHighlightedIndex(-1)
    setHasSelectedOption(false)
    onInput?.(value)
  }

  const handleSelect = (option: Option) => {
    setInputValue(option.label)
    lastValidOption.current = option
    setHasSelectedOption(true)
    setIsOpen(false)
    onSelect?.(option.value, option.label)
    setSelectedCategory(option)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true)
        return
      }
    }

    let currentOptions = filteredOptions
    if (freeOption && inputValue) {
      currentOptions = [{ label: inputValue, value: inputValue }, ...filteredOptions]
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev =>
          prev < currentOptions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : currentOptions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && currentOptions[highlightedIndex]) {
          handleSelect(currentOptions[highlightedIndex])
        } else if (freeOption && inputValue) {
          const freeOptionSelected = { label: inputValue, value: inputValue }
          handleSelect(freeOptionSelected)
        }
        break
      case 'Escape':
        setIsOpen(false)
        if (lastValidOption.current) {
          setInputValue(lastValidOption.current.label)
        } else {
          setInputValue('')
        }
        break
    }
  }

  const handleFocus = () => {
    setIsOpen(true)
    setHasSelectedOption(false)
  }
  return (
    <div ref={containerRef} className={styles.container} style={{ maxWidth }}>
      <input
        type="text"
        className={styles.input}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeholder={placeholder}
        disabled={disabled}
      />

      {isOpen && (filteredOptions.length > 0 || (freeOption && inputValue)) && (
        <div className={styles.dropdown}>
          {freeOption && inputValue && (
            <div
              className={`${styles.option} ${styles.freeOption} ${highlightedIndex === 0 ? styles.optionHighlighted : ''
                }`}
              onClick={() => handleSelect({ label: inputValue, value: inputValue })}
            >
              {inputValue}
            </div>
          )}
          {filteredOptions.map((option, index) => (
            <div
              key={option.value}
              className={`${styles.option} ${highlightedIndex === (freeOption && inputValue ? index + 1 : index)
                ? styles.optionHighlighted
                : ''
                }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}