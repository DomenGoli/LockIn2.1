"use client"
import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
    resetScore,
    saveLastDateReference,
    updateBetterScore,
} from "@/app/_lib/features/beBetter/betterSlice";
import { pointsConfig } from "../../_lib/features/beBetter/pointsConfig";
import { differenceInCalendarDays } from "date-fns";

function BeBetter() {
    const {
        betterScore,
        deltaScore,
        lastDay: { date: lastSavedDayDate },
        lastDayChecked,
    } = useAppSelector((store) => store.better);
    const { actsArray } = useAppSelector((store) => store.dayObject);
    const { isNoteOpen } = useAppSelector((store) => store.diary);
    const dispatch = useAppDispatch();

    const todayRef = useRef(new Date());

    function handleReset() {
        dispatch(resetScore());
    }
    // console.log(`today: ${todayRef.current.setHours(0, 0, 0, 0)}`);

    const calculateMissedDays = useCallback(
        function calculateMissedDays(): number | null {
            // console.log(
            //     `test: ${new Date()} ${differenceInCalendarDays(
            //         new Date().setHours(0, 0, 0, 0),
            //         new Date(2026, 0, 2).setHours(0, 0, 0, 0)
            //     )}`
            // );
            // ce je danes ze checkiru razliko med datumih, takoj returna 0
            console.log(`lastsaveddate: ${new Date(lastSavedDayDate)}`);
            console.log(`lastdatechecked: ${new Date(lastDayChecked)}` );

            // Guard clause zaradi asynch fetchanja zadnjega dneva iz database
            if (!lastSavedDayDate) return null; 

            // checkira ce je danse ze preveril missed days
            if (
                todayRef.current.setHours(0, 0, 0, 0) ===
                lastDayChecked.setHours(0, 0, 0, 0)
            )
                return null;

            const missedDays =
                differenceInCalendarDays(todayRef.current, lastSavedDayDate) - 1;
            console.log(`Missed days: ${missedDays}`);
            return missedDays;
        },
        [lastDayChecked, lastSavedDayDate]
    );

    const calculateMissedDaysScore = useCallback(
        function calculateMissedDaysScore(): number {
            const missedDays = calculateMissedDays();
            if (!missedDays) return 0;
            return missedDays * actsArray.length * pointsConfig.UNTOUCHED_MAJOR;
        },
        [actsArray.length, calculateMissedDays]
    );

    useEffect(
        function () {
            const missedDaysScore = calculateMissedDaysScore();
            if (missedDaysScore)
                dispatch(saveLastDateReference(todayRef.current));

            dispatch(updateBetterScore(missedDaysScore));
        },
        [dispatch, calculateMissedDaysScore]
    );

    
    if (isNoteOpen) return null;

    return (
        <div className="flex flex-col justify-between">
            <div className="flex mt-12 flex-col gap-2 text-center">
                <p className="text-2xl">Be better every day</p>
                <div>
                    <p>Score</p>
                    <div className="flex flex-row justify-center gap-1 text-3xl">
                        {betterScore?.toFixed(1)}%
                        {deltaScore != 0 && (
                            <p
                                style={{
                                    color: deltaScore >= 0 ? "green" : "red",
                                }}
                            >
                                ({deltaScore.toFixed(1)})
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-14">
                    <button
                        className="border rounded-2xl w-20 cursor-pointer"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
            </div>
            <div className="flex w-full justify-center mb-5">
                <p className="text-center">
                    It&apos;s how you feel about yourself<br></br> when you are by
                    yourself
                </p>
            </div>
        </div>
    );
}

export default BeBetter;

// console.log(differenceInCalendarDays(new Date(2025, 12, 10), new Date(2025, 12, 8)))
//              {betterScore.toFixed(1)}%
