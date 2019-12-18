# 使用 TypeScript 自定义 Webpack 多页应用

## 更新日志

以前没想到这问题，直到想起了如果用户使用该库导致后面不知如何升级，所以加入更新日志，只是前期的配置没办法了，版本从 `1.1.0` 开始。

<details>

### 1.2.0

* ➕ 添加 `ejs-loader`, 页面文件允许使用 `.ejs` 后缀了
* ➕ 可以配置公共 `CDN` 了 *前往 `depoly -> config.js.cdn` 进行配置*
* ➕ 可以配置公共模板文件了，如公共头部、底部、侧栏、组件...*前往 `public -> template` 进行配置*
* 📘 解决一些语法问题

### 1.1.1

* 🐞 解决一个小BUG导致import ts 文件类型编译失败问题
* ➕ 更新类型检查生成目录地址，和添加定义公共类型、公共配置目录地址（ public/config、public/types ）
* 📘 解决语法冗长和添加注释信息

### 1.1.0

* 增加编辑器对模块名的支持 @ -> Project root path
* react 编译插件配置转移到 babel
* 移除重复配置


</details>

## 项目目录结构

<details>
<summary>包含输出目录</summary>

```Js
./
├── deploy
│   ├── _util
│   └── config.ts
├── dist
│   ├── assets
│   │   └── images
│   │       ├── 5a25b6fd30231.jpg
│   │       └── 5a25b6fd30231.jpg.gz
│   ├── css
│   │   └── 3.css
│   ├── js
│   │   ├── 0.js
│   │   ├── 1.js
│   │   ├── 2.js
│   │   ├── 3.js
│   │   ├── 4.js
│   │   └── 5.js
│   ├── index.html
│   ├── about
│   │   └── index.html
│   ├── contact
│   │   └── index.html
│   └── news
│       ├── index.html
│       └── list
│           ├── detail
│           │   └── index.html
│           └── index.html
├── public
│   ├── assets
│   │   └── images
│   │       └── img.jpg
│   ├── config
│   ├── styles
│   │   ├── common.styl
│   │   ├── env.styl
│   │   └── style.css
│   ├── template
│   │   ├── head.ejs
│   │   ├── header.html
│   │   ├── default.html
│   │   └── footer.css
│   ├── types
│   └── utils
│       └── test.ts
├── views
│   ├── -a
│   │   └── index.ts
│   ├── _a
│   │   └── index.js
│   ├── about
│   │   ├── index.ejs
│   │   └── index.ts
│   ├── contact
│   │   ├── index.html
│   │   └── index.ts
│   ├── news
│   │   ├── index.html
│   │   ├── index.js
│   │   └── list
│   │       ├── detail
│   │       │   ├── index.html
│   │       │   └── index.ts
│   │       ├── index.html
│   │       └── index.ts
│   ├── index.ejs
│   └── index.ts
├── README.md
├── package.json
├── tsconfig.json
├── babel.config.js
├── postcss.config.js
├── webpack.config.ts
├── webpack.config.dev.ts
└── webpack.config.prod.ts
```

</details>

## 模块别名

---

路径 | 别名 | 说明
-|-|-
/  |  @  |  项目根目录
public/assets  |  @assets  |  静态资源
public/config  |  @config  |  项目配置文件存放处
public/styles  |  @styles  |  全局样式/变量
public/types   |  @types  |  项目类型定义
public/utils   |  @utils  |  项目工具包依赖
public/template   |  @template  |  模板文件夹
views/*   |  @views  |  该目录下，只要有包含定义过的`[customeName].[jt]s` 文件就是一个入口文件，这个文件名相对应的有一个同名的 `html` 文件，如果该 `html` 文件不存在，则直接使用默认的模板文件，[配置文件](#开箱即用)

例如：

```Js

import XXX from "@assets/xxx...";

```

* `deploy`  项目部署目录
  * `_util`     该项目的工具库，适合高级玩家配置
  * `config.ts` 用户配置文件
* `dist`  打包输出路径
* `public` 公共路径
  * `assets` 静态资源
    * `images`
    * `fonts`
  * `config`  项目配置文件
  * `styles`  全局样式/变量
  * `types` 类型定义
  * `utils` 项目工具库
* `views` 视图层

---

## 已配置项

* stylus

项目初始化使用 `stylus` 作为样式工具，无论在哪里创建了 stylus 文件，都可以直接使用 public > styles > env.styl 文件内的变量，无需在每个文件中引入

* css样式兼容

加入了 css 的样式兼容，开启 grid 布局兼容

* vue/react/i18n...

项目加入了 `vue` 文件处理，但不参与打包，也就是，你可以在项目中使用 vue 这个插件，但在打包时，vue 将不会出现在打包文件中，如果需要使用请根据情况在每个 views 下的 .html 文件中加入 vue 的 cdn

* gzip

项目打包之后会自动生成 x.js.gz 文件，如果服务器允许的话

* split chunks

项目中如果有引用公共的 `.js/.ts/.css` 文件，打包后，只要该文件超过 10K，将自动切割成公共块，也就是多页面（.html）会自动引用这个公共块，如果没有依赖该公共块也就不会引用

* 多线程打包

该项目针对项目中的 `js`、 `ts` 开启多线程打包，提高打包等待时间过长弊端并开启缓存，针对大型项目效果非常明显

* 使用 `babel` 编译 typescript

由于使用 ts-loader 以及 awesome-typescript-loader 在开发编译中（尤其是热更新）编译速度过慢，所以该项目移去该 loader 并采用 babel 来编译，提高开发体验

* polyfill

项目采用 babel 高度定制，并按需填充最新语法，如 Promise、Generator、Flat……，更多新功能等待您的发现

* 支持可选链式调用

当你不确定该 `Object` / `Function`...下面是否有某属性时，此时你的写法看起来像这样

```JavaScript
const obj = { a: {} }
if( obj.a && obj.a.b && obj.a.b.c ) {
  // do something
}

// 那么此时你可以使用该方法
if( obj.a?.b?.c ) {
  // do something
}

// 该语法会转换你的表达式，看起来是这样
// null==obj.a?void 0:null===(r=obj.a.b)||void 0===obj.a?void 0:null===(o=obj.a.b)...

// 在 JS 中， null == undefined (true)， 但 null === undefined (false) 是错的

// 总结来说，该表达式只要在某一步出现了 null 或 undefined 都会返回 undefined，Js 中自动类型转换为就是 false 了，假若为真，那么返回对应的值

```

* ES6/7支持

除了上面所写的 polyfill 外，还支持了对 JavaScript 的 `class`，以及它的装饰器(Decorator)语法，看起来像这样

```Js
class Fly {
  @When(/* some code... */)
}

function When( value ) {
  // do someting
}
```

* 公共模板文件（头部、底部、侧栏...）

自定义公共的模板文件在其它页面实现公用，可以理解为组件复用

除了以上几乎涵盖了日常你所需的 ES6 语法 + ES7 和部分 ES8语法等

* 待持续优化...

如果你有好的插件介绍、或者对该项目有建议、或想参与到开发中，欢迎到 `issue` 中提出。如果对该项目感兴趣鼓励 `watch` 欢迎 `star`

## 开箱即用

打开部署目录下的配置文件，根据自身需求开启插件，无需去配置额外的插件及属性，也不需要在项目中删删改改，`true` 与 `false` 让你轻松搞定[前往文件](./deploy/config.ts)

```Js
export default {
  /** 入口配置文件 */
  entry: {
    /** 忽略前缀文件夹不作为入口文件 */
    ignorePrefix: [ "~", "-", "_" ],
    /** 哪些文件名称作为入口 */
    name: [ "index", "entry" ]
  },

  templatePath: "./deploy/template/index.html",

  /** 是否开启该插件 */
  plugin: {
    vue: true,

    vueI18n: false,

    vuePug: false,

    eslint: false,

    react: false,
  }
  // ...
}
```

## 使用步骤

```Bash
# 克隆
git clone https://github.com/xuewuzhijin/webpack-multiple-pages.git

# 进入项目目录
cd webpack-multiple-pages

# 安装依赖
npm i

# 开发
npm run serve

# or 生产
npm run build


## 如果编译出现报错，比如看起来像这样

#
# Fatal error in , line 0
# Check failed: U_SUCCESS(status).
#
#
#
#FailureMessage Object: 00000045E791C0E0 ERROR  Command failed with exit code 3221225477.

## 请升级你的 NodeJs
```
