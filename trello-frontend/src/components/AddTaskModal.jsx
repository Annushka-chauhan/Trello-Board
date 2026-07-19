import { useState } from "react";

import api from "../services/api";

import "../styles/AddTaskModal.css";

function AddTaskModal({
    isOpen,
    onClose,
    boardId,
    onTaskCreated
}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");

    if (!isOpen) {
        return null;
    }

    async function createTask() {

        try {

            await api.post("/issue", {

                boardId,
                title,
                description,
                priority,
                status: "TODO"

            });

            setTitle("");
            setDescription("");
            setPriority("MEDIUM");

            onTaskCreated();

            onClose();

        } catch (err) {

            console.log(err);

            alert("Unable to create task");

        }

    }

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Add New Task</h2>

                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <select
                    value={priority}
                    onChange={(e) =>
                        setPriority(e.target.value)
                    }
                >

                    <option value="LOW">
                        Low
                    </option>

                    <option value="MEDIUM">
                        Medium
                    </option>

                    <option value="HIGH">
                        High
                    </option>

                </select>

                <div className="modal-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="create-btn"
                        onClick={createTask}
                    >
                        Create Task
                    </button>

                </div>

            </div>

        </div>

    );

}

export default AddTaskModal;