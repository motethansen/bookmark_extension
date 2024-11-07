/* eslint-disable no-undef */
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
const RestoreSessionComponent = () => {
  const [file, setFile] = useState();

  function handleFileSelect(event) {
    console.log("running handlefileselect");
    console.log(file.type);
    if (file && file.type === "application/json") {
      console.log(event.target.result);
      const reader = new FileReader();
      reader.onload = function (event) {
        try {
          const jsonData = JSON.parse(event.target.result);
          console.log("JSON data:", jsonData);
          chrome.runtime
            .sendMessage({ action: "restore_session", data: jsonData })
            .then((response) => {
              console.log(response);
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
              } else if (response && !response.success) {
                console.error(response.error);
              } else {
                console.log("Session Restored Successfully.");
              }
            });
          // Additional code to process the JSON data
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    } else {
      console.error("Please upload a valid JSON file.");
    }
  }

  const restore_session_function = (event) => {
    event.preventDefault();
    handleFileSelect(event);
    event.stopPropogation();
  };

  const valueonChange = (e) => {
    let files = e.target.files;
    setFile(files[0]);
    console.log(files[0]);
  };

  return (
    <>
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" onChange={(e) => valueonChange(e)} />
        </Form.Group>
        <Button
          variant="primary"
          id="restoreSessionButton"
          type="submit"
          onClick={(e) => restore_session_function(e)}
        >
          Restore Session from JSON
        </Button>
      </Form>
    </>
  );
};

export default RestoreSessionComponent;
