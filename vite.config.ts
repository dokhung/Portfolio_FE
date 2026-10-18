import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode, command }) => {
  const plugins = [react(), tailwindcss()]

  if (command === 'build') {
    return { plugins }
  }

  const frontendEnv = loadEnv(mode, fileURLToPath(new URL('.', import.meta.url)), [
    'BACKEND_',
    'FRONTEND_',
  ])
  const requiredEnv = (name: string) => {
    const value = (process.env[name] ?? frontendEnv[name])?.trim()

    if (!value) {
      throw new Error(
        `${name} が未設定です。frontend内の .env.example を .env にコピーし、値を設定してください。`,
      )
    }

    return value
  }
  const requiredPort = (name: string) => {
    const value = requiredEnv(name)
    const port = Number(value)

    if (!/^\d+$/.test(value) || !Number.isInteger(port) || port < 1 || port > 65_535) {
      throw new Error(`${name} には 1～65535 の整数を設定してください。`)
    }

    return port
  }
  const frontendPort = requiredPort('FRONTEND_PORT')
  const backendPort = requiredPort('BACKEND_PORT')
  const backendHost = requiredEnv('BACKEND_HOST')

  return {
    plugins,
    server: {
      port: frontendPort,
      strictPort: true,
      proxy: {
        '/api': {
          target: `http://${backendHost}:${backendPort}`,
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: frontendPort,
      strictPort: true,
    },
  }
})
