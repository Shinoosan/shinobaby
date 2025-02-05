export default defineConfig({
  // Add this to ensure proper host binding
  server: {
    host: true,
    port: 5173
  },
  // Add this if you're using a non-root path
  base: '/',
}) 