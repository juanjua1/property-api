export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://alt94-front.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Basic API response
  if (req.method === 'GET' && (req.url === '/' || req.url === '/api')) {
    res.status(200).json({
      message: 'Property API is running!',
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      mongodb: process.env.MONGODB_URI ? 'connected' : 'not configured',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth',
        users: '/api/users',
        products: '/api/products'
      }
    });
    return;
  }

  if (req.method === 'GET' && req.url === '/health') {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: process.env.MONGODB_URI ? 'configured' : 'not configured',
      cors: process.env.CORS_ORIGIN || 'default'
    });
    return;
  }

  // For now, return a simple response for other routes
  res.status(404).json({
    error: 'Not Found',
    message: 'Endpoint not implemented yet',
    url: req.url,
    method: req.method,
    available_endpoints: ['/', '/health']
  });
}
