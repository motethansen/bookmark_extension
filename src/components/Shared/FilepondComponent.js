import React from "react";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css"; // Import FilePond styles

function FilePondComponent({ files, onFileUpdate }) {
  return (
    <FilePond
      files={files}
      onupdatefiles={onFileUpdate}
      allowMultiple={false}
      name="filepond"
      labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
    />
  );
}

export default FilePondComponent;
