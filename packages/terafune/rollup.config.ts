import typescript from '@rollup/plugin-typescript'

/** @type {import("rollup").RollupOptions} */
export default {
  input: ['./src/index.ts'],
  output: [
    {
      format: 'es',
      dir: 'dist',
      name: 'terafune'
    }
  ],
  external: ['@tauri-apps/api'],
  plugins: [typescript()]
}
