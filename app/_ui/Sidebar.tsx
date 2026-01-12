import BeBetter from "../_components/beBetter/BeBetter";
import Note from "../_components/diary/Note";
import Plan from "../_components/diary/Plan";
import StopWatch from "../_components/timer/StopWatch";

function Sidebar() {

    return (
        <div className="grid h-full grid-rows-[11rem_1fr_auto]">
            <div>
                <StopWatch mode="timer" />
            </div>
            <BeBetter />
            <div>
                <div className="pl-4">
                </div>
                <Plan />
            </div>
            <div>
                <Note />
            </div>
        </div>
    );
}

export default Sidebar;
