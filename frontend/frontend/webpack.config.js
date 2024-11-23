const path = require('path');

module.exports = {
  // Entry point for your app
  entry: './src/index.js',
  
  // Output configuration
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  // Module rules for loading files
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  // DevServer configuration
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      // Custom middleware logic if needed
      // For example, you can add your custom middleware here:
      // middlewares.unshift((req, res, next) => {
      //   console.log("Custom Middleware");
      //   next();
      // });

      return middlewares; // Return the updated middlewares array
    },
    static: path.join(__dirname, 'public'), // Serve static files from 'public' folder
    hot: true, // Enable Hot Module Replacement
    open: true, // Automatically open the browser
    port: 3000, // Port for the development server
  },

  // Additional plugins (if any)
  plugins: [
    // Add your plugins here if needed, such as HtmlWebpackPlugin
  ],
};
