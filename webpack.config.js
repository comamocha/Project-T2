var webpack = require('webpack');

module.exports = {
  entry: './DashboardClient/components/main.js',
  output: {
    path:'./',
    filename:'./DashboardClient/index.js'
  },
  devserver: {
    inline: true,
    port:8080
  },
  
  module: {
    loaders: [
      {
        test:/\.js$/,  //WATCHOUT! 'dollar sign' needed here <--
        exclude: /node_modules/,
        loader: 'babel',
        query:{
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
      new webpack.ProvidePlugin({
          d3: 'd3',
          $: 'jquery'

      })
   ]
}