import app from './app'
const server = Bun.serve({
  port: 3000,
  fetch: app.fetch
});
console.log("Server running", server.port);