"use client"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
// import { getShortDateFormat } from "../../utils/helpers";
import { saveNoteToLocalStorage } from "@/app/_lib/features/currentDay/currentDayObjectSlice";
import { getShortDateFormat } from "@/app/_lib/helpers";

function Note() {
    const {note, date, dayId} = useAppSelector(store => store.diary)
    const [value, setValue] = useState(() => note)
    const {isNoteOpen} = useAppSelector(store => store.diary)
    

    //Resitev za stale state
    useEffect(function() {
        setValue(note)
    }, [note])


    const dispatch = useAppDispatch();


    function handleSavingNote() {
        dispatch(saveNoteToLocalStorage(value));
    }

    if(!isNoteOpen) return null

    return (
        <div className="flex flex-col justify-center items-center pb-4">
            <p>Dnevnik: {dayId === "0" ? "Danes" : getShortDateFormat(date)}</p>
            <textarea
                className="w-75 h-75 bg-stone-100 text-black p-1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleSavingNote}
                disabled={dayId === "0" ? false : true}
                defaultValue="Splaniraj dan!"
            />
        </div>
    );
}

export default Note;

