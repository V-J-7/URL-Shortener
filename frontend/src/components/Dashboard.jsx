import {useContext, useEffect, useState} from "react";
import {EmailContext} from '../EmailContext.js'
import '../styles/Dashboard.css'
import ShortenURLs from "./ShortenURLs.jsx";
import QRCode from 'react-qr-code'
import {useNavigate} from "react-router-dom";

function User() {
    const navigate=useNavigate();
    const { email } = useContext(EmailContext);
    const username = email.split('@')[0];
    return (
        <div className="user-info">
            Hi, <span className="username">{username}</span><br/><br/>
            <button style={{backgroundColor:'red',width:'90px'}} onClick={()=>{localStorage.removeItem("email")
            navigate("/")}}>Logout</button>
        </div>
    );
}
function Dashboard() {
    const [dashboardMessage, setDashboardMessage] = useState('');
    const [searchTerm,setSearchTerm]=useState('')
    const [shorteners, setShorteners] = useState([]);
    const [originalURL,setOriginalURL]=useState('');
    const [showQR,setShowQR]=useState(false);
    const {email} = useContext(EmailContext)
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
        } else {
            setDashboardMessage('');
            setShorteners(await res.json());
        }
    }
    const removeURL=async(shortURL,email)=>{
        const res=await fetch("http://localhost:8080/delete",{
            method:"POST",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify({email,shortURL})
        })
        await fetchData();
    }
    useEffect(() => {
        fetchData()
    }, [email])
    const filteredShorteners=shorteners.filter(s=>s.originalURL.toLowerCase().includes(searchTerm.toLowerCase()) || s.urlName.toLowerCase().includes(searchTerm.toLowerCase()))
    return (
        <>
            <User/>
            {showQR && (
                <div className="qr-overlay" onClick={() => setShowQR(false)}>
                    <div className="qr-popup">
                        <QRCode value={originalURL} size={256} />
                        <p className="qr-text">Tap anywhere to close</p>
                    </div>
                </div>
            )}

            <h1>Shorten a URL</h1>
            <ShortenURLs onShorten={fetchData}/>
            <h1>Shortened URLs</h1>
            {shorteners.length > 0 ?
                (<>
                    <label>Search by Name or URL:</label>
                    <input type="search" placeholder="Enter the name or URL" value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)} className="input-field"/>
                <table className="url-table">
                    <thead>
                    <tr>
                        <th>URL Name</th>
                        <th>Original URL</th>
                        <th>Short URL</th>
                        <th>QR code</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredShorteners.map((s, index) => (
                        <tr key={index}>
                            <td>{s.urlName}</td>
                            <td><a href={s.originalURL}>{s.originalURL.length > 40 ? s.originalURL.slice(0, 40) + "..." : s.originalURL}</a></td>
                            <td><a href={s.originalURL}>{s.shortURL}</a></td>
                            <td>
                                <button onClick={() => {
                                    setOriginalURL(s.originalURL);
                                    setShowQR(true)
                                }}>Generate QR Code
                                </button>
                            </td>
                            <td><button className="delete-btn" onClick={()=>removeURL(s.shortURL,email)}>Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                    </>)
                : <p>{dashboardMessage}</p>}
</>
)
}
export default Dashboard