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

### 绑定规则

调用位置决定this的绑定对象要遵循一定的规则

#### 默认绑定

这是最常用的函数调用类型：独立函数调用，通常作为无法应用其他规则的时候的默认规则

```javascript
function foo(){
	console.log(this.a);
}
var a = 2;
foo();//2
```
此处foo不带任何修饰的函数引用进行调用的，因此为默认绑定，指向全局对象

当在严格模式下，this会绑定到undefined

#### 隐式绑定

这条规则考虑调用位置是否有上下文对象，或者说被某个对象拥有或者包含

```javascript
function foo(){
	console.log(this.a);
}
var obj1 = {
	a: 2,
	foo: foo
};
obj1.foo();//2
```

严格来说foo函数并不属于obj1对象，调用位置会使用obj1上下文来引用函数，所以可以说函数被调用    
时obj1“拥有”或者“包含”它

















