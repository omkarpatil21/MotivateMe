import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Main() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [sortCriteria, setSortCriteria] = useState("name");
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.token) {
            navigate("/");
        }
        const timer = setTimeout(async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/bulk/?filter=${filter}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            });
            console.log(response);
            setUsers(response.data);
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [filter, navigate]);

    const sortedUsers = [...users].sort((a, b) => {
        if (sortCriteria === "name") {
            return a.username.localeCompare(b.username);
        } else if (sortCriteria === "problems") {
            return b.problems - a.problems;
        }
        return 0;
    });

    const handleCreateCohort = () => {
        navigate("/create-cohort", { state: { users } });
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <input 
                    onChange={(e) => setFilter(e.target.value)} 
                    type="text" 
                    placeholder="Search users..." 
                />
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                <label>
                    <input 
                        type="radio" 
                        value="name" 
                        checked={sortCriteria === "name"} 
                        onChange={() => setSortCriteria("name")} 
                    />
                    Sort by Name
                </label>
                <label style={{ marginLeft: "10px" }}>
                    <input 
                        type="radio" 
                        value="problems" 
                        checked={sortCriteria === "problems"} 
                        onChange={() => setSortCriteria("problems")} 
                    />
                    Sort by Number of Problems
                </label>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Username</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>First Name</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Last Name</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Total Problems</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Easy Problems</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Medium Problems</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Hard Problems</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map(user => <User key={user._id} user={user} />)}
                </tbody>
            </table>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button onClick={handleCreateCohort} style={{ padding: "10px 20px" }}>Create Cohort</button>
            </div>
        </div>
    );
}

function User({ user }) {
    return (
        <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>{user.username}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{user.firstName}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{user.lastName}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{user.problems}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{user.easy}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{user.medium}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{user.hard}</td>
        </tr>
    );
}

export default Main;
