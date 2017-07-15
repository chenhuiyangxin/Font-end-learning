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

### 总结

在常规代码中，我们经常需要改变元素的class来切换样式，比如轮播。   
通用的手段就是利用jq的`addClass()`以及`removeClass()`方法来回的切换，受控于某个`flag`   
其实也是数据在驱动样式变化，只不过没有Vue的绑定来的更加直白与便利   
Vue通过数据与class,style直接绑定，让数据与样式直接关联起来，更有利于我们的逻辑思路    
**让我们专注于切换的逻辑，而不是专注于如何实现切换**

另外，在实际使用中发现，一个元素只认一个`v-bind:class`，多出来的不会渲染出来
