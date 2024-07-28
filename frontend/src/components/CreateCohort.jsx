import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, resolvePath } from "react-router-dom";

function CreateCohort() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedUsernames, setSelectedUsernames] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const users = location.state?.users || [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const reqbody={
                name,
                description,
                usernames: selectedUsernames, // Send list of selected usernames
            };
            console.log(reqbody);
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/cohort/`, 
                reqbody,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    }
                }
            );
            console.log(response);
            navigate(`/cohort/${name}`); // Redirect to main page or another page after successful creation
        } catch (error) {
            console.error(" ", error.response.data);
            alert(error.response.data.error);
                navigate("/create-cohort");
            // Handle error (e.g., show a notification or alert)
        }
    };

    const addUserToCohort = (username) => {
        if (username && !selectedUsernames.includes(username)) {
            setSelectedUsernames([...selectedUsernames, username]);
        }
    };

    const removeUserFromCohort = (username) => {
        setSelectedUsernames(selectedUsernames.filter(u => u !== username));
    };

    return (
        <div style={{ margin: "20px" }}>
            <h2>Create a New Cohort</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Cohort Name:
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{ marginLeft: "10px", padding: "5px" }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ marginLeft: "10px", padding: "5px", width: "300px", height: "100px" }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Select User:
                        <select 
                            onChange={(e) => addUserToCohort(e.target.value)}
                            style={{ marginLeft: "10px", padding: "5px" }}
                            value=""
                        >
                            <option value="" disabled>Select a user</option>
                            {users.map(user => (
                                <option key={user._id} value={user.username}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <h3>Selected Users</h3>
                    <ul>
                        {selectedUsernames.map(username => (
                            <li key={username}>
                                {username}
                                <button type="button" onClick={() => removeUserFromCohort(username)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="submit" style={{ padding: "10px 20px" }}>Create Cohort</button>
            </form>
        </div>
    );
}

export default CreateCohort;
