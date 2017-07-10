## Vue实例及模板语法

### 构造器

每个vue.js应用都是通过构造函数Vue创建一个根实例启动的
```javascript
var vm = new Vue({
  // 选项
})
```
实例化的时候可传入一个对象，它可以包含数据、模板、挂载元素、方法、生命周期钩子等选项

### 生命周期

每个实例在被创建之前都要有一系列的初始化过程，例如配置数据观测，编译模板，挂载实例到DOM  
在这个过程中实例会调用一些生命周期钩子，例如mounted,updated,destoryed

### 模板语法

前言已经介绍过，Vue使用了声明式渲染以及Mustache语法，将模板编译成虚拟DOM渲染函数

#### 文本

```html
<span>{{msg}}</span>
```

#### 属性

使用`v-bind`指令绑定属性，不能直接写属性
```html
<div v-bind:id="vueDiv"></div>
```

#### javascript表达式

可在数据绑定时使用表达式，且只能是表达式
```javascript
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
```

#### 过滤器

可用在mustache差值以及v-bind表达式
```javascript
{{ message | capitalize }}


new Vue({
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
```
常用的情况就是进行一些文本格式的转换

### 总结

Vue采用了`Mustache`语法，将数据绑定到模板里面，这是实现数据驱动的基础之一




















