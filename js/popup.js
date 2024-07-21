document.addEventListener('DOMContentLoaded', () => {
  // Default button state
  document.getElementById('toggle').textContent = 'Enable Translation';
  document.getElementById('toggle').disabled = false;
  document.getElementById('toggle').style.backgroundColor = '#007bff'; // Default color

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    
    if (url && url.includes('twitch.tv')) {
      // If on twitch.tv, set the button text based on stored state
      chrome.storage.sync.get('isEnabled', data => {
        const isEnabled = data.isEnabled || false;
        document.getElementById('toggle').textContent = isEnabled ? 'Disable Translation' : 'Enable Translation';
      });
    } else {
      // If not on twitch.tv, disable the button and gray it out
      document.getElementById('toggle').disabled = true;
      document.getElementById('toggle').style.backgroundColor = '#6c757d'; // Grayed out color
      console.log('This extension only works on twitch.tv.');
    }
  });
});

// Save the selected language
document.getElementById('save').addEventListener('click', () => {
  const language = document.getElementById('language').value;
  chrome.storage.sync.set({ targetLanguage: language });
});

// Toggle translation functionality
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
