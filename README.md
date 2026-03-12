# LLM Streaming Proxy

A real-time LLM streaming proxy with load balancing and fallback routing. This project aims to provide a reliable and scalable solution for integrating Large Language Models (LLMs) into applications, ensuring high availability and optimal performance through intelligent request distribution and redundancy.

## Features

- **Load Balancing**: Distribute incoming requests across multiple LLM instances.
- **Fallback Routing**: Automatically switch to a healthy LLM instance if the primary fails.
- **Real-time Streaming**: Efficiently handle streaming responses from LLMs.
- **Simple Configuration**: Easy to set up and manage LLM endpoints.

## Getting Started

To get started, you'll need to configure your LLM endpoints in `config.js` and run the proxy server.

### Installation

```bash
npm install
```

### Running the Proxy

```bash
npm start
```

## Configuration

Edit `config.js` to define your LLM providers and their respective API keys and endpoints.

## API Usage

Send your LLM requests to the proxy server endpoint (e.g., `http://localhost:3000/stream`). The proxy will handle routing and streaming.

```javascript
// Example using fetch API
fetch('http://localhost:3000/stream', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'Hello, world!' })
})
.then(response => {
  // Handle streaming response
});
```
