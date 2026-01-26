"use client";
import { LuChevronRight } from "react-icons/lu";
import Modal from "./Modal";
import { Dispatch, SetStateAction } from "react";
import Statistics from "./Statistics";

///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////deprecated =>>> lahko zbrises cel file
function Comment({
    value,
    setValue,
    id,
}: {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    id: string | null;
}) {

    return (
        <Modal>
            <Modal.Open>
                <button
                    role="close"
                    className="bg-none w-0.1 border-0 absolute transform-[translateX-[3.8rem]] top-[1.6rem] right-[-0.1rem] cursor-pointer hover:text-white"
                >
                    <LuChevronRight size="1.6rem" />
                </button>
            </Modal.Open>
            <Modal.Window variation="second">
                <>
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
                            </>
            </Modal.Window>
        </Modal>
    );
}

export default Comment;
