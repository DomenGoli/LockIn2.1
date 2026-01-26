import { useEffect, useRef } from "react";

export function useOutsideModalClick(handler: () => void){
    const ref = useRef<any | null>(null)

    useEffect(function(){
        // handleClick more bit, da lahko tudi naredimo cleanup
        // const first = document.getElementsByClassName("first")
        // const second = document.getElementById('second');
        function handleClick(e: Event) {
            // if(ref.current != modal) return

            // if(ref.current && !ref.current.contains(e.target) && (!ref.current.contains(first) && !ref.current.contains(second))) handler();
            if(ref.current && !ref.current.contains(e.target)) handler();
            // if(document.getElementById("modal"))

        }

        document.addEventListener("click", handleClick, true)
        return () => document.removeEventListener("click", handleClick, true)
    },[handler])

    return {ref}
}