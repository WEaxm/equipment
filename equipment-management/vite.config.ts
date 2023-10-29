import { defineConfig, UserConfig } from 'vite';
import ViteUserConfig from './configs/vite';

export default defineConfig((config: UserConfig): UserConfig => {
  return {
    ...ViteUserConfig,
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
