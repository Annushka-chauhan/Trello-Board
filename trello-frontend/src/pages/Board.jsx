import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BoardHeader from "../components/BoardHeader";
import Column from "../components/Column";
import AddTaskModal from "../components/AddTaskModal";

import "../styles/Board.css";

function Board() {

    const { boardId } = useParams();

    const [board, setBoard] = useState(null);
    const [issues, setIssues] = useState([]);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    const columns = [
        "To Do",
        "In Progress",
        "Review",
        "Done"
    ];

    useEffect(() => {

        loadBoard();
        loadIssues();

    }, []);

    function onDragEnd(result) {

        console.log(result);

    }

    async function loadBoard() {

        try {

            const response = await api.get(`/board/${boardId}`);

            setBoard(response.data.board);

        } catch (err) {

            console.log(err);

            alert("Unable to load board");

        }

    }

    async function loadIssues() {

        try {

            const response = await api.get(`/issues?boardId=${boardId}`);

            setIssues(response.data.issues);

        } catch (err) {

            console.log(err);

            alert("Unable to load issues");

        }

    }

    return (

        <>

            <Navbar />

            <div className="main-layout">

                <Sidebar />

                <div className="board-container">

                    <BoardHeader board={board} />

                    <div className="board-actions">

                        <button
                            className="add-task-btn"
                            onClick={() => setShowAddTaskModal(true)}
                        >
                            + Add Task
                        </button>

                    </div>

                    <DragDropContext onDragEnd={onDragEnd}>

                        <div className="board-content">

                            {

                                columns.map((column) => (

                                    <Column
                                        key={column}
                                        title={column}
                                        issues={issues.filter((issue) => {

                                            switch (column) {

                                                case "To Do":
                                                    return issue.status === "TODO";

                                                case "In Progress":
                                                    return issue.status === "IN_PROGRESS";

                                                case "Review":
                                                    return issue.status === "REVIEW";

                                                case "Done":
                                                    return issue.status === "DONE";

                                                default:
                                                    return false;

                                            }

                                        })}
                                    />

                                ))

                            }

                        </div>

                    </DragDropContext>

                </div>

            </div>

            <AddTaskModal
                isOpen={showAddTaskModal}
                onClose={() => setShowAddTaskModal(false)}
                boardId={boardId}
                onTaskCreated={loadIssues}
            />

        </>

    );

}

export default Board;