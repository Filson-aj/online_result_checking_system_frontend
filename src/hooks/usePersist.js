import { useState, useEffect } from 'react'

const usePersist = () =>{
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('remember')) || false)

    useEffect(() =>{
        localStorage.setItem('remember', JSON.stringify(persist))
    }, [persist])

    return [persist, setPersist]
}

export default usePersist