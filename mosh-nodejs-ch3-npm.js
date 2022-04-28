/**
 * 1 node package manager(npm)
 * install specific version((i->install, g->global)): 
 * > npm i -g npm@5.5.1 
 * 2 package.json
 * > mkdir npm-demo ; cd npm-demo ; npm init [--yes]
 * 3 Installing a Package
 * > npm i underscore [--save]
 */

/**
 * 4 using a package
 * http://underscorejs.org/
 */
var _ = require('underscore');  // Core moduls, File of folder, node_modules
var result = _.contains([1,2,3],2);
console.log(result);

/**
 * 5 package dependencies
 * https://mongoosejs.com/`
 * 
 * 6 NPM packages and scm(source code management)
 * > npm i 
 *
 * 7 Semantic Versioning 语义化版本控制
 * 4.13.5-> Major.Minor.Patch
 * https://semver.org/
 * ^4.13.6 -> 4.x
 * ~1.8.3  -> 1.8.x // Tilde 
 * 
 * 8 List the Installed Packages 
 * > npm list [-a]
 * 
 * 9 Viewing Register Info for a Package 查看包的注册信息
 * > npm view mongoose [dependencies | versions]
 * 
 * 10 Installing a Specific Version of a Package 安装特定版本的包
 * > npm install mongoose@2.4.2
 * 
 * 11 Updating Local Packages 升级本地包
 * > npm outdated
 * > npm update  // 无法安装大版本2.x.x无法更新到4.x.x
 * > npm i -g npm-check-updates   // 此时安装新的命令行工具
 * > npm-check-updates // 直接运行，可以更改package.json中的大版本，也可以用ncu
 * > npm install
 * 
 * 12 DevDependencies 开发用依赖库
 * > npm i jshint --save-dev
 * 
 * 13 Unistalling a Package 删除包
 * > npm un mongoose / npm uninstall mongoose
 * 
 * 14 Working with Global Packages 操作全局包
 * > npm i -g [Package]
 * > npm i -g npm // 升级npm
 * > npm -g outdate
 * 
 * 15 Publishing a Package 发布一个包
 * // 在index.js中
 * module.export.add = function(a,b){return a+b};
 * // shell
 * npm login
 * ...
 * npm publish
 * 
 * 16 updating a Published Package 发布包更新
 * > npm version <major | minor | patch>
 */
