import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/this.img.browser.js',  // Punto de entrada para el navegador
  target: 'web',                    // Específico para entornos web
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'this.img.browser.js',
    library: 'thisImg',
    libraryTarget: 'umd',           // Soporta AMD, CommonJS y como variable global
    globalObject: 'this'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
