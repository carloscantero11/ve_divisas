const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 380,
    height: 480,
    transparent: true,
    frame: false,
    resizable: false,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handler to close the app
ipcMain.on('close-app', () => {
  app.quit();
});

// Create HTTPS agent to ignore SSL issues for BCV
const agent = new https.Agent({
  rejectUnauthorized: false
});

// Function to fetch rates
async function getRates() {
  const rates = {
    bcvUsd: null,
    bcvEur: null,
    binanceUsdt: null,
    error: null
  };

  try {
    // 1. Fetch BCV Rates
    try {
        const bcvResponse = await axios.get('https://www.bcv.org.ve/', { httpsAgent: agent, timeout: 10000 });
        const $ = cheerio.load(bcvResponse.data);
        
        // Extract USD
        const usdText = $('#dolar strong').text().trim().replace(',', '.');
        if (usdText) rates.bcvUsd = parseFloat(usdText);

        // Extract EUR
        const eurText = $('#euro strong').text().trim().replace(',', '.');
        if (eurText) rates.bcvEur = parseFloat(eurText);
    } catch (e) {
        console.error("Error fetching BCV:", e);
        rates.error = rates.error ? rates.error + ". Error BCV" : "Error BCV";
    }

    // 2. Fetch Binance USDT P2P Rate
    try {
        const binancePayload = {
          fiat: "VES",
          page: 1,
          rows: 5,
          tradeType: "SELL", 
          asset: "USDT",
          countries: [],
          proMerchantAds: false,
          shieldMerchantAds: false,
          publisherType: null,
          payTypes: [],
          classifies: ["mass", "profession", "user"]
        };

        const binanceResponse = await axios.post(
          'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
          binancePayload,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            timeout: 10000
          }
        );

        if (binanceResponse.data && binanceResponse.data.data && binanceResponse.data.data.length > 0) {
          rates.binanceUsdt = parseFloat(binanceResponse.data.data[0].adv.price);
        }
    } catch (e) {
        console.error("Error fetching Binance:", e);
        rates.error = rates.error ? rates.error + " | Error Binance" : "Error Binance";
    }

  } catch (error) {
    console.error("Error general fetching rates:", error);
    rates.error = "Error al obtener datos: " + error.message;
  }

  return rates;
}

// IPC handler to get rates
ipcMain.handle('get-rates', async () => {
  return await getRates();
});
