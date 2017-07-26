## throttle与debounce函数

当我们监听`scroll`,`resize`等一些持续出发的事件的时候，如果回调函数里面有大量的计算或者DOM操作   
就会导致浏览器挂掉。这个时候就需要throttle函数来让这些回调在一定时间内只执行一次，就是按照自定义的    
频率来执行

而debounce函数则是事件在多少秒之内没有触发就执行一次，比方说我们编辑邮件的时候，如果一直在写不会保存，   
当你停止输入几秒钟之后就会自动保存一次，这就是debounce函数的作用

### throttle

先自己实现一个throttle

```javascript
var throttle = function(){};
```