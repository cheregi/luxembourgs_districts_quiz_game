import pkg from '../package.json'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/script.ts',
  output: {
    file: pkg.main,
    format: 'umd',
    name: pkg.name,
    sourcemap: true
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      useTsconfigDeclarationDir: true
    })
  ]
}
