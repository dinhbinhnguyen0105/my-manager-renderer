npm install react react-dom
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
npm install --save-dev html-webpack-plugin
npm install --save-dev style-loader css-loader


#package.json
"scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
},