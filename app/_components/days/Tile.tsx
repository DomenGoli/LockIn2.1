"use client";
import { useEffect, useRef, useState } from "react";
import { saveInputLocalStorage } from "@/app/_lib/features/currentDay/currentDayObjectSlice";
import { useAppDispatch } from "../../hooks";
import UpdateAct from "./currentDay/UpdateAct";
// import icons from "../../ui/icons";

type DayObjectType = {
    name: string;
    input: string;
    inputMode: string;
    target: string;
    unit: string;
    overUnder: string;
    id: string;
    width: number;
    actState?: string;
    betterPriority?: string;
};

type TilePropsType = {
    tileMode: string;
    act: DayObjectType;
};

export default function Tile({ tileMode, act }: TilePropsType) {
    const dispatch = useAppDispatch();
    const [input, setInput] = useState(() => act.input);
    const [width, setWidth] = useState(0);

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(function () {
        setWidth(ref.current ? ref.current.offsetWidth : 0);
    }, []);

    // Za stale state ob savingDay()
    useEffect(
        function () {
            setInput(act.input);
        },
        [act],
    );

    function handleSavingInput(): void {
        const actState = getActState();
        dispatch(saveInputLocalStorage(act.name, input, width, actState));
    }

    function handleSavingSelect(e: string): void {
        setInput(e);
        const actState = getActState(e);
        dispatch(saveInputLocalStorage(act.name, e, width, actState));
    }

    function getActState(selectedInput?: string) {
        switch (act.inputMode) {
            case "select":
                return selectedInput === "Da" ? "completed" : "untouched";
            case "input":
                if (input === "0" || !input) return "untouched";
                if (act.overUnder === "over")
                    return Number(input) >= Number(act.target)
                        ? "completed"
                        : "attempted";
                else
                    return Number(input) < Number(act.target)
                        ? "completed"
                        : "attempted";
        }
    }

    function getTileColor() {
        switch (getActState(input)) {
            case "completed":
                return "bg-[var(--green)]";
            case "attempted":
                return "bg-[var(--red)]";
            default:
                return "bg-[var(--red)]";
        }
    }

    function getMinWidth() {
        if (tileMode === "display") {
            return `min-w-24`;
        } else return "min-w-22";
    }

    return (
        <div
            //ref={ref} //  ZAKAJ SM TO DAL TUKAJ??????? Je obsolete? Bilo za dolocanje sirine vsakega Tila. Obsolete
            className={`grid ${getMinWidth()} px-1 text-black ${getTileColor()}`}
        >
            <div className="flex items-center justify-between">
                {tileMode === "display" && (
                    <p className="flex justify-center w-full">{act.name}</p>
                )}

                {tileMode !== "display" && <UpdateAct actToUpdate={act} />}
            </div>

            <div className="flex gap-1 justify-center">
                {/* ////////////////  Presentational */}
                {tileMode === "display" && (
                    <span className="">{act.input}</span>
                )}

                {/* ////////////////  Statefull za Input day */}
                {tileMode === "input" && act.inputMode === "input" && (
                    <span className="">
                        <input
                            type="number"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onBlur={handleSavingInput}
                            className="pl-0.5 bg-(--ozadje) w-15 hover:border-(--ER-text) border-black border text-(--ER-text)"
                            placeholder="0"
                            onFocus={(e) => {
                                e.target.value =
                                    e.target.value === "0" ? "" : input;
                            }}
                        />
                    </span>
                )}

                {tileMode === "input" && act.inputMode === "select" && (
                    <select
                        value={input}
                        onChange={(e) => handleSavingSelect(e.target.value)}
                    >
                        <option value="Da">Da</option>
                        <option value="Ne">Ne</option>
                    </select>
                )}

                {act.inputMode === "input" && <p>{act.unit}</p>}
            </div>
        </div>
    );
}
