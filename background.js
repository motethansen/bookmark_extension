chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "save_tabs") {
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
        });
      };
  
      reader.readAsDataURL(blob);
    }
  });