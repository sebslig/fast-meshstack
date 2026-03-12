const express = require('express');
const fetch = require('node-fetch');
const { LLM_PROVIDERS } = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let currentProviderIndex = 0;

// Basic health check for providers
const getHealthyProvider = async () => {
  for (let i = 0; i < LLM_PROVIDERS.length; i++) {
    const provider = LLM_PROVIDERS[(currentProviderIndex + i) % LLM_PROVIDERS.length];
    try {
      // A simple health check, could be more sophisticated
      const response = await fetch(`${provider.baseUrl}/health`, { timeout: 1000 });
      if (response.ok) {
        currentProviderIndex = (currentProviderIndex + i) % LLM_PROVIDERS.length;
        return provider;
      }
    } catch (error) {
      console.warn(`Provider ${provider.name} at ${provider.baseUrl} is unhealthy.`);
    }
  }
  return null; // No healthy providers found
};

app.post('/stream', async (req, res) => {
  const healthyProvider = await getHealthyProvider();

  if (!healthyProvider) {
    return res.status(503).json({ error: 'No healthy LLM providers available.' });
  }

  console.log(`Routing request to: ${healthyProvider.name}`);

  try {
    const llmResponse = await fetch(`${healthyProvider.baseUrl}/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${healthyProvider.apiKey}`
      },
      body: JSON.stringify(req.body)
    });

    if (!llmResponse.ok) {
      throw new Error(`LLM provider responded with status ${llmResponse.status}`);
    }

    res.set(llmResponse.headers.raw());
    llmResponse.body.pipe(res);
  } catch (error) {
    console.error('Error streaming from LLM provider:', error.message);
    // Attempt fallback (very basic, could be recursive or queue-based)
    console.log('Attempting fallback to another provider...');
    currentProviderIndex = (currentProviderIndex + 1) % LLM_PROVIDERS.length; // Move to next provider
    // For this minimal example, we'll just return an error on first failure.
    // A real system would re-attempt the request with new provider.
    res.status(500).json({ error: 'Failed to stream from LLM provider, consider retrying.' });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Proxy is healthy' });
});

app.listen(PORT, () => {
  console.log(`LLM Streaming Proxy running on port ${PORT}`);
  console.log('Ensure your LLM providers have a /health endpoint for basic checks.');
});
