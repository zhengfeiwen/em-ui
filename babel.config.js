module.exports = {
  presets: ['@vue/app', ['@babel/preset-env', {
    useBuiltIns: 'entry',
    modules: 'commonjs'
  }]],
  plugins: [
    [
      'component',
      {
        libraryName: 'em-ui',
        styleLibraryName: 'theme-chalk'
      },
      'transform-vue-jsx'
    ]
  ]
}
