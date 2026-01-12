"use client";
import { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import {
    addActivity,
    deleteActivity,
    updateActivity,
} from "@/app/_lib/features/currentDay/currentDayObjectSlice";
import Button from "@/app/_ui/Button";
import FormRow from "@/app/_ui/FormRow";

const inputStyle =
    "border-solid border-[1px] border-[var(--color-grey-300)] bg-[var(--color-grey-0)] p-[0.2rem_0.2rem] text-black";
const selectStyle = "text-black";

type ActToUpdateType = {
    [id: string]: string;
};

function CreateUpdateActForm({
    actToUpdate = {},
    onCloseModal,
}: {
    actToUpdate?: ActToUpdateType;
    onCloseModal?: () => void;
}) {
    const isUpdateSession = Boolean(actToUpdate?.id);

    const dispatch = useAppDispatch();
    const [name, setName] = useState(setInitialState("name"));
    const [inputMode, setInputMode] = useState(
        setInitialState("inputMode", "input")
    );
    const [target, setTarget] = useState(setInitialState("target"));
    const [unit, setUnit] = useState(setInitialState("unit", "min"));
    const [overUnder, setOverUnder] = useState(
        setInitialState("overUnder", "over")
    );
    const [betterPriority, setBetterPriority] = useState(
        setInitialState("betterPriority", "major")
    );
    const id = crypto.randomUUID().slice(0, 8);

    function setInitialState(state: string, initial = "") {
        return isUpdateSession ? actToUpdate[state] : initial;
    }

    function handleBack() {
        if (onCloseModal) onCloseModal();
    }

    function handleAddActivity() {
        if (!name || !inputMode) return;
        if (inputMode === "input" && !target) return;

        if (isUpdateSession) {
            dispatch(
                updateActivity({
                    name,
                    inputMode,
                    target,
                    unit,
                    overUnder,
                    id: actToUpdate.id,
                    betterPriority,
                })
            );
        } else {
            dispatch(
                addActivity({
                    name,
                    inputMode,
                    target,
                    input: inputMode === "input" ? "0" : "Ne",
                    unit,
                    overUnder,
                    id,
                    betterPriority,
                })
            );
        }
        if (onCloseModal) onCloseModal();
    }

    function handleDeleteAct() {
        if (window.confirm("Izbriši aktivnost?")) {
            dispatch(deleteActivity(actToUpdate.id));
            if (onCloseModal) onCloseModal();
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-center">
                <label className="text-3xl">
                    {isUpdateSession ? "Uredi aktivnost" : "Dodaj aktivnost"}
                </label>
            </div>
            <div className="flex flex-col gap-4">
                <FormRow label="Ime aktivnosti">
                    <input
                        className={inputStyle}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormRow>

                <FormRow label="Vrsta">
                    <select
                        value={inputMode}
                        onChange={(e) => setInputMode(e.target.value)}
                    >
                        {/* <option></option> */}
                        <option className="text-black" value={"input"}>
                            Vnos
                        </option>
                        <option className="text-black" value={"select"}>
                            Ja/Ne
                        </option>
                    </select>
                </FormRow>

                {inputMode === "input" && (
                    <>
                        <FormRow label="Cilj: Vsaj / Največ">
                            <select
                                value={overUnder}
                                onChange={(e) => setOverUnder(e.target.value)}
                            >
                                <option className={selectStyle} value="over">
                                    Vsaj
                                </option>
                                <option className={selectStyle} value="under">
                                    Največ
                                </option>
                            </select>
                        </FormRow>

                        <FormRow label="Cilj">
                            <input
                                type="number"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                                className={inputStyle}
                            />
                        </FormRow>

                        <FormRow label="Enota">
                            <input
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                type="text"
                                className={inputStyle}
                            />
                        </FormRow>
                    </>
                )}

                <FormRow label="Be Better">
                    <select
                        value={betterPriority}
                        onChange={(e) => setBetterPriority(e.target.value)}
                    >
                        <option className={selectStyle} value="major">
                            Pomembno
                        </option>
                        <option className={selectStyle} value="minor">
                            Minor
                        </option>
                        <option className={selectStyle} value="none">
                            Ignoriraj
                        </option>
                    </select>
                </FormRow>
            </div>

            <div className="grid gap-4">
                <Button variation="form" onClick={handleAddActivity}>
                    Shrani
                </Button>
                {isUpdateSession && (
                    <Button variation="form" onClick={handleDeleteAct}>
                        Izbrisi aktivnost
                    </Button>
                )}

                <Button variation="form" onClick={handleBack}>
                    Zapri
                </Button>
            </div>
        </div>
    );
}

export default CreateUpdateActForm;

