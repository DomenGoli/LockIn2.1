import Button from "@/app/_ui/Button";
import Modal from "@/app/_ui/Modal";
import { DayPicker, OnSelectHandler } from "react-day-picker";
import { getDateFormat } from "@/app/_lib/helpers";

function ChangeDate({ date, setDate }: { date: Date; setDate: OnSelectHandler<Date> }) {
    return (
        <Modal>
            <Modal.Open>
                <Button>{getDateFormat(date)}</Button>
            </Modal.Open>
            <Modal.Window>
                <div className="flex flex-col gap-6 items-center">
                    <label>Change Date</label>
                    <DayPicker
                        mode="single"
                        required
                        hideNavigation
                        selected={date}
                        onSelect={setDate}
                        hideWeekdays
                        captionLayout="dropdown"
                        startMonth={new Date(2025, 0)}
                        endMonth={new Date(2065, 0)}
                        disabled={(curDate) => curDate.getTime() > Date.now()}
                    />
                </div>
            </Modal.Window>
        </Modal>
    );
}

export default ChangeDate;
