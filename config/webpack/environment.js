const { environment } = require('@rails/webpacker')

// use html-loader plugin to load AngularJS html templates through Webpack
// environment.loaders.append('html', {
//     test: /\.html$/,
//     use: [{
//       loader: 'html-loader',
//       options: {
//         minimize: true,
//         removeAttributeQuotes: false,
//         caseSensitive: true,
//         customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
//         customAttrAssign: [ /\)?\]?=/ ]
//       }
//     }]
//   })

// Adds `var jQuery = require('jquery') to legacy jQuery plugins
const webpack = require('webpack')
environment.plugins.append('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
}))

// Adds window.$ = require('jquery')
environment.loaders.append('jquery', {
  test: require.resolve('jquery'),
  rules: [
    {
      loader: 'expose-loader',
      options: {
        exposes: ['$', 'jQuery'],
      },
    },
  ],
})

// use html-loader plugin to load AngularJS html templates through Webpack
environment.loaders.append('html', {
  test: /\.html$/,
  loader: 'html-loader'
})

module.exports = environment