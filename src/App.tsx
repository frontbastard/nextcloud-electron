import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { RiLoader3Fill } from "react-icons/ri";
import "./App.css";

function isValidHttpUrl(string: string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function App() {
  const [url, setUrl] = useState("");
  const [server, setServer] = useState(
    window.electron.store.get("server") || ""
  );

  const addUrl = () => {
    if (isValidHttpUrl(url)) {
      window.electron.store.set("server", url);
      setServer(url);
      setUrl("");
    }
  };

  const addClassToBody = () => {
    document.body.classList.add("gogogo");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      <div className="loader">
        <RiLoader3Fill />
      </div>

      <div className="container">
        <div className="logo">ACCOLADES</div>
        <div className="input-wrapper box-shadow">
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
