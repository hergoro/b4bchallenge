import { useState } from 'react';

export function getFromLocalStorage (key: string, initialValue: string) {
    try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
    } catch (error) {
        return initialValue
    }
}

export function useLocalStorage (key: string, initialValue: string) {
    const [storedValue, setStoredValue] = useState(() => {
        return getFromLocalStorage(key, initialValue)
    });

    const setValue = (valor: any) => {
        try {
            setStoredValue(valor)
            window.localStorage.setItem(key, valor.toJSON ? valor.toJSON : JSON.stringify(valor))
        } catch (error) {
            console.log(error)
        }
    }
    return [storedValue, setValue]
}