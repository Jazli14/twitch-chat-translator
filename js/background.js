chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ targetLanguage: 'en', isEnabled: false }, () => {
      console.log('Default target language set to English and translation disabled.');
    });
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  });
  