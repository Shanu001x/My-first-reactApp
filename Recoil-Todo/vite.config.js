import react from '@vitejs/plugin-react'
import { createEsbuildPlugin } from 'vite-plugin-esbuild'

export default {
  plugins: [
    react(),
    createEsbuildPlugin({
      target: 'es2015',
      jsxInject: `import React from 'react'`,
      jsxFragment: 'React.Fragment',
    }),
  ],
  resolve: {

    alias: {

      react: 'react/umd/react.production.min.js',

      'react-dom': 'react-dom/umd/react-dom.production.min.js',

    },

  },
  plugins: [react()],
}