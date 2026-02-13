"use client";
import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
    saveLastDailyCheckTime,
    updateBetterScore,
} from "@/app/_lib/features/beBetter/betterSlice";
import { pointsConfig } from "../../_lib/features/beBetter/pointsConfig";
import { differenceInCalendarDays, sub } from "date-fns";
import {
    hideMassiveAction,
    saveDay,
    showMassiveAction,
    toggleMassiveAction,
} from "@/app/_lib/features/currentDay/currentDayObjectSlice";
import toast from "react-hot-toast";
import {
    saveMultipleDaysToDatabaseAction,
} from "@/app/_lib/actions/dataActions";
import { resetScore } from "@/app/_lib/features/beBetter/resetBetterSlice";
// import { saveMultipleDaysToDatabaseAction } from "@/app/_lib/service/actions copy";

function BeBetter() {
    const {
        // betterScore,
        deltaScore,
        lastDay: { date: lastSavedDayDate },
        lastDailyCheck,
    } = useAppSelector((store) => store.better);
    const { betterScoreNew } = useAppSelector((store) => store.resetBetter);
    const { actsArray } = useAppSelector((store) => store.dayObject);
    const { isNoteOpen } = useAppSelector((store) => store.diary);
    const { daysCollection } = useAppSelector((store) => store.user);
    const dispatch = useAppDispatch();

    const todayRef = useRef(new Date());

    const isDailyCheckDone = useCallback(
        function isDailyCheckDone(): boolean {
            return (
                todayRef.current.setHours(0, 0, 0, 0) ===
                lastDailyCheck.setHours(0, 0, 0, 0)
            );
        },
        [lastDailyCheck],
    );

    function handleReset() {
        dispatch(resetScore(new Date().getTime()));
    }

    function handleMFA() {
        dispatch(toggleMassiveAction());
    }
    // console.log(`today: ${todayRef.current.setHours(0, 0, 0, 0)}`);

    const calculateMissedDays = useCallback(
        function calculateMissedDays(): number | null {
            // ce je danes ze checkiru razliko med datumih, takoj returna 0
            console.log(`lastsaveddate: ${new Date(lastSavedDayDate)}`);
            console.log(`lastdatechecked: ${new Date(lastDailyCheck)}`);

            // Guard clause zaradi asynch fetchanja zadnjega dneva iz database
            if (!lastSavedDayDate) return null;

            // checkira ce je danes ze preveril missed days
            if (isDailyCheckDone()) return null;

            const missedDays =
                differenceInCalendarDays(todayRef.current, lastSavedDayDate) -
                1;
            console.log(`Missed days: ${missedDays}`);

            // oznaci da je bil danes ze opravljen Daily Check
            dispatch(saveLastDailyCheckTime(todayRef.current));

            // if(missedDays) {
            //     toast(`Izpustili ste ${missedDays} ${missedDays>1 ? "dni" : "dan"}`)

            //     const today = new Date()
            //     const day= today.getDate()
            //     const month = today.getMonth()
            //     const year= today.getFullYear()

            //     for(let i=missedDays; i=0; i--) {
            //         const date = new Date(`${year}, ${month}, ${day-i}`)
            //         saveDayToDatabaseAction({
            //                         date,
            //                         actsArray,
            //                         rating: 0,
            //                         note: "Izpuscen dan",
            //                         plan: "",
            //                         betterPoints,
            //                     })
            //     }

            // }

            return missedDays;
        },
        [dispatch, lastDailyCheck, lastSavedDayDate, isDailyCheckDone],
    );

    const calculateMissedDaysScore = useCallback(
        function calculateMissedDaysScore(): number {
            const missedDays = calculateMissedDays();

            if (!missedDays) return 0;

            toast(
                `Izpustili ste ${missedDays} ${missedDays > 1 ? "dni" : "dan"}`,
                { duration: 5000 },
            );
            const points =
                missedDays * actsArray.length * pointsConfig.UNTOUCHED_MAJOR;

            // Doda izpuscene dneve v day listo
            const daysToSave = [];
            for (let i = missedDays; i > 0; i--) {
                const newDay = {
                    date: sub(new Date(), { days: i }).getTime(),
                    actsArray,
                    rating: 0,
                    note: "Izpuscen dan",
                    plan: "",
                    betterPoints: points / missedDays,
                };
                daysToSave.push(newDay);
            }
            try {
                saveMultipleDaysToDatabaseAction(daysCollection, daysToSave);
            } catch (err) {
                console.log(err);
            }
            dispatch(saveDay()); // resetira cached inpute v localStoragu
            return points;
        },
        [calculateMissedDays, actsArray, dispatch, daysCollection],
    );

    // logika za Massive Fucking Action day. 30% moznost da je "on"
    useEffect(
        function () {
            if (!isDailyCheckDone()) {
                dispatch(hideMassiveAction());
                const random = Math.random();
                if (random < 0.3) dispatch(showMassiveAction());
            }
        },
        [dispatch, lastDailyCheck, isDailyCheckDone],
    );

    // preveri ce smo izpustili dan in zracuna penale
    useEffect(
        function () {
            const missedDaysScore = calculateMissedDaysScore();
            // if (missedDaysScore) dispatch(saveLastDailyCheckTime(todayRef.current));

            dispatch(updateBetterScore(missedDaysScore));
        },
        [dispatch, calculateMissedDaysScore],
    );

    if (isNoteOpen) return null;

    return (
        <div className="flex flex-col justify-between">
            <div className="flex mt-12 flex-col gap-2 text-center">
                <p className="text-2xl">Be better every day</p>
                <div>
                    <p>Score</p>
                    <div className="flex flex-row justify-center gap-1 text-3xl">
                        {betterScoreNew?.toFixed(1)}%
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

                <div className="flex flex-col mt-14 items-center gap-5">
                    <button
                        className="border rounded-2xl w-20 cursor-pointer"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleMFA}
                        className="border rounded-2xl w-20 cursor-pointer"
                    >
                        MFA
                    </button>
                </div>
            </div>
            <div className="flex w-full justify-center mb-5">
                <p className="text-center">
                    It&apos;s how you feel about yourself<br></br> when you are
                    by yourself
                </p>
            </div>
        </div>
    );
}

export default BeBetter;

// console.log(differenceInCalendarDays(new Date(2025, 12, 10), new Date(2025, 12, 8)))
//              {betterScore.toFixed(1)}%
