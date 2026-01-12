import { getSavedDaysData } from "@/app/_lib/service/database"
import SavedDaysList from "./SavedDaysList"

async function SavedDaysListServerComponent() {
    const dbData = await getSavedDaysData()
        console.log(dbData)
    
    if (!dbData)
        return (
            <div className="flex items-center justify-center">
                Ni shranjenih dni.
            </div>
        );
    
    return (
        <div className="overflow-scroll no-scrollbar">
            {dbData && <SavedDaysList dbData={JSON.stringify(dbData)}/>}

        </div>
    )
}

export default SavedDaysListServerComponent
