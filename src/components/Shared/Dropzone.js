/* eslint-disable no-undef */

import React, { useState } from "react";
import FilePondComponent from "./FilepondComponent"; // Import the child component
import { Button } from "react-bootstrap";
function FileUploadParent() {
  const [files, setFiles] = useState([]); // Manage files in the parent
  const [fileContent, setFileContent] = useState(""); // Manage file content in the parent

  const restoreSessionClick = () => {
    try {
      console.log(fileContent);
      const jsonData = JSON.parse(fileContent);
      console.log("JSON data:", jsonData);
      chrome.runtime
        .sendMessage({ action: "restore_session", data: jsonData })
        .then((response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          } else if (response && !response.success) {
            console.error(response.error);
          } else {
            console.log("Session Restored Successfully.");
            setFiles([]);
            setFileContent("");
          }
        });
      // Additional code to process the JSON data
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  // Function to read the file content using FileReader
  const handleFileRead = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFileContent(reader.result); // Set the content in the parent state
    };
    reader.onerror = () => {
      console.error("Error reading the file");
    };
    reader.readAsText(file); // Read the file as text
  };

  // Function to handle file updates from FilePond
  const handleFileUpdate = (fileItems) => {
    setFiles(fileItems); // Update the files state
    if (fileItems.length > 0) {
      handleFileRead(fileItems[0].file); // Read the content of the first file
    } else {
      setFileContent(""); // Clear content if no files are selected
    }
  };

  return (
    <div>
      <h2>File Upload with State in Parent</h2>
      <FilePondComponent files={files} onFileUpdate={handleFileUpdate} />
      <Button
        onClick={restoreSessionClick}
        style={{ alignContent: "center", bottom: 0 }}
        className="primary"
      >
        Restore Session
      </Button>
    </div>
  );
}

export default FileUploadParent;
