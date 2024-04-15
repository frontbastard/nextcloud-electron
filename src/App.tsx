import { useEffect, useRef, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { RiLoader3Fill } from "react-icons/ri";
import "./App.css";

function isValidHttpUrl(string: string) {
  let url;

  if (!/^https?:\/\//i.test(string)) {
    return false
  }

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function App() {
  const [isValid, setIsValid] = useState(true);
  const [url, setUrl] = useState("");
  const [server, setServer] = useState(
    window.electron.store.get("server") || ""
  );

  const addUrl = () => {
    if (isValidHttpUrl(url)) {
      window.electron.store.set("server", url);
      setServer(url);
    } else {
      setIsValid(false)
    }
  };

  const addClassToBody = () => {
    document.body.classList.add("gogogo");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setIsValid(true);
    if (e.key === "Enter") {
      addUrl();
    }
  };

  if (server) {
    addClassToBody();
    window.location.href = server;
  }

  return (
    <>
      <div className="logo">ACCOLADES</div>
      <div className="loader">
        <RiLoader3Fill />
      </div>

      <div className="container">
        <div className="input-wrapper box-shadow">
          <span className={`error${!isValid ? " show" : ""}`}>http://, https:// ?</span>
          <input
            className="input"
            type="text"
            autoFocus
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="https://nextcloud.server"
          />
          <button className="button" onClick={addUrl}>
            <GrAdd />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
