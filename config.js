module.exports = {
  LLM_PROVIDERS: [
    {
      name: 'OpenAI-Primary',
      baseUrl: 'http://localhost:8000', // Example: your local OpenAI-compatible server
      apiKey: process.env.OPENAI_API_KEY || 'sk-your-openai-key-1' // Use env var in production
    },
    {
      name: 'OpenAI-Secondary',
      baseUrl: 'http://localhost:8001', // Example: another instance or different provider
      apiKey: process.env.ALT_OPENAI_API_KEY || 'sk-your-openai-key-2'
    }
    // Add more providers here for additional redundancy or load balancing
    // { name: 'Anthropic', baseUrl: 'https://api.anthropic.com', apiKey: 'sk-ant-your-anthropic-key' }
  ]
};
