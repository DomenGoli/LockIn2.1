import Button from "@/app/_ui/Button";
import { HiOutlineTrash } from "react-icons/hi2";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getDateFormat } from "@/app/_lib/helpers";
import { deleteDayFromDatabase } from "@/app/_lib/service/actions";
import NoteButton from "@/app/_ui/NoteButton";
import { FormEvent } from "react";

type DayObjectType = {
    date: Date;
    actsArray: [];
    id: string;
    note: string;
    plan: string;
    rating: string;
    betterPoints: number;
    _id: string
};

function SavedDayHeader({ day }: { day: DayObjectType }) {
    // const queryClient = useQueryClient();
    // const { mutate, isPending: deleting } = useMutation({
    //     mutationFn: deleteDayApi,
    //     onSuccess: () => {
    //         toast.success("Dan je bil uspesno zbrisan!");
    //         queryClient.invalidateQueries({
    //             queryKey: ["days"],
    //         });
    //     },
    // });

    function handleDelete(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (window.confirm("Izbriši dan?")) {
            try {
                deleteDayFromDatabase(day._id)
                toast.success("Dan je bil uspesno zbrisan!")
            }catch(err) {
                console.log(err);
            }
            
            // mutate(day.id);
        }
    }

    return (
        <div className="flex">
            <div className="flex flex-row gap-3 p-1">
                <div className="flex gap-3 w-95">
                    <p className="w-50">{getDateFormat(day.date)}</p>
                    <label>{`Ocena dneva: ${
                        day.rating ? day.rating : "N/A"
                    }`}</label>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    {day.note || day.plan ? (
                        <NoteButton
                            data={day?.note}
                            planData={day.plan}
                            dayId={day._id}
                            date={day?.date}
                        />
                    ) : (
                        <div />
                    )}

                    <form onSubmit={handleDelete}>
                        <Button>
                            <HiOutlineTrash />
                        </Button>
                    </form>
                </div>
                
                <div>

                <p
                    className="ml-4"
                    style={{ color: day.betterPoints >= 0 ? "green" : "red" }}
                    >
                    {day.betterPoints && `${day?.betterPoints?.toFixed(1)}%`}
                </p>
                    </div>
                {/* {deleting && <p>Brišemo...</p>} */}
            </div>
        </div>
    );
}

export default SavedDayHeader;
