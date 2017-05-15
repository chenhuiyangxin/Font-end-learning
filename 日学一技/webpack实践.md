## webpack实践

有空去研究研究下webpack的文档，暂时先说说实践踩得一些坑吧

### 开发环境跟生产环境

我们应该建立多个config文件，用于开发、测试以及生产环境，在package.json中配置命令来执行不同的config文件。    
但是由于生产服务器没有全局安装node，并且node_modules也是拷贝进去的，所以webpack命令无效，只能通过   
node node_modules/webpack/bin/webpack.js来执行config文件，而这样只能执行webpack.config.js文件，所以   
我们的生产环境配置文件只能叫做webpack.config.js文件，其他的随意，并像这样配置package.json    
```javascript
"scripts": {
    "start": "webpack --config webpack.dev.config.js"
  }
```
可以去执行开发以及测试环境的config文件

### 文件打包

一般上线发布都需要生成一个发布包，就是生成一个新的文件夹，我们叫dist好了，将最终打包好的文件都放在里面。    

一开始还傻傻的去找插件生成空文件夹，最后发现只要output的path是一个不存在的路径，webpack会自己建一个文件夹，    
并把打包的文件放进去。    
当然一些静态文件，比如字体文件，没打包的css文件需要通过copy-webpack-plugin插件放进去，像这个样子  
```javascript
new CopyWebpackPlugin([
            {from: __dirname + "/src/images",to: __dirname + "/dist/images"},
        ])
```

### css打包问题

如果你用了style-loader跟css-loader对css进行了打包，那么就会碰到一个问题，就是页面加载的时候，dom树会被    
先加载出来，你就会看到一个没有css的页面，虽然时间很短，但会很丑。   
所以你要么不要对css进行打包，要么就要对这种现象进行处理，比如css没有的话就白屏