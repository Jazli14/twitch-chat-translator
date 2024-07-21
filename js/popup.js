document.getElementById('save').addEventListener('click', () => {
  const language = document.getElementById('language').value;
  chrome.storage.sync.set({ targetLanguage: language });
});

chrome.storage.sync.get(['targetLanguage', 'isEnabled'], data => {
  document.getElementById('language').value = data.targetLanguage || 'en';
  const isEnabled = data.isEnabled || false;
  document.getElementById('toggle').textContent = isEnabled ? 'Disable Translation' : 'Enable Translation';
});

document.getElementById('toggle').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    
    if (url && url.includes('twitch.tv')) {
      chrome.storage.sync.get('isEnabled', data => {
        const isEnabled = !data.isEnabled;
        chrome.storage.sync.set({ isEnabled: isEnabled });

        // Update button text
        document.getElementById('toggle').textContent = isEnabled ? 'Disable Translation' : 'Enable Translation';

        // Send a message to the content script to update its state
        chrome.tabs.sendMessage(tabs[0].id, { action: 'updateState', isEnabled: isEnabled });

        // Log the action
        console.log(isEnabled ? 'Translation enabled on Twitch.' : 'Translation disabled on Twitch.');
      });
    } else {
      console.log('This extension only works on twitch.tv.');
    }
  });
});
