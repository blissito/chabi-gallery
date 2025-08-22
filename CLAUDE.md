# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This project is an SDK client for the Hono API hosted at https://hono-chavy.fly.dev/. The SDK should provide a clean interface for consuming the API endpoints in production environments.

## API Endpoint

- **Production URL**: https://hono-chavy.fly.dev/
- **Important**: Always use the production URL, never localhost

## Development Setup

Since this is a new project, initialization steps are needed:

### For TypeScript/JavaScript SDK:
```bash
npm init -y
npm install typescript @types/node --save-dev
npm install axios # or fetch API wrapper of choice
npx tsc --init
```

### Common Commands (once set up):
```bash
npm run build      # Compile TypeScript
npm run test       # Run tests
npm run lint       # Run linter
```

## SDK Architecture Guidelines

When building the SDK:

1. **Client Class Structure**: Create a main client class that initializes with the production URL
2. **Error Handling**: Implement proper error handling with custom error classes
3. **Type Safety**: If using TypeScript, define interfaces for all API responses
4. **Authentication**: Handle authentication headers/tokens if required by the API
5. **Request Methods**: Create methods for each API endpoint following RESTful conventions

## Key Implementation Notes

- Always use `https://hono-chavy.fly.dev/` as the base URL
- Never hardcode localhost or development URLs
- Implement retry logic for network failures
- Add request/response interceptors for logging if needed
- Use environment variables for any sensitive configuration (API keys, etc.)

## Testing

When implementing tests:
- Mock API responses for unit tests
- Use the actual production API sparingly for integration tests
- Test error scenarios and edge cases