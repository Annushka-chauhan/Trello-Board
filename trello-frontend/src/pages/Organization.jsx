import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import StatsCard from "../components/StatsCard";
import MemberCard from "../components/MemberCard";
import BoardCard from "../components/BoardCard";
import CreateBoardModal from "../components/CreateBoardModal";

import "../styles/Organization.css";

function Organization() {

    const navigate = useNavigate();

    const [organization, setOrganization] = useState(null);
    const [members, setMembers] = useState([]);
    const [boards, setBoards] = useState([]);
    const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

    const authData = JSON.parse(localStorage.getItem("authData"));
    const role = authData?.role;

    const organizationId = organization?._id;

    useEffect(() => {

        if (!authData) {
            navigate("/signin");
            return;
        }

        loadOrganization();

    }, []);

    async function loadOrganization() {

        try {

            // Get Organization
            const orgResponse = await api.get("/my-organization");

            const currentOrganization = orgResponse.data.organization;

            setOrganization(currentOrganization);

            // Get Members
            const memberResponse = await api.get(
                `/members?organizationId=${currentOrganization._id}`
            );

            setMembers(memberResponse.data.members);

            // Get Boards
            const boardResponse = await api.get(
                `/boards?organizationId=${currentOrganization._id}`
            );

            setBoards(boardResponse.data.boards);

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Unable to load organization."
            );

        }

    }

    return (

        <>

            <Navbar />

            <div className="main-layout">

                <Sidebar />

                <div className="content">

                    <Hero organization={organization} />

                    <div className="stats-grid">

                        <StatsCard
                            title="Members"
                            count={members.length}
                            icon="👥"
                        />

                        <StatsCard
                            title="Boards"
                            count={boards.length}
                            icon="📋"
                        />

                        <StatsCard
                            title="Issues"
                            count="0"
                            icon="📝"
                        />

                    </div>

                    <div className="dashboard">

                        <div className="section">

                            <h2>Team Members</h2>

                            {

                                members.length > 0 ? (

                                    members.map((member) => (

                                        <MemberCard
                                            key={member._id}
                                            member={member}
                                        />

                                    ))

                                ) : (

                                    <p>No members added yet.</p>

                                )

                            }

                        </div>

                        <div className="section">

                            <h2>Boards</h2>

                            {

                                boards.length > 0 ? (

                                    boards.map((board) => (

                                        <BoardCard
                                            key={board._id}
                                            board={board}
                                        />

                                    ))

                                ) : (

                                    <p>No boards created yet.</p>

                                )

                            }

                        </div>

                    </div>

                    {

                        role === "ADMIN" && (

                            <div className="admin-actions">

                                <button
                                    onClick={() =>
                                        setShowCreateBoardModal(true)
                                    }
                                >
                                    + Create Board
                                </button>

                                <button>
                                    + Invite Member
                                </button>

                            </div>

                        )

                    }

                </div>

            </div>

            <CreateBoardModal
                isOpen={showCreateBoardModal}
                onClose={() => setShowCreateBoardModal(false)}
                organizationId={organizationId}
                onBoardCreated={loadOrganization}
            />

        </>

    );

}

export default Organization;