## throttle与debounce函数

当我们监听`scroll`,`resize`等一些持续出发的事件的时候，如果回调函数里面有大量的计算或者DOM操作   
就会导致页面挂掉。这个时候就需要throttle函数来让这些回调在一定时间内只执行一次，就是按照自定义的    
频率来执行

而debounce函数则是事件在多少秒之内没有触发就执行一次，比方说我们编辑邮件的时候，如果一直在写不会保存，   
当你停止输入几秒钟之后就会自动保存一次，这就是debounce函数的作用

### throttle

先自己实现一个throttle

```javascript
var throttle = function(fn,timeout){
    var timer = null;
    return function(){
        if(!timer){
            timer = Date.now();
            fn();
        }else{
            var now = Date.now();
            var remain = now - timer;
            if(remain > timeout){
                timer = now;
                fn();
            }
        }
    };
};
//模拟使用
$(document).on("scroll",throttle(fn,100));
```

以上，如果scroll事件持续触发，那么事件的回调会每隔100ms执行一次，而不会连续不断的触发导致页面挂掉

### debounce

同样自己实现一个debounce

```javascript
var debounce = function(fn,timeout){
    var stop = null;
    return function(){
        clearTimeout(stop);
        stop = setTimeout(function(){
            fn();
        },timeout);
    };
};
$(document).on("scroll",debounce(fn,1000));
```

以上，如果在1s内没有触发scroll事件，就会调用一次回调

### 总结

这两者都能处理密集调用的情况，适用的场景不同，根据实际情况取舍