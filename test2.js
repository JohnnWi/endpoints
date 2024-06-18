const endpoints = [
    'https://g.w.lavanet.xyz:443/gateway/polygon1/rpc-http/c9d3ba25faf2c25f110318ce203a3772',
    'https://g.w.lavanet.xyz:443/gateway/optm/rpc-http/c9d3ba25faf2c25f110318ce203a3772',
    'https://g.w.lavanet.xyz:443/gateway/base/rpc-http/c9d3ba25faf2c25f110318ce203a3772',
    'https://g.w.lavanet.xyz:443/gateway/arb1/rpc-http/c9d3ba25faf2c25f110318ce203a3772',
    'https://g.w.lavanet.xyz:443/gateway/celo/rpc-http/c9d3ba25faf2c25f110318ce203a3772',
    'https://g.w.lavanet.xyz:443/gateway/avax/rpc-http/c9d3ba25faf2c25f110318ce203a3772',
    'https://g.w.lavanet.xyz:443/gateway/blast/rpc-http/c9d3ba25faf2c25f110318ce203a3772',
    'https://g.w.lavanet.xyz:443/gateway/fvm/rpc-http/c9d3ba25faf2c25f110318ce203a3772',
    'https://g.w.lavanet.xyz:443/gateway/eth/rpc-http/c9d3ba25faf2c25f110318ce203a3772',
    'https://g.w.lavanet.xyz:443/gateway/sep1/rpc-http/c9d3ba25faf2c25f110318ce203a3772',
    'https://g.w.lavanet.xyz:443/gateway/ftm250/rpc-http/c9d3ba25faf2c25f110318ce203a3772'
  ];

  const requests = [
    {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1
   },
   {
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      params: [],
      id: 2
   },
   {
      jsonrpc: '2.0',
      method: 'eth_maxPriorityFeePerGas',
      params: [],
      id: 4
   },
   {
      jsonrpc: '2.0',
      method: 'eth_newBlockFilter',
      params: [],
      id: 67
   },
   {
      jsonrpc: '2.0',
      method: 'eth_newPendingTransactionFilter',
      params: [],
      id: 67
   },
   {
      jsonrpc: '2.0',
      method: 'eth_syncing',
      params: [],
      id: 67
   },
   {
      jsonrpc: '2.0',
      method: 'net_version',
      params: [],
      id: 67
   }
  ];
  
  function callEndpoint(endpoint) {
    requests.forEach(requestData => {
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
      .then(response => response.json())
      .then(data => console.log(`Response from ${endpoint} for method ${requestData.method}:`, data))
      .catch(error => console.error(`Error from ${endpoint} for method ${requestData.method}:`, error));
    });
  }
  
  function getRandomDelay() {
    return Math.floor(Math.random() * (40000 - 10000 + 1)) + 7000;
  }
  
  function scheduleCall(endpoint) {
    const delay = getRandomDelay();
    console.log(`Next call to ${endpoint} in ${delay / 1000} seconds`);
    setTimeout(() => {
      callEndpoint(endpoint);
      scheduleCall(endpoint); // Reschedule after the call
    }, delay);
  }
  
  // Schedule each endpoint call with a random delay
  endpoints.forEach(endpoint => {
    scheduleCall(endpoint);
  });