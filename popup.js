document.addEventListener('DOMContentLoaded', () => {
  // Save Tabs button functionality
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

  // View Bookmarks button functionality
  document.getElementById('viewBookmarksButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "read_bookmarks" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else if (response && !response.success) {
        console.error(response.error);
      } else {
        let bookmarksPage = window.open("bookmarks.html");
        bookmarksPage.addEventListener('load', function() {
          bookmarksPage.document.body.innerHTML = '<h1>Saved Bookmarks</h1>';
          Object.keys(response.bookmarks).forEach(key => {
            let bookmarkList = response.bookmarks[key];
            bookmarksPage.document.body.innerHTML += `<h3>${key}</h3>`;
            bookmarkList.forEach(bookmark => {
              bookmarksPage.document.body.innerHTML += `<p><a href="${bookmark.url}" target="_blank">${bookmark.title}</a></p>`;
            });
          });
        });
      }
    });
  });

  // Browse and read JSON file functionality
  document.getElementById('browseButton').addEventListener('click', function() {
    document.getElementById('fileInput').click();
  });

  document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the selected file
    if (file && file.type === "application/json") {
      const reader = new FileReader(); // Create a new FileReader object

      // Read the file as text
      reader.onload = function(e) {
        try {
          const jsonContent = JSON.parse(e.target.result); // Parse the JSON content
          document.getElementById('jsonOutput').textContent = JSON.stringify(jsonContent, null, 2); // Pretty-print the JSON
        } catch (error) {
          document.getElementById('jsonOutput').textContent = "Invalid JSON file.";
        }
      };

      reader.readAsText(file); // Trigger reading of the file
    } else {
      document.getElementById('jsonOutput').textContent = "Please select a valid JSON file.";
    }
  });
});
