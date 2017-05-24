## this全面解析

### 调用位置

要理解this的绑定过程，必须要理解调用位置，这并不容易，因为某些编程方式会隐藏真正的调用位置

最重要的是要分析调用栈，我们关心的调用位置就在当前正在执行的函数的前一个调用中，来看一个栗子

```javascript
function baz(){
	// 当前的调用栈是：baz
	// 因此，当前调用位置是全局作用域

	console.log("baz");
	bar(); // <-- bar的调用位置
}

function bar(){
	// 当前的调用栈是：baz -> bar
	// 因此，当前的调用位置是在baz中

	console.log("bar");
	foo(); // <-- foo的调用位置
}

function foo(){
	// 当前的调用栈是：baz -> bar -> foo
	// 因此，当前的调用位置是在bar中

	console.log("foo");
}
baz() // <-- baz的调用位置
```