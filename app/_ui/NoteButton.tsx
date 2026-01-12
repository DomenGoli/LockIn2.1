import { useDispatch } from "react-redux";
import Button from "./Button";
import { toggleOpenDiary } from "@/app/_lib/features/diary/diarySlice";
import { LuNotebookPen } from "react-icons/lu";

function NoteButton({ data, planData, dayId = "0", date }: { data: string; planData:string; dayId?: string, date?: Date }) {
    const dispatch = useDispatch();
    
    function handleNote() {
        dispatch(toggleOpenDiary(data, planData, dayId, date));
    }

    return (
        <div>
            <Button onClick={handleNote}>
                {dayId === "0" ? "Belezka" : <LuNotebookPen />}
            </Button>
        </div>
    );
}

export default NoteButton;
