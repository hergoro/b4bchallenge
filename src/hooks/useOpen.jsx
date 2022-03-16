import { useState } from "react";

const useOpen = (valorInicial = false) => {
    const [open, setOpen] = useState(valorInicial);

    const handleClick = () => {
        setOpen(!open)
    }

    const handleClickAway = () => {
        setOpen(false)
    }

    return {
        open,
        setOpen,
        handleClick,
        handleClickAway
    }
}

export default useOpen;