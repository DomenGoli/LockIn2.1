"use client"
import SavedDay from "./SavedDay";
import { useCallback, useEffect, useRef } from "react";
import TileList from "../TileList";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { saveLastDay } from "@/app/_lib/features/beBetter/betterSlice";
import { saveActsStateHashMap } from "@/app/_lib/features/currentDay/currentDayObjectSlice";
import SavedDayHeader from "./SavedDayHeader";
import { saveBetterScore } from "@/app/_lib/features/beBetter/resetBetterSlice";
import { setDaysCollection } from "@/app/_lib/features/user/userSlice";

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

type DayObjectType = {
    date: Date;
    actsArray: [];
    id: string;
    note: string;
    plan: string;
    rating: string;
    betterPoints: number;
    _id: string
};





function SavedDaysList({ dbData, actsStateHashMap, daysCollection }: {daysCollection:string, dbData: string, actsStateHashMap: Map<string, {statsArray:string[], inputsArray: string[]}>}) {
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
    const {resetDate} = useAppSelector((store) => store.resetBetter)
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
    //         days.forEach((day:DayObjectType) => {
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

    //     days.forEach((day: DayObjectType) => {
    //         for(let i=0; i < day.actsArray.length; i++) {

    //         }
    //     });
    // }

    const calculateBetterScore = useCallback(
        function calculateBetterScore():number {
            if(!dbData) return 0;
            
            let betterScore = 0;
            
            for(let i=0; i<days.length; i++) {
                if(days[i].date > resetDate) {
                    if(days[i].betterPoints) betterScore = betterScore + days[i].betterPoints
                }
            };
            return betterScore;
        },[days, dbData, resetDate]
    )

    useEffect(function() {
        if(!dbData) return;
        if(dbData && days?.length === 0) return;

        dispatch(setDaysCollection(daysCollection))
        
        const betterScore = calculateBetterScore()
        
        if(days && days?.length > 0) {
            dispatch(saveLastDay(days.at(-1)))
            dispatch(saveActsStateHashMap(actsStateHashMap))
            dispatch(saveBetterScore(betterScore))
            console.log(`Last date from DB: ${new Date(days.at(-1).date)}`);
            console.log(actsStateHashMap);
        }
        
    }, [actsStateHashMap, days, dbData, dispatch, calculateBetterScore, daysCollection])

    


    // if(error) return (<p>{error.message}</p>)


    if (!dbData || days?.length === 0)
        return (
            <div className="flex items-center justify-center">
                Ni shranjenih dni. 
            </div>
        );

    return (
        <div className="flex flex-col gap-3">
            {days?.map((day: DayObjectType, i: number) => (
                <SavedDay key={i}>
                    <SavedDayHeader day={day} />
                    <TileList
                        actsArray={day.actsArray.filter((act:ActivityType) =>
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
