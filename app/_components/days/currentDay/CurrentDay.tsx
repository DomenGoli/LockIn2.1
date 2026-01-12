"use client"

import { useAppSelector } from "@/app/hooks";
import TileList from "../TileList";
import CurrentDayHeader from "./CurrentDayHeader";

export default function CurrentDay() {
    const { actsArray } = useAppSelector((store) => store.dayObject);

    

    return (
        <div className="grid bg-(--day)">
            <CurrentDayHeader />
            <TileList
                tileMode={"input"}
                actsArray={actsArray}
            />
        </div>
    );
}
