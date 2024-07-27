import { useEffect, useState } from "react";
import axios from "axios"
function Main()
{
    const [users,setUsers]= useState([]);
    const [filter,setFilter]=useState("");

     useEffect(()=>{
        const timer=setTimeout(async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/bulk/?filter=${filter}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setUsers(response.data); 
        },500)
        return()=>{
            clearTimeout(timer)
        }
    },[filter])
    return (
        <div>
            <div style={{display:"flex", justifyContent : "space-evenly"}}>
                <input onChange={(e) => {
                    setFilter(e.target.value)
                }} type="text" placeholder="Search users..."></input>
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </div>
    )
}
function User({user})
{
    return(
        <div key={user._id} style={{display:"flex", justifyContent:"space-evenly"}}>
            <div>{user.username}</div>
            <div>{user.problems}</div>
        </div>
    )
}
export default Main