module.exports = {
  /** 入口配置文件 */
  entry: {
    /** 忽略前缀文件夹不作为入口文件 */
    ignorePrefix: [ "~", "-", "_" ],
    /** 哪些文件名称作为入口 */
    name: [ "index", "entry" ]
  },

  /** 找不到对应的入口 js/ts 文件名字的 html 文件时，自动使用该模板文件 */
  templatePath: "./deploy/template/index.html",

  /** 是否开启该插件 */
  plugin: {

    // https://vue-loader.vuejs.org/
    // 默认下载好了该 loader，若不需要可以执行 npm uninstall vue-loader vue-style-loader vue-template-compiler
    // npm i -D vue-loader vue-style-loader vue-template-compiler
    vue: true,

    // https://github.com/kazupon/vue-i18n-loader
    // npm i -D @kazupon/vue-i18n-loader
    vueI18n: false,

    // npm i -D pug pug-plain-loader raw-loader
    vuePug: false,

    // 默认支持 vue
    // npm i -D eslint eslint-loader
    eslint: false,

    // npm i -D @babel/preset-react fork-ts-checker-webpack-plugin
    // !!!如果需要热更新，请看这里（第二第三点）如何启用热更新
    // https://github.com/gaearon/react-hot-loader#getting-started
    // npm i react-hot-loader/babel
    react: false,
  }
}
