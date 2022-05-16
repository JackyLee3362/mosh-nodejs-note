# Chapter 3 npm

## 1 node package manager(npm)

install specific version((i->install, g->global)):

```bash
npm i -g npm@5.5.1
```

## 2 package.json

```bash
mkdir npm-demo
cd npm-demo
npm init [--yes]  // 使用--yes选项可以快速创建
```

## 3 Installing a Package 安装一个包

```bash
npm i underscore [--save]
```

## 4 using a package 使用一个包

比如，我们想下载[underscore](http://underscorejs.org/)

```javascript
var _ = require("underscore"); // Core moduls, File of folder, node_modules
var result = _.contains([1, 2, 3], 2);
console.log(result);
```

## 5 package dependencies 包依赖

比如，我们想下载[mongoose](https://mongoosejs.com/)

## 6 NPM packages and scm NPM 包和源码管理

scm -> source code management

```bash
npm i
```

## 7 Semantic Versioning 语义化版本控制

4.13.5-> Major.Minor.Patch
https://semver.org/
^4.13.6 -> 4.x
~1.8.3 -> 1.8.x // Tilde

## 8 List the Installed Packages

```bash
npm list [-a]
```

## 9 Viewing Register Info for a Package 查看包的注册信息

```bash
npm view mongoose [dependencies | versions]
```

## 10 Installing a Specific Version of a Package 安装特定版本的包

```bash
npm install mongoose@2.4.2
```

## 11 Updating Local Packages 升级本地包

```bash
npm outdated
npm update  // 无法安装大版本2.x.x无法更新到4.x.x
npm i -g npm-check-updates   // 此时安装新的命令行工具
npm-check-updates // 直接运行，可以更改package.json中的大版本，也可以用ncu
npm install
```

## 12 DevDependencies 开发用依赖库

```bash
npm i jshint --save-dev
```

## 13 Unistalling a Package 删除包

```bash
npm un mongoose / npm uninstall mongoose
```

## 14 Working with Global Packages 操作全局包

```bash
npm i -g [Package]
npm i -g npm // 升级npm
npm -g outdate
```

## 15 Publishing a Package 发布一个包

比如我们在 index.js 中写下如下语句

```javascript
module.export.add = function (a, b) {
  return a + b;
};
```

并在命令行中输入

```bash
npm login
... // 输入账号、密码、邮箱
npm publish
```

## 16 updating a Published Package 发布包更新

```bash
npm version <major | minor | patch>
```
