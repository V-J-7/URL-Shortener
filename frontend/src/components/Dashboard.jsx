import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {EmailContext} from '../EmailContext.js'
import '../styles/Dashboard.css'
import ShortenURLs from "./ShortenURLs.jsx";
function User() {
    const { email } = useContext(EmailContext);
    const username = email.split('@')[0];
    return (
        <div className="user-info">
            Hi, <span className="username">{username}</span>
        </div>
    );
}

function Dashboard(){
    const [dashboardMessage,setDashboardMessage]=useState('');
    const [shorteners,setShorteners]=useState([]);
    const {email}=useContext(EmailContext)
    const fetchData = async () => {
        const res = await fetch("http://localhost:8080/dashboard", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({email})
        })
        if (res.status === 204) {
            setShorteners([]);
            setDashboardMessage("No URLs created.");
        }
        else {
            setDashboardMessage('');
            setShorteners(await res.json());
        }
    }
    useEffect( () => {fetchData()},[email])
    return(
        <>
            <User/>
            <h1>Shorten a URL</h1>
            <ShortenURLs onShorten={fetchData}/>
            <h1>Shortened URLs</h1>
            {shorteners.length>0?(
                <table className="url-table">
                    <thead>
                    <tr>
                        <th>URL Name</th>
                        <th>Original URL</th>
                        <th>Short URL</th>
                    </tr>
                    </thead>
                   <tbody>
                    {shorteners.map((s,index)=>(
                       <tr key={index}>
                           <td>{s.urlName}</td>
                           <td><a href={s.originalURL}>{s.originalURL}</a></td>
                           <td><a href={s.originalURL}>{s.shortURL}</a></td>
                       </tr>
                    ))}
                   </tbody>
                </table>
            ):
            <p>{dashboardMessage}</p>}
        </>
    )
}
export default Dashboard