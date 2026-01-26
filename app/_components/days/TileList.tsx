// import Tile from "./Tile";
import React from "react";
import Tile from "./Tile";


type ActObjectType = {
    name: string;
    input: string;
    inputMode: string;
    target: string;
    unit: string;
    overUnder: string;
    id: string;
    width: number;
    actState?: string;
    betterPriority?: string;
};

function TileList({
    tileMode,
    actsArray = [],
}: 
{
    tileMode: "input" | "display";
    actsArray: Array<ActObjectType>;
}): React.JSX.Element {
    // state za Inputs

    // Ni aktivnosti

    if (!actsArray || tileMode === "input" && actsArray?.length === 0)
        return (
            <div className="flex">
                <p>Začni z dodajanjem aktivnosti.</p>
            </div>
        );

    return (
        <div className="flex gap-5">
            <div className="flex gap-0.5 h-14 mb-1 ml-1 mr-1">
                {actsArray.map((act) => (
                    <Tile tileMode={tileMode} act={act} key={act.id} />
                ))}
            </div>
        </div>
    );
}

export default TileList;
