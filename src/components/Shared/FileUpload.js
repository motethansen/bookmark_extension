// src/components/FileUpload.js
import React, { useEffect, useRef } from "react";
import FilePond from "react-filepond";
import "filepond/dist/filepond.min.css"; // Make sure FilePond styles are imported

const FileUpload = () => {
  const pondRef = useRef(null); // Ref to hold the FilePond instance

  useEffect(() => {
    // Create FilePond instance
    const pond = FilePond.create(pondRef.current);

    // Optionally, handle file events, like on add, on remove, etc.
    pond.on("addfile", (e) => {
      console.log("File added:", e.detail.file);
      // You could send this file to the background or handle it in the popup
    });

    // Clean up the FilePond instance when the component unmounts
    return () => {
      pond.destroy();
    };
  }, []);

  return (
    <div>
      <h1>Upload Files</h1>
      <input ref={pondRef} type="file" />
    </div>
  );
};

export default FileUpload;
