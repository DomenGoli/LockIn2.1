"use client"
import { useEffect, useState } from "react";
import icons from "@/app/_ui/icons";
// import Button from "./Button";

function StopWatch({mode}: {mode: string}) {
    const [isPaused, setIsPaused] = useState(true);
    const [secondsPassed, setSecondsPassed] = useState(0);

    useEffect(

        function () {
            const interval = setInterval(() => {
                if (isPaused) return;

                setSecondsPassed(secondsPassed + 1);
            }, 1000);

            return () => clearInterval(interval);
        },
        [isPaused, secondsPassed]
    );

    let minutesRender = ""
    const minutes = Math.floor(secondsPassed / 60);
    if (minutes < 10) minutesRender = "0" + minutes;
    else minutesRender = String(minutes)

    let secondsRender = ""
    const seconds = secondsPassed % 60;
    if (seconds < 10) secondsRender = "0" + seconds;
    else secondsRender = String(seconds)

    if (mode !== "timer") return null;

    return (
        <div className="flex flex-col justify-center items-center">
            <label className="text-[4rem]">
                {minutesRender}:{secondsRender}
            </label>
            <div>
                {isPaused ? (
                    <PlayButton
                        onClick={() => {
                            setIsPaused(false);
                            // isPausedRef.current = false;
                        }}
                    />
                ) : (
                    <PauseButton
                        onClick={() => {
                            setIsPaused(true);
                            // isPausedRef.current = true;
                        }}
                    />
                )}
                <StopButton
                    onClick={() => {
                        setIsPaused(true);
                        setSecondsPassed(0);
                    }}
                />
            </div>
        </div>
    );
}

type ButtonProps = {
    onClick: () => void
}

function PlayButton({onClick}: ButtonProps) {
    return (
        <TimerButton onClick={onClick}>
            {icons.play}
        </TimerButton>
    );
}

function PauseButton({onClick}: ButtonProps) {
    return (
        <TimerButton onClick={onClick}>
            {icons.pause}
        </TimerButton>
    );
}

function StopButton({onClick}: ButtonProps) {
    return (
        <TimerButton onClick={onClick}>
            {icons.stop}
        </TimerButton>
    );
}

function TimerButton({children, onClick}: {children: React.ReactNode, onClick: ()=> void}) {
    return(
        <button className="btn-pomo cursor-pointer hover:text-stone-100" onClick={onClick}>
            {children}
        </button>
    )
}

export default StopWatch;

