# node的模块机制

## CommonJS的模块规范

require方法，将方法引入上下文

模块将方法以及变量限定在私有作用域中，支持引入及导出功能链接上下游依赖

## 模块实现

引入模块共三个步骤
1.路径分析
2.文件定位
3.编译执行

模块分为两类：核心模块（node提供），文件模块（用户编写）

模块加载首先从缓存加载，然后是核心模块，最后才是文件模块
缓存都是以真实路径缓存，将其作为索引缓存在Module._cache对象上，require同一个文件但是路径不同，都是加载的同一个文件

## 模块编译

exports,require,module这三个变量是哪儿来的，一个正常的javascript文件会被包装成这个样子
``` javascript
(function(exports,require,module,__filename,__dirname){
    var math = require('math');
    exports.area = function(radius){
        return Math.PI * radius * radius;
    }
});
```
这样每个文件就被作用域隔离了

## 包

包其实就是很多模块组成实现某个功能的提供了一个接口的大模块