import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import handler from './api/generate-image.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Populate process.env for the local API handler
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      {
        name: 'local-api-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith('/api/generate-image')) {
              if (req.method === 'POST') {
                let body = '';
                req.on('data', chunk => { body += chunk; });
                req.on('end', async () => {
                  try {
                    req.body = body ? JSON.parse(body) : {};
                  } catch (e) {
                    req.body = {};
                  }

                  // Provide Vercel-compatible res.status and res.json helpers
                  res.status = (code) => {
                    res.statusCode = code;
                    return res;
                  };
                  res.json = (data) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                    return res;
                  };

                  try {
                    await handler(req, res);
                  } catch (err) {
                    console.error('Local dev API handler error:', err);
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: err.message }));
                  }
                });
                return;
              }
            }
            next();
          });
        }
      }
    ],
    server: {
      port: 5173,
      open: false,
    },
  };
});
