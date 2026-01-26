import React, {
    cloneElement,
    createContext,
    useContext,
    useState,
} from "react";
import { createPortal } from "react-dom";
import { useOutsideModalClick } from "@/app/_lib/hooks/useOutsideModalClick";
import { LuArrowLeftFromLine } from "react-icons/lu";
import { LuChevronLeft } from "react-icons/lu";

type ContextType = {
    handleOpen: () => void;
    handleClose: () => void;
    isOpen: boolean;
};

const defaultValue = {
    handleOpen: () => {},
    handleClose: () => {},
    isOpen: false,
};

//1. context
const ModalContext = createContext<ContextType>(defaultValue);

//2. parent
export default function Modal({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleOpen() {
        // setIsOpen(false) // za zapiranje ze odprtih Modal Window, ko odpres novega
        setIsOpen(true);
    }

    function handleClose() {
        setIsOpen(false);
    }

    return (
        <ModalContext.Provider value={{ isOpen, handleClose, handleOpen }}>
            {/* <button className="bg-none border p-[0.4rem] absolute transform-[translateX-[3.8rem]] top-[3rem] right-[-1rem] cursor-pointer hover:text-white z-100">test</button> */}
            {children}
        </ModalContext.Provider>
    );
}

//3. children
function Open({ children }: { children: React.ReactNode }) {
    const { handleOpen } = useContext(ModalContext);
    // if(React.isValidElement(children))
    return cloneElement(
        children as React.ReactElement<{ onClick: () => void }>,
        { onClick: handleOpen },
    );
}

//// lahko zbrises vse
// type WindowStylesType = {
//     [key: string]: string;
// };

// const windowStyles: WindowStylesType = {
//     first: "first fixed top-0 left-0 bg-(--day) rounded-(--border-radius-lg) p-[3.2rem_1.6rem] transform-[translateX-[3.8rem]] shadow-lg transition-all duration-[2s] w-[393px] border-r-stone-400 border-r-2 border-b-stone-400 border-b-2",
//     second: "fixed top-0 left-[393px] bg-(--day) rounded-(--border-radius-lg) p-[3.2rem_1.6rem] transition-all duration-[2s] h-screen border-r-stone-400 border-r-2 shadow-amber-50",
// };

function Window({
    children,
    variation = "first",
}: {
    children: React.ReactNode;
    variation?: string;
}) {
    const { isOpen, handleClose } = useContext(ModalContext);
    const { ref } = useOutsideModalClick(handleClose);

    if (!isOpen) return null;

    return createPortal(
        <div ref={ref} className="">
            <div role="modal-window" className="first fixed top-0 left-0 bg-(--day) rounded-(--border-radius-lg) p-[3.2rem_1.6rem] transform-[translateX-[3.8rem]] shadow-lg transition-all duration-[2s] w-98.25 border-r-stone-400 border-r-2 border-b-stone-400 border-b-2">
                {variation === "first" && (
                    <button
                    role="close"
                    className="bg-none border-none p-[0.4rem] absolute transform-[translateX-[3.8rem]] top-[1.2rem] right-[20.9rem] cursor-pointer hover:text-white"
                    onClick={handleClose}
                    >
                        <LuArrowLeftFromLine size="1.6rem" />
                    </button>
                )}
                {/* {variation === "first" && <CommentButton />} */}
                {variation === "second" && (
                    <button
                    className="bg-none border-0 w-0.1 absolute transform-[translateX-[3.8rem]] top-[1.6rem] right-81.5 cursor-pointer hover:text-white  shadow-amber-50 shadow-r-"
                    onClick={handleClose}
                    >
                        <LuChevronLeft size="1.6rem" />
                    </button>
                )}
                <div>
                    {cloneElement(
                        children as React.ReactElement<{
                            onCloseModal: () => void;
                        }>,
                        { onCloseModal: handleClose },
                    )}
                </div>
            </div>
        </div>,
        document.body,
    );
}

//4. properties
Modal.Open = Open;
Modal.Window = Window;
