"use client";

import Button from "@/app/_ui/Button";
import toast from "react-hot-toast";
import { getDateFormat } from "@/app/_lib/helpers";
import { FormEvent, useState } from "react";
import StarRating from "../../../_ui/StarRating";
import AddAct from "./AddAct";
import NoteButton from "@/app/_ui/NoteButton";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createDayApi } from "../../../service/apiDays";
// import { updateBetterScore } from "../../better/betterSlice";
import { pointsConfig } from "@/app/_lib/features/beBetter/pointsConfig";
import { saveDay } from "@/app/_lib/features/currentDay/currentDayObjectSlice";
import { closeDiary } from "@/app/_lib/features/diary/diarySlice";
import { saveDayToDatabaseAction } from "@/app/_lib/service/actions";
import { differenceInCalendarDays } from "date-fns";
import { updateBetterScore } from "@/app/_lib/features/beBetter/betterSlice";

// const today = new Date();

function CurrentDayHeader() {
    const dispatch = useAppDispatch();
    const { actsArray, note, plan } = useAppSelector(
        (store) => store.dayObject
    );
    const [date] = useState(new Date().getTime());
    const [rating, setRating] = useState(0);
    const { lastDay } = useAppSelector((store) => store.better);

    // const queryClient = useQueryClient();
    // const { mutate, isPending: uploading } = useMutation({
    //     mutationFn: createDayApi,
    //     onSuccess: () => {
    //         toast.success("Dan je bil uspesno shranjen!");
    //         queryClient.invalidateQueries({
    //             queryKey: ["days"],
    //         });
    //     },
    //     onError: (err) => toast.error(err.message)
    // });
    const [rerenderRating, forceRerenderRating] = useState(Math.random);

    function handleSavingDay(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!rating) {
            toast("Oceni svoj dan!", { icon: "⭐⭐⭐" });
            return;
        }
        const betterPoints = calculateBetterEveryDayScore();
        dispatch(updateBetterScore(betterPoints));
        // mutate({date, actsArray, rating, note, plan, betterPoints}) // za reactQuery
        try {
            saveDayToDatabaseAction({
                date,
                actsArray,
                rating,
                note,
                plan,
                betterPoints,
            });
            toast.success("Dan je bil uspesno shranjen!")
        } catch (err) {
            console.log(err);
        }

        dispatch(saveDay());
        dispatch(closeDiary());
        setRating(0);
        // forceRerenderRating(Math.random());
    }

    function calculateBetterEveryDayScore(): number {
        let points = 0;
        actsArray.forEach((act) => {
            let curScore = 0;
            const lastDayActivity = lastDay.actsArray?.filter(
                (lastAct) => lastAct.name === act.name
            )[0];

            if (act.betterPriority === "none") curScore = 0;
            else if (
                !act.actState ||
                act.actState === "untouched" ||
                act.actState === ""
            ) {
                if (!act.betterPriority || act.betterPriority === "major")
                    curScore = pointsConfig.UNTOUCHED_MAJOR;
                if (act.betterPriority === "minor")
                    curScore = pointsConfig.UNTOUCHED_MINOR;
                curScore =
                    lastDayActivity?.actState === "untouched" ||
                    lastDayActivity?.actState === ""
                        ? curScore * pointsConfig.STREAK
                        : curScore;
            } else if (act.actState === "completed") {
                if (act.betterPriority === "major")
                    curScore = pointsConfig.COMPLETED_MAJOR;
                if (act.betterPriority === "minor")
                    curScore = pointsConfig.COMPLETED_MINOR;

                const daysAgoSavedDay = differenceInCalendarDays(
                    new Date(),
                    new Date(lastDay.date)
                );
                if (daysAgoSavedDay <= 1) {
                    // const lastDayActivity = lastDay.actsArray?.filter(lastAct => lastAct.name === act.name)[0]
                    // if(lastDayActivity?.actState === "completed") curScore = curScore * pointsConfig.STREAK
                    curScore =
                        lastDayActivity?.actState === "completed"
                            ? curScore * pointsConfig.STREAK
                            : curScore;
                }
            } else if (act.actState === "attempted")
                curScore = pointsConfig.ATTEMPTED;
            points = points + curScore;
            console.log(`${act.name}: ${curScore}`);
        });
        return points;
    }

    return (
        <div className="flex gap-3 p-1">
            <p>{getDateFormat(date)}</p>
            <AddAct />
            <NoteButton planData={plan} data={note} />
            {/* <Form onSubmit={(e) => handleSavingDay(e)}>
                <Button>{uploading ? "Uploading" : "Shrani dan"}</Button>
            </Form> */}
            <form onSubmit={handleSavingDay}>
                <Button>Shrani dan</Button>
            </form>
            <label>Oceni svoj dan:</label>
            <StarRating
                maxRating={10}
                size={24}
                color="#d9d9d9"
                onSetRating={setRating}
                key={rerenderRating}
            />
        </div>
    );
}

export default CurrentDayHeader;
