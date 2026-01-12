import React, {
    cloneElement,
    createContext,
    useContext,
    useState,
} from "react";
import { createPortal } from "react-dom";
// import { useOutsideModalClick } from "../hooks/useOutsideModalClick";
import { LuArrowLeftFromLine } from "react-icons/lu";

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
        setIsOpen(true);
    }

    function handleClose() {
        setIsOpen(false);
    }

    return (
        <ModalContext.Provider value={{ isOpen, handleClose, handleOpen }}>
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
        { onClick: handleOpen }
    );
}

function Window({ children }: { children: React.ReactNode }) {
    const { isOpen, handleClose } = useContext(ModalContext);

    // const {ref} = useOutsideModalClick(handleClose)

    if (!isOpen) return null;

    return createPortal(
        <div
            role="modal-window"
            className="fixed top-0 left-0 bg-[var(--day)] rounded-[var(--border-radius-lg)] p-[3.2rem_1.6rem] transition-all duration-[2s] h-[100vh] border-r-(--ozadje) border-r-2"
        >
            <button
                role="close"
                className="bg-none border-none p-[0.4rem] absolute transform-[translateX-[3.8rem]] top-[1.2rem] right-[20.9rem] cursor-pointer hover:text-white"
                onClick={handleClose}
            >
                <LuArrowLeftFromLine size="1.6rem" />
            </button>
            <div>
                {cloneElement(
                    children as React.ReactElement<{
                        onCloseModal: () => void;
                    }>,
                    { onCloseModal: handleClose }
                )}
            </div>
        </div>,
        document.body
    );
}

//4. properties
Modal.Open = Open;
Modal.Window = Window;

