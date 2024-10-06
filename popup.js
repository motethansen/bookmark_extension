document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('saveTabsButton').addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: "save_tabs" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else if (response && !response.success) {
          console.error(response.error);
        } else {
          console.log('Tabs saved successfully.');
        }
      });
    });
  });