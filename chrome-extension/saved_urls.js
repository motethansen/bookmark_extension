document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('savedUrls', function(result) {
        const urls = result.savedUrls || [];
        console.log("Retrieved URLs from storage:", urls); // Debugging step

        const urlList = document.getElementById('urlList');

        // Clear the list if already populated
        urlList.innerHTML = '';

        // If no URLs found, display a message
        if (urls.length === 0) {
            const li = document.createElement('li');
            li.textContent = "No URLs found.";
            urlList.appendChild(li);
            return;
        }

        // Populate the list with saved URLs
        urls.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.url;
            a.target = '_blank'; // Open link in new tab
            a.textContent = item.url;
            li.appendChild(a);
            urlList.appendChild(li);
        });
    });
});
