import {useEffect, useRef} from 'react'


export const usePrevious = (messages)=>{
    const ref = useRef()
    useEffect(()=>{
        ref.current = messages
    })
    return ref
}

