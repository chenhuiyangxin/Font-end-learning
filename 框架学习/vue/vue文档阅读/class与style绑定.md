## class与style绑定

前文讲过用`v-bind`绑定属性，而其中我们最常使用的就是class以及style了，我们希望通过class的改变来改变   
一些样式以及事件绑定，所以vue专门为此做了加强

### 绑定class

我们可以传给`v-bind:class`一个对象，并且可以跟普通的class并存
```html
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
```
```javascript
data: {
  isActive: true,
  hasError: false
}
```
我们可以预料到会被渲染成这个样子
```html
<div class="static active"></div>
```

