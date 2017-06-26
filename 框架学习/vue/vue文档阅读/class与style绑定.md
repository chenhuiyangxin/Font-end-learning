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
这样就能通过改变class改变样式

#### 用在组件上

在定制的组件上用到class属性的时候，这些类将会被添加到根元素上，并且已经存在的不会被覆盖

### 绑定内联样式

语法跟绑定class类似
```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```javascript
data: {
  activeColor: 'red',
  fontSize: 30
}
```
