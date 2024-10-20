document.addEventListener('DOMContentLoaded', () => {
    // Save tabs functionality
    document.getElementById('saveTabsButton').addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: "save_tabs" }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Runtime error:", chrome.runtime.lastError.message);
            } else if (response && !response.success) {
                console.error("Failed to save tabs:", response.error);
            } else {
                console.log('Tabs saved successfully.');
            }
        });
    });
  
    // View Bookmarks button to open saved URLs in a new tab
    document.getElementById('viewBookmarksButton').addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: "read_bookmarks" }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Runtime error:", chrome.runtime.lastError.message);
            } else if (response && !response.success) {
                console.error("Failed to load saved URLs:", response.error);
            } else {
                console.log("Saved URLs will be opened in a new tab.");
            }
        });
    });
  });
  