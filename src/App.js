import React, { useRef, useState } from "react";
import './App.css';

export default function App() {

  const inputRef = useRef();

  const [source, setSource] = useState("");
  const [fileType, setFileType] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    let type = file.type?.split("/")[1];
    console.log("file", file.type)
    console.log("type", file.type?.split("/")[1] === "mp4");

    if (type === "mp4" || type === "m4v" || type === "mpeg") {
      console.log("true condition")
      setFileType(type)
    }
    else {
      console.log("false condition");
      setFileType("");
      setError("File format not supported.")
    }
    const url = URL.createObjectURL(file);
    console.log({ url });
    setSource(url);
  };

  console.log({ error })
  console.log({ fileType })

  // const handleChoose = (event) => {
  //   inputRef.current.click();
  // };

  return (
    <div className="App">
      <h1>Upload File MV4, mp3, mp4</h1>
      <input
        ref={inputRef}
        type="file"
        onChange={(e) => handleFileChange(e)}
        accept=".m4v,.mp4,.mp3"
      />
      {/* {!source && <button onClick={handleChoose}>Choose</button>} */}

      {
        fileType !== "" ?

          <video
            width="50%"
            controls
            src={source}
          />

          : null
      }

      {

        <h1>{error}</h1>
      }

      {/* <div>{source || "Nothing selectd"}</div> */}
    </div>
  );
}

