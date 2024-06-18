const fetch = require('node-fetch');

// URL dell'endpoint JSON-RPC-HTTP di Celestia
const url = 'https://g.w.lavanet.xyz:443/gateway/celestia/json-rpc-http/c9d3ba25faf2c25f110318ce203a3772';

// Lista di oggetti JSON da inviare come payload della richiesta
const payloads = [
  {
    id: 1,
    jsonrpc: '2.0',
    method: 'header.LocalHead',
    params: []
  },
  {
    id: 2,
    jsonrpc: '2.0',
    method: 'blob.GetProof',
    params: [
      42,
      'AAAAAAAAAAAAAAAAAAAAAAAAAAECAwQFBgcICRA=',
      'Bw=='
    ]
  },
  {
    id: 3,
    jsonrpc: '2.0',
    method: 'header.GetByHeight',
    params: [
      42
    ]
  },
  {
    id: 4,
    jsonrpc: '2.0',
    method: 'header.GetByHash',
    params: [
      '07'
    ]
  },
  {
    id: 5,
    jsonrpc: '2.0',
    method: 'fraud.Subscribe',
    params: [
      'badencodingv0.1'
    ]
  },
  {
    id: 6,
    jsonrpc: '2.0',
    method: 'fraud.Get',
    params: [
      'badencodingv0.1'
    ]
  },
  {
    id: 7,
    jsonrpc: '2.0',
    method: 'das.WaitCatchUp',
    params: []
  },
  {
    id: 8,
    jsonrpc: '2.0',
    method: 'das.SamplingStats',
    params: []
  },
  {
    id: 9,
    jsonrpc: '2.0',
    method: 'blob.Included',
    params: [
      42,
      'AAAAAAAAAAAAAAAAAAAAAAAAAAECAwQFBgcICRA=',
      [
        {
          end: 4,
          nodes: [
            'dGVzdA=='
          ],
          is_max_namespace_ignored: true
        }
      ],
      'Bw=='
    ]
  },
  {
    id: 10,
    jsonrpc: '2.0',
    method: 'blob.GetAll',
    params: [
      42,
      [
        'AAAAAAAAAAAAAAAAAAAAAAAAAAECAwQFBgcICRA='
      ]
    ]
  }
];

async function sendJsonRpcRequest(payload, delay) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(`Response from Celestia for method ${payload.method}:`, responseData);

    // Calcola il prossimo timeout in secondi
    const nextDelayInSeconds = delay / 1000;
    console.log(`Next request for method ${payload.method} in ${nextDelayInSeconds} seconds...`);

  } catch (error) {
    console.error(`Error sending JSON-RPC request for method ${payload.method}:`, error);
  }
}

function sendRequestInterval() {
  function sendRequestWithRandomDelay(payload) {
    const randomDelay = Math.floor(Math.random() * (40000 - 15000 + 1)) + 15000; // Intervallo casuale tra 15 e 40 secondi in millisecondi
    setTimeout(() => {
      sendJsonRpcRequest(payload, randomDelay);
      sendRequestWithRandomDelay(payload); // Richiama la funzione per inviare la richiesta successiva
    }, randomDelay);
  }

  // Inizializza l'invio delle richieste con un ritardo casuale per ciascun payload
  payloads.forEach((payload) => {
    sendRequestWithRandomDelay(payload);
  });
}

// Avvia l'invio periodico delle richieste con ritardo casuale
sendRequestInterval();
