import { useContext, useState } from "react";
import { EmailContext } from "../EmailContext.js";

function ShortenURLs({ onShorten }) {
    const { email } = useContext(EmailContext);
    const [original, setOriginal] = useState('');
    const [shortURL, setShortURL] = useState('');
    const[urlName,setUrlName]=useState('');

    async function sendURL(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:8080/shorten", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email, original ,urlName})
        });
        setShortURL(await res.text());
        if (onShorten) {
            onShorten();
        }
        setOriginal("");
        setUrlName('')
    }

    return (
        <form onSubmit={sendURL} className="shorten-form">
            <div className="form-group">
                <label htmlFor="original-url">Long URL:</label>
                <input
                    id="original-url"
                    className="input-field"
                    type="text"
                    placeholder="Enter long URL"
                    value={original}
                    onChange={(e) => setOriginal(e.target.value)}
                    required
                />
                <br/><br/>
                <label htmlFor="url-name">Url Name:</label>
                <input
                    id="url-name"
                    className="input-field"
                    type="text"
                    placeholder="Enter URL Name"
                    value={urlName}
                    onChange={(e) => setUrlName(e.target.value)}
                /><br/><br/>
            </div>

            {shortURL === "Invalid URL" ? <p className="invalid-url">{shortURL}</p> : (
                <div className="form-group">
                    <label htmlFor="short-url">Short URL:</label>
                    <a href={original}>{shortURL}</a>
                </div>
            )}
            <button type="submit" className="shorten-btn">Shorten</button><br/><br/>
        </form>
    );
}

export default ShortenURLs;
