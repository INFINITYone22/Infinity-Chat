# Infinity Chat - Desktop AI Chat Interface

A beautiful, cross-platform desktop AI chat interface built with Electron, HTML, and JavaScript. Provides a unified user experience with support for multiple AI providers including OpenAI, Google Gemini, and OpenRouter.

## ✨ Features

- **Multi-Provider Support**: Seamlessly switch between OpenAI, Google Gemini, and OpenRouter
- **Beautiful UI**: Modern, gradient-enhanced dark theme with smooth animations
- **Chat History**: Persistent conversation history with easy navigation
- **Model Selection**: Dynamic model selection with search functionality
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Secure**: API keys stored locally, never transmitted to third parties
- **Markdown Support**: Rich text formatting with syntax highlighting for code blocks

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/infinity-chat/desktop.git
cd desktop
```

2. Install dependencies:
```bash
npm install
```

3. Run the application:
```bash
npm start
```

## 🔑 API Setup

### Google Gemini (Recommended - Free Tier Available)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key in the settings (⚙️)

### OpenAI
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add the key in the settings

### OpenRouter
1. Visit [OpenRouter Keys](https://openrouter.ai/keys)
2. Create a new API key
3. Add the key in the settings

## 📦 Building for Distribution

### Build for your current platform:
```bash
npm run dist
```

### Platform-specific builds:

**Windows:**
```bash
npm run dist -- --win
```

**macOS:**
```bash
npm run dist -- --mac
```

**Linux:**
```bash
npm run dist -- --linux
```

The built applications will be available in the `dist` folder.

## 🎨 User Interface

- **Chat Area**: Main conversation interface with message bubbles
- **History Panel**: Left sidebar showing all your conversations
- **Model Selector**: Bottom-right tab for quick model switching
- **Settings**: Top-right gear icon for API configuration
- **Window Controls**: Custom titlebar with minimize, maximize, and close buttons

## 🛠️ Technology Stack

- **Electron**: Cross-platform desktop framework
- **HTML/CSS/JavaScript**: Frontend technologies
- **Marked.js**: Markdown parsing
- **Highlight.js**: Syntax highlighting
- **Electron Builder**: Application packaging

## 📝 Configuration

The application stores configuration locally in:
- **Windows**: `%APPDATA%/infinity-chat`
- **macOS**: `~/Library/Application Support/infinity-chat`
- **Linux**: `~/.config/infinity-chat`

## 🔒 Security

- API keys are stored locally using localStorage
- No telemetry or external tracking
- All API calls are made directly from your machine
- Context isolation enabled for security

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC License - see LICENSE file for details

## 🐛 Troubleshooting

### Application won't start
- Ensure Node.js is installed and up to date
- Try deleting `node_modules` and running `npm install` again

### API calls failing
- Verify your API key is correct
- Check your internet connection
- Ensure you've selected the correct provider
- Some models may require specific account permissions

### Models not loading
- The app includes fallback default models if the API fails
- Try refreshing the model list by reopening settings

## 📧 Support

For issues and feature requests, please use the GitHub issues page.

---

**Infinity Chat** - Bringing AI conversations to your desktop with style and simplicity.