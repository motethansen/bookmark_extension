chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "save_tabs") {
      try {
        let tabs = await chrome.tabs.query({ currentWindow: true });
        let tabUrls = tabs.map(tab => ({ title: tab.title, url: tab.url }));
        
        let blob = new Blob([JSON.stringify(tabUrls, null, 2)], { type: 'application/json' });
        let reader = new FileReader();

        reader.onloadend = function() {
          let now = new Date();
          let fileName = `tabs_${now.toISOString().replace(/[:.]/g, '-')}.json`;
          let base64Data = reader.result.split(',')[1];

          chrome.downloads.download({
            url: `data:application/json;base64,${base64Data}`,
            filename: fileName,
            saveAs: true
          }, (downloadId) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              sendResponse({ success: false, error: chrome.runtime.lastError.message });
            } else {
              console.log(`Download started with ID: ${downloadId}`);
              sendResponse({ success: true });
            }
          });
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        console.error(error);
        sendResponse({ success: false, error: error.message });
      }
      return true; // Keeps the message channel open for sendResponse
    }
  });