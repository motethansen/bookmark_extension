chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "save_tabs") {
        try {
            let tabs = await chrome.tabs.query({ currentWindow: true });
            let tabUrls = tabs.map(tab => ({ title: tab.title, url: tab.url }));
  
            // Save to MongoDB
            fetch('http://localhost:3000/save-urls', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ urls: tabUrls.map(tab => tab.url) })
            })
            .then(() => sendResponse({ success: true })) // Respond when successful
            .catch(error => sendResponse({ success: false, error: error.message }));
  
            return true; // Keep the message port open for async operations
        } catch (error) {
            console.error(error);
            sendResponse({ success: false, error: error.message });
            return true;
        }
    }
  
    if (request.action === "read_bookmarks") {
        // Fetch saved URLs from MongoDB
        fetch('http://localhost:3000/saved-urls')
            .then(response => response.json())
            .then(data => {
                console.log("Fetched URLs from database:", data); // Debugging step
                
                // Store fetched URLs in chrome.storage.local
                chrome.storage.local.set({ savedUrls: data }, () => {
                    console.log("URLs saved to chrome.storage.local:", data); // Debugging step
                    
                    // Open a new tab to display the URLs
                    chrome.tabs.create({ url: chrome.runtime.getURL("saved_urls.html") }, () => {
                        sendResponse({ success: true });
                    });
                });
            })
            .catch(error => {
                console.error("Error fetching saved URLs:", error);
                sendResponse({ success: false, error: error.message });
            });
  
        return true; // Keep the message port open for async operations
    }
  });
  
  
  