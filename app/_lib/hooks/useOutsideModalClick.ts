import { useEffect, useRef } from "react";

export function useOutsideModalClick(handler: () => void){
    const ref = useRef<any | null>(null)

    useEffect(function(){
        // handleClick more bit, da lahko tudi naredimo cleanup
        function handleClick(e: Event) {
            if(ref.current && !ref.current.contains(e.target)) handler();

        }

        document.addEventListener("click", handleClick, true)
        return () => document.removeEventListener("click", handleClick, true)
    },[handler])

    return {ref}
}