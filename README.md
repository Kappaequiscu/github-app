# GitHub App

Technical assessment React: GitHub Issues andPull Requests Application

## How to configure without `npx create-react-app`:

1. Initialize npm to install depencies: run `npm init -y`.
2. React will be needed to create user interfaces. Run `npm install react react-dom`.
3. Need Babel to compile modern JS into vanilla JS. Run `npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader`.
4. At same directory, need to to configure Babel. Create a file `.babelrc` and add this presets in this file:
```
{
	"presets": [
		"@babel/preset-react",
		"@babel/preset-env"
	]
}
```
5. After that, we require Webpack and Webpack-CLI to convert our module bundlers into a single file to run our app. We need to run `npm install --save-dev html-webpack-plugin style-loader css-loader file-loader`.
6. Create a file named `webpack.config.js`. This config file provides all the required information like an entry point,bundle output filename and path , plugins and various loaders that are being used for webpack to bundle and resolve various kinds of files:
```
const  HtmlWebpackPlugin = require("html-webpack-plugin")
const  path = require("path")
module.exports = {
	entry:  "./src/index.js",
	output: {
		filename:  "bundle.[hash].js",
		path:  path.resolve(__dirname, "dist"),
	},
	plugins: [
		new  HtmlWebpackPlugin({
			template:  "./src/index.html",
		}),
	],
	resolve: {
		modules: [__dirname, "src", "node_modules"],
		extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader:  require.resolve("babel-loader"),
		},
		{
			test: /\.css$/,
			use: ["style-loader", "css-loader"],
		},
		{
			test: /\.png|svg|jpg|gif$/,
			use: ["file-loader"],
		}]
	}
}
```
7. Create a folder inside our app folder `src` and we need to create our 3 files: `index.js, index.html and App.js`.
8. Lasts steps need to configure our `package.json` to start developing our application. 
```
"scripts": {
	"start": "webpack-dev-server --mode development --open",
	"build": "webpack --mode production"
}
```

## Starting server:

- Clone github repository.
- Run `npm install` to download packages.
- Run `npm run start` and will listen port 8080 from localhost (http://localhost:8080/).