"use client"

import { useAppSelector } from "../hooks";

function Statistics({id, name}: {id: string, name: string}) {
    const { actsStateHashMap } = useAppSelector((store) => store.dayObject);
    const { statsArray, inputsArray } = actsStateHashMap?.get(id)
    
    
    function getTimeSpent(): number {
        let timeSpent = 0;
        inputsArray.forEach((input: number) => {
            if(!isNaN(input)) timeSpent = timeSpent + Number(input)
        })


        return timeSpent
    }

    function getLongestStreak(mode: string): number {
        let maxCount = 0;
        let count = 0;

        for (let i = 0; i < statsArray?.length; i++) {
            const curStatus = statsArray[i];

            if (mode === "completed") {
                if (curStatus === mode) count++;
                else count = 0;
                if (count > maxCount) maxCount = count;
            } else if (mode === "untouched") {
                if (curStatus === mode || curStatus === "") count++;
                else count = 0;
                if (count > maxCount) maxCount = count;
            }
        }
        return maxCount;
    }

    function getCompletitionPercent(){
        const totalActs = statsArray.length;
        let totalCompleted = 0;

        for (let i = 0; i < statsArray?.length; i++) {
            if(statsArray[i] === "completed") totalCompleted++
        }

        return totalCompleted / totalActs * 100
    }

    function getCurrentStreak(): string {
        if (statsArray) return statsArray[0];
        else return "/";
    }

    function getCurrentStreakCount(): number {
        let currentStreakCount = !statsArray ? 0 : 1;
        if (statsArray) {
            for (let i = 1; i < statsArray?.length; i++) {
                if (statsArray[i] === statsArray[i - 1]) currentStreakCount++;
                else break;
            }
        }
        return currentStreakCount;
    }

    function getStreakName(actState: string): string {
        switch (actState) {
            case "completed":
                return '"Completed"';
            case "untouched":
                return '"Untouched"';
            case "":
                return '"Untouched"';
            case "attempted":
                return '"Not finished"';
            default:
                return "/";
        }
    }

    return (
        <div className="flex flex-col gap-2">
                        <p className="text-center">Stats for {name}</p>
                        <div className="flex gap-1">
                            <span>Current streak:</span>
                            <span style={{color: getCurrentStreak() === "completed" ? "green" : "red"}}>
                                {getStreakName(getCurrentStreak()) || "/"}
                            </span>
                            <span>({getCurrentStreakCount()}</span>
                            <span>{getCurrentStreakCount() === 1 ? "day" : "days"})</span>
                        </div>
                        
                        <div className="flex gap-1">
                            <span>Longest Completed streak:</span>
                            <span>{getLongestStreak("completed")}</span>
                            <span>{getLongestStreak("completed") === 1 ? "day" : "days"}</span>
                        </div>

                        <div className="flex gap-1">
                            <span>Longest Untouched streak:</span>
                            <span>{getLongestStreak("untouched")}</span>
                            <span>{getLongestStreak("untouched") === 1 ? "day" : "days"}</span>
                        </div>
                        
                        <div className="flex gap-2"><span>Days with Completed:</span><span>{getCompletitionPercent().toFixed()}%</span></div>
                        <div className="flex gap-1">
                            <span>Total time spent:</span>
                            <span>{isNaN(inputsArray[0]) ? "/" : getTimeSpent()}</span>
                            <span>minutes</span>
                        </div>
                    </div>
    )
}

export default Statistics
