import { getSavedDaysData } from "@/app/_lib/service/database"
import SavedDaysList from "./SavedDaysList"

async function SavedDaysListServerComponent() {
    const dbData = await getSavedDaysData()
    
    if (!dbData)
        return (
            <div className="flex items-center justify-center">
                Ni shranjenih dni SC.
            </div>
        );

    return (
        <div className="overflow-scroll no-scrollbar">
            <SavedDaysList dbData={JSON.stringify(dbData)}/>

        </div>
    )
}

export default SavedDaysListServerComponent
