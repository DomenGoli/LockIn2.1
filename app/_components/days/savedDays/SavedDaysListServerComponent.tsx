import { getSavedDaysData } from "@/app/_lib/actions/dataActions";
// import { getSavedDaysData } from "@/app/_lib/service/actions copy";
import SavedDaysList from "./SavedDaysList";
import { auth } from "@/app/_lib/auth";
import { getUserByName } from "@/app/_lib/actions/userDataActions";
import { WithId } from "mongodb";

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
type UserDocument = WithId<UserType>
type UserType = {
    _id: string;
    name: string;
    username: string;
    password: string;
    daysCollection: string;
};

async function SavedDaysListServerComponent() {
    const session = await auth();
    const { daysCollection } =  await getUserByName(session?.user?.name);
    // console.log("find:", await getUserByName(session?.user?.name));
    // console.log(user);
    // console.log(session);
    // const test = session?.user?.daysCollection
    // const {daysDbCollection} = session?.user
    // console.log(daysDbCollection)
    // const {user:{daysDbCollection}} = await auth()
    // console.log(daysDbCollection)
    // const {daysDbCollection} = session?.user
    const dbData = await getSavedDaysData(daysCollection);

    const actsStateHashMap = new Map();

    function populateActsStateHashmap() {
        if (!dbData) return;
        for (let i = dbData.length - 1; i >= 0; i--) {
            dbData[i].actsArray.forEach((act: ActivityType) => {
                const id = act.id;
                const state = act.actState;
                const value = act.input;

                if (!actsStateHashMap.get(id))
                    actsStateHashMap.set(id, {
                        statsArray: [state],
                        inputsArray: [value],
                    });
                else {
                    const { statsArray } = actsStateHashMap.get(id);
                    const { inputsArray } = actsStateHashMap.get(id);
                    statsArray.push(state);
                    inputsArray.push(value);
                    actsStateHashMap.set(id, { statsArray, inputsArray });
                }
            });
        }
    }
    populateActsStateHashmap();

    // function calculateBetterScore():number {
    //     if(!dbData) return 0;

    //     for(let i=0; i<dbData.length; i++) {
    //         console.log(dbData[i].deltaScore);
    //         if(dbData[i].betterPoints) betterScore = betterScore + dbData[i].betterPoints
    //     };
    //     return betterScore;
    // }
    // calculateBetterScore()

    if (!dbData)
        return (
            <div className="flex items-center justify-center">
                Ni shranjenih dni SC.
            </div>
        );

    return (
        <div className="overflow-scroll no-scrollbar">
            <SavedDaysList
                dbData={JSON.stringify(dbData)}
                actsStateHashMap={actsStateHashMap}
                daysCollection={daysCollection}
            />
        </div>
    );
}

export default SavedDaysListServerComponent;
