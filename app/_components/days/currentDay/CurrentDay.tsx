"use client"

import { useAppSelector } from "@/app/hooks";
import TileList from "../TileList";
import CurrentDayHeader from "./CurrentDayHeader";
import MassiveAction from "@/app/_ui/MassiveAction";

export default function CurrentDay() {
    const { actsArray, isMassiveActionOpen } = useAppSelector((store) => store.dayObject);

    

    return (
        <div className="grid bg-(--day)">
            {isMassiveActionOpen && <MassiveAction />}
            <CurrentDayHeader />
            <TileList
                tileMode={"input"}
                actsArray={actsArray}
            />
        </div>
    );
}

//  min-w-[1010px]
