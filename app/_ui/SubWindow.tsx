import { Dispatch, SetStateAction } from "react";
import Statistics from "./Statistics";

function SubWindow({
    value,
    setValue,
    id,
}: {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    id: string | null;
}) {
    return (
        <div className="fixed top-0 left-[393px] bg-(--day) rounded-(--border-radius-lg) p-[3.2rem_1.6rem] transition-all duration-[2s] border-r-stone-400 border-r-2 border-b-stone-400 border-b-2 shadow-amber-50">
            <div className="flex flex-col gap-20">
                <div className="flex flex-col gap-2 items-center mt-2">
                    <p>Komentar</p>
                    <textarea
                        className="w-75 h-70 bg-stone-100 text-black p-1"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                {id && <Statistics id={id} />}
            </div>
        </div>
    );
}

export default SubWindow;
