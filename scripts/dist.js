import pkg from '../package.json'

export default {
  input: 'src/script.js',
  output: {
    file: pkg.main,
    format: 'umd',
    name: pkg.name,
    sourcemap: true
  }
}
