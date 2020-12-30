const { environment } = require('@rails/webpacker')

// Adds `var jQuery = require('jquery') to legacy jQuery plugins
const webpack = require('webpack')
environment.plugins.append('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
}))

// Adds window.$ = require('jquery')
environment.loaders.append('jquery', {  
  rules: [
    {
      test: require.resolve('jquery'),
      loader: 'expose-loader',
      options: {
        exposes: ['$', 'jQuery'],
      },
    },
  ],
})

// Uses html-loader plugin to load AngularJS html templates through Webpack
environment.loaders.append('html', {
  rules: [
    {
      test: /\.html$/i,
      loader: 'html-loader',
      options: {
        minimize: true,
      },
    },
  ]
})

module.exports = environment