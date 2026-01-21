import React from "react";

type StylesType = {
    [key:string]: string
}

const styles: StylesType  = {
    primary: "bg-blue-600 inline-block uppercase px-2 hover:bg-blue-500 cursor-pointer transition-all tracking-wide rounded-md active:bg-blue-300 break-normal flex items-center h-5 min-w-[2.2rem]",
    tileTitle: "cursor-pointer transition-all tracking-wide rounded-md active:text-amber-600 hover:text-blue-800",
    form: "bg-blue-600 inline-block uppercase px-2 hover:bg-blue-500 cursor-pointer transition-all tracking-wide rounded-md active:bg-blue-300 break-normal flex items-center h-10 min-w-[2.2rem]"
}


export default function Button({
    children,
    onClick,
    disabled,
    variation = "primary"
}: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variation?: string
}): React.JSX.Element {

    // console.log(new Date(2026,0,19).getTime());


    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={styles[variation]}
        >
            {children}
        </button>
    );
}

