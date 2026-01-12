import Button from "@/app/_ui/Button";
import Modal from "@/app/_ui/Modal";
import CreateUpdateActForm from "./CreateUpdateActForm";

type ActToUpdateType = {
    name: string;
};

function UpdateAct({ actToUpdate }: { actToUpdate: ActToUpdateType }) {
    return (
        <Modal>
            <Modal.Open>
                <Button variation="tileTitle">{actToUpdate.name}</Button>
            </Modal.Open>
            <Modal.Window>
                <CreateUpdateActForm actToUpdate={actToUpdate} />
            </Modal.Window>
        </Modal>
    );
}

export default UpdateAct;
