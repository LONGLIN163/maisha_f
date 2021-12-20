module.exports = {
  // presets: [
  //   '@vue/cli-plugin-babel/preset','@babel/preset-env'
  // ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    // ['@babel/plugin-transform-modules-commonjs',{
    //   "allowTopLevelThis": true
    // }],
    ['@babel/plugin-transform-runtime'],
  ]
}
