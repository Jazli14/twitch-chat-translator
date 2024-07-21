let liveChatObserver = null;
let vodChatObserver = null;

function translateText(text, targetLanguage, callback) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const translatedText = data[0][0][0];
      callback(translatedText);
    })
    .catch(error => console.error('Error translating text:', error));
}

function translateChatMessages(targetLanguage, chatContainerSelector, messageSelector) {
  const chatContainer = chatContainerSelector;

  if (!chatContainer) {
    console.error('Chat container not found!');
    return;
  }

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const messageNodes = node.querySelectorAll(messageSelector);

          messageNodes.forEach(messageNode => {
            const originalText = messageNode.textContent;

            translateText(originalText, targetLanguage, translatedText => {
              messageNode.textContent = translatedText;
            });
          });
        }
      });
    });
  });

  observer.observe(chatContainer, { childList: true, subtree: true });
  return observer;
}

function startTranslation() {
  chrome.storage.sync.get(['targetLanguage', 'isEnabled'], data => {
    if (data.isEnabled) {
      const targetLanguage = data.targetLanguage || 'en';
      const url = window.location.href;

      let chatContainer, messageSelector;

      if (url.includes('twitch.tv/videos/')) {
        // For VODs, use fallback if 7TV container is not found
        chatContainer = document.querySelector('.video-chat__message-list-wrapper')
        messageSelector = '.text-token'; // VODs use .text-token
        if (!document.querySelector(messageSelector)){
          messageSelector = '.text-fragment';
        }
        if (chatContainer) {
          // Translate VOD chat messages
          vodChatObserver = translateChatMessages(targetLanguage, chatContainer, messageSelector);
        } else {
          console.error('Failed to find chat container or message selector for VODs.');
        }
      } else if (url.includes('twitch.tv/')) {
        // For live streams, determine whether to use 7TV or base Twitch
        chatContainer = document.querySelector('.seventv-chat-scroller') ||
                        document.querySelector('.chat-scrollable-area__message-container');
                        
        // Determine the appropriate message selector
        if (document.querySelector('.seventv-chat-scroller')) {
          messageSelector = '.text-token'; // 7TV chat messages
        } else {
          messageSelector = '.text-fragment'; // Base Twitch chat messages
        }

        if (chatContainer && messageSelector) {
          // Translate live chat messages
          liveChatObserver = translateChatMessages(targetLanguage, chatContainer, messageSelector);
        } else {
          console.error('Failed to find chat container or message selector for live chat.');
        }
      }
    }
  });
}

function stopTranslation() {
  if (liveChatObserver) {
    liveChatObserver.disconnect();
    liveChatObserver = null;
  }
  if (vodChatObserver) {
    vodChatObserver.disconnect();
    vodChatObserver = null;
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateState') {
    chrome.storage.sync.set({ isEnabled: message.isEnabled });
    if (message.isEnabled) {
      startTranslation();
    } else {
      stopTranslation();
    }
  }
});

// Start translation when content script is first loaded
startTranslation();
