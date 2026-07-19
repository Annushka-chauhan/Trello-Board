import { Droppable } from "@hello-pangea/dnd";

import TaskCard from "./TaskCard";

import "../styles/Column.css";

function Column({ title, issues }) {

    return (

        <Droppable droppableId={title}>

            {(provided) => (

                <div
                    className="column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >

                    <div className="column-header">

                        <h2>{title}</h2>

                    </div>

                    <div className="column-body">

                        {

                            issues.map((issue, index) => (

                                <TaskCard
                                    key={issue._id}
                                    issue={issue}
                                    index={index}
                                />

                            ))

                        }

                        {provided.placeholder}

                    </div>

                </div>

            )}

        </Droppable>

    );

}

export default Column;