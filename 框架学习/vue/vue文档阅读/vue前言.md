## vue 前言

vue是一个渐进式框架，说的通俗一点，就是你可以用一点皮毛，也可以玩的很深，并没有强制性

vue的核心库只关心视图层，也就是一个UI框架，当然搭配它的生态系统也能够驱动复杂的单页面应用

### 声明式渲染

vue采用了mustache语法糖，声明式的将数据渲染进DOM结构，像这个样子
```html
<div id="app">
    {{message}}
</div>
```
```javascript
var app = new Vue({
    el: #app,
    data: {
        message: "Hello World!"
    }
});
```
这样子就把message渲染进了DOM结构，并且数据跟DOM绑定在了一起，所有元素都是**响应式的**

### 组件化应用构建

它允许我们使用小型的、自包含的、可复用的组件构建大型应用，因为几乎所有的应用界面都可以抽象为一个组件树

我们来写一个酷炫的小组件（当然了，是文档里面的，哈哈）

```javascript
Vue.component("todo-item",{
    props: ['todo'],
    template: '<li>{{todo.text}}</li>'
});
var app = new Vue({
    el: '#app',
    data: {
        groceryList: [
            {text: '蔬菜'},
            {text: '天天加班'},
            {text: '呵呵'}
        ]
    }
});
```
```html
<div id="app">
    <ol>
        <todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item>
    </ol>
</div>
```

其实不说这是vue，有点基础的同学也能看出来这段代码干了什么，通过v-for循环生成几个todo-item标签，然后绑定一个   
todo属性给他，其实就是通过这种方法将父组件的变量传递进了子组件。vue就是这个清晰明了，也是声明式渲染的优势

### 路由

传统的路由都是服务器根据一定的url匹配规则返回不同的页面代码。前端也可以使用锚点路由实现简单路由，且不需要刷新页面    
我们可以先看下路由是怎么配置的，原理以后再看

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import World from '@/components/World'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
},
    {
      path: '/World',
      name: 'World',
      component: World
}
  ]
})
```