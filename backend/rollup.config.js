import external from 'rollup-plugin-peer-deps-external'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './index.ts',
  plugins: [
    json(),
    external({ includeDependencies: true }),
    typescript(),
    commonjs({
      esmExternals: true,
    }),
  ],
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'auto',
  },
}
