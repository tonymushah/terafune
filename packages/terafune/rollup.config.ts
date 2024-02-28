import typescript from '@rollup/plugin-typescript'

/** @type {import("rollup").RollupOptions} */
export default {
  input: './src/index.ts',
  output: [
    {
      format: 'umd',
      dir: 'dist',
      name: 'terafune'
    }
  ],
  plugins: [typescript()]
}
