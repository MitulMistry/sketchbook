const { environment } = require('@rails/webpacker')

module.exports = environment

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

environment.loaders.append('html', {
  test: /\.html$/,
  loader: 'html-loader'
})