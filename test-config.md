# Testing Infinity Chat

## Quick Test Guide

### 1. Start the Application
```bash
npm start
```

### 2. Configure API Provider

1. Click the Settings button (⚙️) in the top-right
2. Select your preferred provider:
   - **Gemini** (Recommended for testing - has free tier)
   - **OpenAI** 
   - **OpenRouter**

### 3. Add Your API Key

#### For Gemini (Free):
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy and paste into the settings

#### For OpenAI:
1. Go to https://platform.openai.com/api-keys
2. Create a new key
3. Copy and paste into the settings

#### For OpenRouter:
1. Go to https://openrouter.ai/keys
2. Create a new key
3. Copy and paste into the settings

### 4. Select a Model

1. Click "Save and Close" in settings
2. Click the model selector at the bottom-right
3. Choose your preferred model

### 5. Test Conversations

Try these test prompts:
- "Hello! Can you introduce yourself?"
- "Write a simple Python function to calculate fibonacci numbers"
- "Explain quantum computing in simple terms"
- "Create a haiku about programming"

### 6. Test Features

- **New Chat**: Click "+ New Chat" or press Ctrl+N
- **Chat History**: Click on previous chats in the left panel
- **Markdown Rendering**: Ask for code examples to see syntax highlighting
- **Model Switching**: Try different models mid-conversation
- **Keyboard Shortcuts**:
  - Ctrl+N: New chat
  - Ctrl+,: Open settings
  - Escape: Close modals
  - Enter: Send message

### Common Issues & Solutions

#### "API Key Required" Error
- Make sure you've entered a valid API key in settings
- Check that you've selected the correct provider

#### "Model Not Found" Error
- The selected model might not be available for your account
- Try selecting a different model from the dropdown

#### No Response from AI
- Check your internet connection
- Verify your API key has sufficient credits/quota
- Try a different model or provider

### Building for Distribution

To create an installable version:

```bash
# For current platform
npm run dist

# For specific platforms
npm run dist -- --win   # Windows
npm run dist -- --mac   # macOS  
npm run dist -- --linux # Linux
```

The installer will be created in the `dist` folder.