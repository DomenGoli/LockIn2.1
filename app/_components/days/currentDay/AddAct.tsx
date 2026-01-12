import Button from "@/app/_ui/Button";
import Modal from "@/app/_ui/Modal";
import CreateUpdateActForm from "./CreateUpdateActForm";

function AddAct() {
    return (
        <Modal>
            <Modal.Open>
                <Button>Dodaj aktivnost</Button>
            </Modal.Open>
            <Modal.Window>
                    <CreateUpdateActForm />
            </Modal.Window>
        </Modal>
    );
}

export default AddAct;
