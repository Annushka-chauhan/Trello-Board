import { useState } from "react";
import api from "../services/api";
import "../styles/CreateBoardModal.css";

function CreateBoardModal({

    isOpen,
    onClose,
    organizationId,
    onBoardCreated

}) {

    const [title, setTitle] = useState("");

    if (!isOpen) return null;

    async function createBoard() {

        if (!title.trim()) {

            alert("Board name is required");
            return;

        }

        try {

            await api.post("/board", {

                title,
                organizationId

            });

            setTitle("");

            onBoardCreated();

            onClose();

        }

        catch (err) {

            console.log(err);

            alert(

                err.response?.data?.message ||

                "Unable to create board"

            );

        }

    }

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Create New Board</h2>

                <input

                    type="text"

                    placeholder="Board Name"

                    value={title}

                    onChange={(e)=>setTitle(e.target.value)}

                />

                <div className="modal-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >

                        Cancel

                    </button>

                    <button
                        className="create-btn"
                        onClick={createBoard}
                    >

                        Create

                    </button>

                </div>

            </div>

        </div>

    );

}

export default CreateBoardModal;