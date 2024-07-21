# Twitch Chat Translator

A Chrome extension that translates Twitch chat messages into different languages. This extension supports both live streams and VODs on Twitch.

## Features

- **Language Translation**: Translate chat messages into multiple languages.
- **Supports 7TV**: Compatible with Twitch’s 7TV extension.
- **User-Friendly Interface**: Easy to enable or disable translation through the extension popup.
- **Domain Restriction**: The extension only activates on `twitch.tv` domains.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/twitch-chat-translator.git

2. Load the Extension:

- **Open Chrome and go to chrome://extensions/.
- **Enable "Developer mode" using the toggle in the top right corner.
- **Click "Load unpacked" and select the directory where you cloned the repository.

## Usage
1. Open Twitch:
- ** Navigate to twitch.tv in your browser.

2. Open the Extension Popup:
- **Click the extension icon in the Chrome toolbar to open the popup.

3. Select Language:
- **Choose your desired target language from the dropdown menu.

4. Enable Translation:
- **Click the "Enable Translation" button to start translating chat messages. The button text will toggle between "Enable Translation" and "Disable Translation" based on the current state.

## Configuration
### Supported Languages
- **English**
- **Spanish**
- **French**

## Selector Handling
- **7TV: Uses '.text-token' for chat messages.
- **Base Twitch: Uses '.text-fragment' for chat messages.

## Development
To make changes or contribute to the extension:

Clone the Repository:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/twitch-chat-translator.git

2. Build and Test:
- Make changes to the codebase.
- Reload the extension in chrome://extensions/ to see updates.

3. Submit a Pull Request:
- Ensure that your changes are tested and documented.
- Submit a pull request with a description of your changes.

## License
This project is licensed under the GPL-3.0 License - see the LICENSE file for details.

## Contact
For issues or support, please open an issue on the GitHub repository.

