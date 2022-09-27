# React with Webpack and Babel
 - What is Webpack?
    - it's a bundler
 ![alt text](readme-assets\webpack.gif)
    - It bundles different MODULES WITH DEPENDENCIES into STATIC ASSETS.
- Why Webpack?
    - It makes our life wasier by managing all these dependencies.
    - It can help us optimize application by bundling all the different files into single file or chunks of files based on requirements.
    - We can even load only required chunk of application for faster loading time.
- **Core concepts** of Webpack
    - Entry
        - An entry point indicates which module webpack should use to begin building out its internal dependency graph
    - Output
        - The output property tells webpack where to emit the bundles it creates and how to name these files
    - Loaders
        - Out of the box, webpack only understands JavaScript and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph.
    - Plugins
        - While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.
    - Mode
        - By setting the mode parameter to either development, production or none, you can enable webpack's built-in optimizations that correspond to each environment. The default value is production.(we can use this when having different configuration for development and production)
- What is Babel?
    - A JS compiler.
    - Compiles latest JS which is not supported in all the browsers to the JS which is supported in different browsers
- Why Babel?
    - Transform syntax.
    - Polyfill features that are missing in your target environment.
- **Core Concepts** of Babel
    - Plugins
        - Babel's code transformations are enabled by applying plugins (or presets) to your configuration file.
    - Presets
        - Babel presets can act as sharable set of Babel plugins and/or config options.
            - @babel/preset-env for compiling ES2015+ syntax
            - @babel/preset-typescript for TypeScript
            - @babel/preset-react for React
            - @babel/preset-flow for Flow

# React with webpack v5 and Babel
1. Initialize a node project
	1. Create directory and run (here directory name is react-webpack5).
		```bash
            cd react-webpack5
            yarn init -y
        ```
2. Setup Webpack
	1. Create following file `public\index.html` and add as following:
        ```html
           <!DOCTYPE html>
            <html>
                <head>
                    <title>Hello Webpack</title>
                </head>
                <body>
                    <div id="app"></div>
                    <script src="./bundle.js"></script>
                </body>
            </html>
        ```
    2. Run following command to install webpack as dev dependency
        ```bash
        yarn add -D webpack webpack-dev-server webpack-cli
        ```
    3. Open package.json and add following:
		```json
        "scripts": {
            "start": "webpack serve --config ./webpack.config.js --mode development",
            "build": "webpack --config ./webpack.config.js --mode production"
        }
		```
    4. In root create `webpack.config.js` and add
        ```js
        const path = require('path'); //in order to resolve paths properly across different OS
        module.exports = {
            entry: path.resolve(__dirname, './src/index.js'),
            output: {
                path: path.resolve(__dirname, './dist'),
                filename: 'bundle.js'
            },
           devServer: {
                static: {
                    directory: path.join(__dirname, 'public'),
                },
                port: 3000
            }
        };
        ```
3. Setup Babel
    1. Run following command to install babel as dev dependency
        ```bash
        yarn add -D @babel/core @babel/preset-env @babel/preset-react babel-loader
        ```
    2. create new file in root ```.babelrc``` and add
        ```json
        {
            "presets": [
                "@babel/preset-env",
                "@babel/preset-react"
            ]
        }
        ```
    3. add following to `webpack.config.js`
        ```js
        { 
            ...
            entry: path.resolve(__dirname, './src/index.js'),
            //NEW CODE START
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: ['babel-loader'],
                    },
                ],
            },
            resolve: {
                extensions: ['*', '.js', '.jsx'],
            },
            //NEW CODE END
            output: {
                ...
        }
        ```
4. Setup React
    1. Run this command and install
        ```bash
        yarn add react react-dom
        ```
    3. Create following file `src/App.jsx` and add
        ```jsx
        import React from 'react';
        export default function App() {
            return <h1>
            React with Webpack5
            </h1>
        }
        ```
    3. Create following file `src/index.js` and add
        ```js
       import React from 'react';
       import * as ReactDOM from 'react-dom/client';
       import App from './App';
       
       const root = ReactDOM.createRoot(
        document.getElementById('app')
        );
        root.render(<App />)
        ```
    4. Adding Hot Module Replacement
        1. install `react-hot-loader` as dev dependency
        ```bash 
        yarn add -D react-hot-loader
        ```
        2. Make following changes to `webpack.config.js`
        ```js
        const webpack = require('webpack');
        ...
        module.exports = {
            ...
            plugins: [new webpack.HotModuleReplacementPlugin()],
            devServer: {
                static: {
                    directory: path.join(__dirname, 'public'),
                },
                port: 3000,
                hot: true
            }
            ...
        }
        ```
        3. To use hot reloading update `src/index.js` as following
        ```js
        import React from 'react';
       import * as ReactDOM from 'react-dom/client';
       import App from './App';
       
       const root = ReactDOM.createRoot(
        document.getElementById('app')
        );
        root.render(<App />)
        module.hot.accept();
        ```
5. Add TypeScript (Optional)
    1. run this command in root directory 
    ```bash
    yarn add -D typescript ts-loader @types/node @types/react @types/react-dom @types/webpack-env
    ```
    2. In root directory create `tsconfig.json` and add following
    ```json
    {
        "compilerOptions": {
            "outDir": "./dist/",
            "noImplicitAny": true,
            "module": "es6","target": "es5",
            "jsx": "react",
            "allowJs": true,
            "allowSyntheticDefaultImports": true,
            "moduleResolution": "Node"
        }
    }
    ```
    3. In `webpack.config.js` update as following
    ```js
    //before
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    ```
    ```js 
    // after
    entry: path.resolve(__dirname, './src/index.tsx'),
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ],
    },
    resolve: {
        extensions: ['*', '.tsx', '.ts', '.js'],
    },
    ```


 ## References:
 - https://babeljs.io/docs/en/
- https://webpack.js.org/
- https://www.robinwieruch.de/blog/