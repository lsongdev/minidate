import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
// const name = 'minidate';
// const esModule = false;
// const sourcemap = true;

// export default {
//   input: './src/index.js',
//   output: [
//     { file: `dist/${name}.js`, format: "cjs", esModule, sourcemap },
//     { file: `dist/${name}-esm.js`, format: "esm", esModule, sourcemap },
//     { file: `dist/${name}-umd.js`, format: "umd", esModule, sourcemap, name },
//   ]
// }


import { name, main, types, source } from './package.json';

export default [
  {
    input: source,
    output: {
      name,
      file: main,
      format: 'umd',
    },
    plugins: [
      typescript()
    ]
  },
  {
    input: source,
    output: {
      file: types,
    },
    plugins: [dts()]
  }
];