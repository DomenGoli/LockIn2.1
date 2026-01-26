"use client"
import SavedDay from "./SavedDay";
import { useEffect, useRef, useState } from "react";
import DayHeader from "./SavedDayHeader";
import TileList from "../TileList";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { saveLastDay } from "@/app/_lib/features/beBetter/betterSlice";
import { saveActsStateHashMap } from "@/app/_lib/features/currentDay/currentDayObjectSlice";

// type DayActivities = {
//     name: string;
//     inputMode: string;
//     target: string;
//     input: string
// };

type ActivityType = {
    name: string;
    inputMode: "input" | "select";
    target: string;
    input: string;
    unit: string;
    id: string;
    overUnder: string;
    width: number;
    actState: string;
    betterPriority?: string;
    comment?: string;
    // curStreak: number;
    // longestCompletedStreak: number;
    // longestUntouchedStreak: number;
};

type LoadedDataType = {
    date: Date;
    actsArray: ActivityType[];
    id: string;
    note: string;
    plan: string;
    rating: string;
    _id: string;
    betterPoints: number
};



function SavedDaysList({ dbData, actsStateHashMap }: {dbData: string, actsStateHashMap: Map}) {
    const days = JSON.parse(dbData)

    // const {
    //     isLoading,
    //     data: days,
    //     error,
    // } = useQuery({
    //     queryKey: ["days"],
    //     queryFn: getDaysApi,
    // });

    const dispatch = useAppDispatch()

    const daysEndRef = useRef<HTMLDivElement>(null);
    function scrollToBottom() {
        if (!daysEndRef.current) return;
        daysEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(scrollToBottom, [days]);

    // za filtriranje prikazovanja actov, sinhronizirano z inputDay
    const { actsArray } = useAppSelector((store) => store.dayObject);
    let existingActsIds: string[];
    if (actsArray) {
        existingActsIds = actsArray.map((act) => act.id);
    }

    /// z reactQuery
    // useEffect(function() {
    //     if(isLoading) return
    //     if(days.length === 0) return
    //     // console.log(days.at(-1));
    //     dispatch(saveLastDay(days.at(-1)))
    // }, [dispatch, days, isLoading])

    // type AuxObject = {
    //     id: string;
    //     streak: number;
    // }

    // function updateStreak() {
    //     const auxArray: AuxObject[] = []

    //     for(let i=0; i<days.at(-1).actsArray.length; i++) {
    //         days.forEach((day:LoadedDataType) => {
    //             const id = day.actsArray[i].id
    //             const actState = day.actsArray[i].actState

    //             if(!auxArray.includes((el: AuxObject) => el.id === day.actsArray[i].id)) {
    //                 const auxEle: AuxObject = {
    //                     id,
    //                     streak: 0,
    //                 }
    //                 auxArray.push(auxEle)
    //             }


    //             if(actState === "complete") auxArray[i].streak ++
    //         })
    //     }

    //     days.forEach((day: LoadedDataType) => {
    //         for(let i=0; i < day.actsArray.length; i++) {

    //         }
    //     });
    // }

    useEffect(function() {
        if(!dbData) return;
        if(dbData && days?.length === 0) return;
        if(days && days?.length > 0) {
            dispatch(saveLastDay(days.at(-1)))
            dispatch(saveActsStateHashMap(actsStateHashMap))
            console.log(`Last date from DB: ${new Date(days.at(-1).date)}`);
            console.log(actsStateHashMap);
        }
        
    }, [dbData, days, dispatch, actsStateHashMap])

    


    // if(error) return (<p>{error.message}</p>)


    if (!dbData || days?.length === 0)
        return (
            <div className="flex items-center justify-center">
                Ni shranjenih dni. CC
            </div>
        );

    return (
        <div className="flex flex-col gap-3">
            {days?.map((day: LoadedDataType, i: number) => (
                <SavedDay key={i}>
                    <DayHeader day={day} />
                    <TileList
                        actsArray={day.actsArray.filter((act: LoadedDataType) =>
                            existingActsIds.includes(act.id)
                        )}
                        tileMode="display"
                    />
                </SavedDay>
            ))}
            <div ref={daysEndRef} />
        </div>
    );
}

export default SavedDaysList;
