"use client"
// import { useLoaderData } from "react-router";
import SavedDay from "./SavedDay";
// import { getDaysApi } from "../../../service/apiDays";
import { useEffect, useRef, useState } from "react";
import DayHeader from "./SavedDayHeader";
import TileList from "../TileList";
import { useAppDispatch, useAppSelector } from "../../../hooks";
// import { useQuery } from "@tanstack/react-query";
// import Spinner from "@/app/_ui/Spinner";
// import { differenceInCalendarDays } from "date-fns";
import { saveLastDay } from "@/app/_lib/features/beBetter/betterSlice";

// type DayActivities = {
//     name: string;
//     inputMode: string;
//     target: string;
//     input: string
// };

type LoadedDataType = {
    date: Date;
    actsArray: [];
    id: string;
    note: string;
    plan: string;
    rating: string;
    _id: string;
    betterPoints: number
};

function SavedDaysList({ dbData }: {dbData: string}) {
    // const [days, setDays] = useState()
    // const days = dbData ? JSON.parse(dbData) : [];
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

    

    useEffect(function() {
        if(!dbData) return;
        if(dbData && days?.length === 0) return;
        if(days && days?.length > 0) dispatch(saveLastDay(days.at(-1)))
    }, [dbData, days, dispatch])


    // if(error) return (<p>{error.message}</p>)


    if (!dbData || days?.length === 0)
        return (
            <div className="flex items-center justify-center">
                Ni shranjenih dni.
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
