import { getSavedDaysData } from "@/app/_lib/service/database"
import SavedDaysList from "./SavedDaysList"


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

// type LoadedDataType = {
//     date: Date;
//     actsArray: ActivityType[];
//     id: string;
//     note: string;
//     plan: string;
//     rating: string;
//     _id: string;
//     betterPoints: number
// };

// type MapValueType = {
//     statsArray: string[];
//     inputsArray: string[];
// }


async function SavedDaysListServerComponent() {
    const dbData = await getSavedDaysData()
    

    const actsStateHashMap = new Map()

    function populateActsStateHashmap() {
        if(!dbData) return;
        for(let i = dbData.length-1; i >= 0; i--) {
            dbData[i].actsArray.forEach((act:ActivityType) => {
                const id = act.id
                const state = act.actState
                const value = act.input

                if(!actsStateHashMap.get(id)) actsStateHashMap.set(id, {statsArray: [state], inputsArray: [value]})
                else {
                    const {statsArray} = actsStateHashMap.get(id)
                    const {inputsArray} = actsStateHashMap.get(id)
                    statsArray.push(state)
                    inputsArray.push(value)
                    actsStateHashMap.set(id, {statsArray, inputsArray})
                }
            })
        }
    }
    populateActsStateHashmap()
    
    if (!dbData)
        return (
            <div className="flex items-center justify-center">
                Ni shranjenih dni SC.
            </div>
        );

    return (
        <div className="overflow-scroll no-scrollbar">
            <SavedDaysList dbData={JSON.stringify(dbData)} actsStateHashMap={actsStateHashMap}/>

        </div>
    )
}

export default SavedDaysListServerComponent
