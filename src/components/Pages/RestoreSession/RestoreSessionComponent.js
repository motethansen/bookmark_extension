/* eslint-disable no-undef */
import React, { useState } from "react";
import FileUploadParent from "../../Shared/Dropzone";
import "./RestoreSessionComponent.css";

const RestoreSessionComponent = () => {
  return (
    <>
      <div className="draganddrop">
        <FileUploadParent />
      </div>
    </>
  );
};

export default RestoreSessionComponent;
