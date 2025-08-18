const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
// NOTE: 'node-fetch' is no longer needed as global fetch is available.

// App metadata for OpenRouter best practices
const APP_URL = 'https://github.com/your-repo/infinityone22';
const APP_TITLE = 'INFINITYone22';

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 750,
    minWidth: 940,
    minHeight: 600,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#121212',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile('index.html');

  // Window control IPC
  ipcMain.on('minimize-app', () => win.minimize());
  ipcMain.on('maximize-app', () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });
  ipcMain.on('close-app', () => win.close());
  ipcMain.on('toggle-fullscreen', () => win.setFullScreen(!win.isFullScreen()));

  // Chat API handler (OpenAI, OpenRouter, Gemini)
  ipcMain.handle('call-api', async (event, { apiProvider, apiKey, prompt, model }) => {
    if (!apiKey || !prompt) {
      return { error: 'API Key and prompt are required.' };
    }

    try {
      let response;
      let data;

      switch (apiProvider) {
        case 'openai':
          response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({
              model: model || 'gpt-4o-mini',
              messages: [{ role: 'user', content: prompt }],
            }),
          });
          data = await response.json();
          if (data.error) throw new Error(data.error.message || 'OpenAI API error');
          return { result: data.choices?.[0]?.message?.content ?? JSON.stringify(data) };

        case 'openrouter':
          response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
              'HTTP-Referer': APP_URL,
              'X-Title': APP_TITLE,
            },
            body: JSON.stringify({
              model: model || 'google/gemini-pro',
              messages: [{ role: 'user', content: prompt }],
            }),
          });
          data = await response.json();
          if (data.error) throw new Error(data.error.message || 'OpenRouter API error');
          return { result: data.choices?.[0]?.message?.content ?? JSON.stringify(data) };

        case 'gemini': {
          const geminiModel = model && model.trim() ? model : 'models/gemini-1.5-flash-latest';
          const url = `https://generativelanguage.googleapis.com/v1beta/${geminiModel}:generateContent?key=${apiKey}`;
          response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
          });
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `HTTP error! Status: ${response.status}`);
          }
          data = await response.json();
          const text = (data.candidates?.[0]?.content?.parts || [])
            .map(p => p.text)
            .filter(Boolean)
            .join('\n');
          return { result: text || JSON.stringify(data) };
        }

        default:
          return { error: 'Unknown API provider selected.' };
      }

    } catch (error) {
      return { error: error.message || 'Failed to call API.' };
    }
  });

  // Unified model list handler (OpenAI, OpenRouter, Gemini)
  ipcMain.handle('fetch-available-models', async (event, { apiProvider, apiKey }) => {
    if (!apiKey) {
      return { error: 'API key is required.' };
    }
    try {
      let url;
      let headers = {};
      let processFunc = (d) => [];

      switch (apiProvider) {
        case 'openai':
          url = 'https://api.openai.com/v1/models';
          headers = { 'Authorization': `Bearer ${apiKey}` };
          processFunc = (data) => (data.data || [])
            .map(m => ({ id: m.id, name: m.id }))
            .filter(m => typeof m.id === 'string' && m.id.toLowerCase().includes('gpt'));
          break;
        case 'openrouter':
          url = 'https://openrouter.ai/api/v1/models';
          headers = {
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': APP_URL,
            'X-Title': APP_TITLE,
          };
          processFunc = (data) => (data.data || [])
            .map(m => ({ id: m.id, name: m.name || m.id }))
            .filter(Boolean);
          break;
        case 'gemini':
          url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
          headers = {};
          processFunc = (data) => (data.models || [])
            .map(m => ({ id: m.name, name: m.displayName || m.name }))
            .filter(m => typeof m.id === 'string' && m.id.includes('models/gemini'));
          break;
        default:
          return { error: 'Invalid provider for fetching models.' };
      }

      const response = await fetch(url, { headers });
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error?.message || `Failed to fetch models (${response.status}).`);
      }
      return { models: processFunc(data) };
    } catch (error) {
      return { error: error.message };
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


