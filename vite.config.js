import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'

const projectRootDir = resolve(__dirname);
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnvValues = {
    'process.env': Object.entries(env).reduce(
      (prev, [key, val]) => {
        return {
          ...prev,
          [key]: val,
        }
      },
      {},
    )
  }
  return {
    base: '/drinking-game',
    plugins: [
      react(),
      alias({
        entries: [
          {
            find: '@',
            replacement: resolve(projectRootDir, 'src')
          }
        ]
      })
    ],
    define: processEnvValues
  }
})
