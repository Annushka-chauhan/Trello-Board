import { Draggable } from "@hello-pangea/dnd";

import "../styles/TaskCard.css";

function TaskCard({ issue, index }) {

    return (

        <Draggable
            draggableId={issue._id}
            index={index}
        >

            {(provided) => (

                <div
                    className="task-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >

                    <h4>{issue.title}</h4>

                    {

                        issue.description && (

                            <p>{issue.description}</p>

                        )

                    }

                    <div className="task-footer">

                        <span className="task-status">

                            {issue.status}

                        </span>

                    </div>

                </div>

            )}

        </Draggable>

    );

}

export default TaskCard;