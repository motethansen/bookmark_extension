/* eslint-disable no-undef */
// content.js - send file to popup or background
const filePondElement = document.querySelector('input[type="file"]');
filePondElement.addEventListener("addfile", (event) => {
  const file = event.detail.file;

  // Read file content using FileReader
  const reader = new FileReader();
  reader.onload = () => {
    // Send file content to background or popup via message
    chrome.runtime.sendMessage({
      type: "file-uploaded",
      content: reader.result, // This could be base64 or text content
    });
  };
  reader.readAsDataURL(file); // For example, reading as data URL (base64)
});
