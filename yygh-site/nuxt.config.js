module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '饿了么奶茶小店',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{lhr-module}}' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://thirdwx.qlogo.cn/mmopen/vi_32/6zSBE3FQZtNEPsJkg6XO49kTlBic3ib0Rwp5Qh8icX8vD0zZUibUtbjgpqrcIDdlicOzEQaVCofrVibfwIIGUiatCOYMA/132' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    { src: '~/plugins/myPlugin.js', ssr: false }
  ]

}

