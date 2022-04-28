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
 */
