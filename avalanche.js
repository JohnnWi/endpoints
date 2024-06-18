const fetch = require('node-fetch');

const endpoint = 'https://g.w.lavanet.xyz:443/gateway/avax/rpc-http/c9d3ba25faf2c25f110318ce203a3772';

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
    }
];

async function fetchData() {
    for (let request of requests) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(`Response for ${request.method}:`, data);
        } catch (error) {
            console.error(`Error fetching data for ${request.method}:`, error);
        }
    }
}

// Run fetchData every 5 seconds
setInterval(fetchData, 5000);

// Initial call to fetchData
fetchData();
